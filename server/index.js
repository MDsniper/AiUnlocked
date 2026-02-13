
import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import Parser from 'rss-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const DB_FILE = path.join(__dirname, 'db.json');
const SUBSCRIBERS_FILE = path.join(__dirname, 'newsletter_subscribers.json');
const JOBS_FILE = path.join(__dirname, 'jobs.json');
const ADMIN_KEY = process.env.ADMIN_KEY || 'aiunlocked-admin-2026';

app.use(cors());
app.use(express.json());

// Serve static files from the React app
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
}

// Initialize DB if not exists
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ listings: [] }, null, 2));
}
if (!fs.existsSync(JOBS_FILE)) {
    fs.writeFileSync(JOBS_FILE, JSON.stringify({ jobs: [] }, null, 2));
}

// ─── RSS Feed Sources ───────────────────────────────────────────────

const RSS_SOURCES = [
    { name: 'TechCrunch AI', url: 'https://techcrunch.com/category/artificial-intelligence/feed/', category: 'Industry News' },
    { name: 'The Verge AI', url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', category: 'Industry News' },
    { name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/technology-lab', category: 'Industry News' },
    { name: 'OpenAI Blog', url: 'https://openai.com/blog/rss.xml', category: 'LLMs' },
    { name: 'Google AI Blog', url: 'https://blog.google/technology/ai/rss/', category: 'AI Research' },
    { name: 'MIT Tech Review', url: 'https://www.technologyreview.com/feed/', category: 'AI Research' },
    { name: 'Anthropic Blog', url: 'https://www.anthropic.com/rss.xml', category: 'LLMs' },
    { name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/', category: 'Industry News' },
];

const CATEGORIES = ['LLMs', 'Computer Vision', 'Robotics', 'AI Research', 'AI Tools', 'AI Policy', 'Industry News'];

const CATEGORY_KEYWORDS = {
    'LLMs': ['llm', 'language model', 'gpt', 'chatgpt', 'claude', 'gemini', 'llama', 'transformer', 'chatbot', 'prompt', 'token', 'fine-tune', 'fine-tuning', 'openai', 'anthropic', 'mistral'],
    'Computer Vision': ['computer vision', 'image recognition', 'object detection', 'image generation', 'diffusion', 'stable diffusion', 'midjourney', 'dall-e', 'visual', 'video generation', 'sora'],
    'Robotics': ['robot', 'robotics', 'humanoid', 'autonomous', 'drone', 'self-driving', 'tesla bot', 'boston dynamics'],
    'AI Research': ['research', 'paper', 'study', 'benchmark', 'arxiv', 'deepmind', 'breakthrough', 'neural', 'training', 'dataset', 'algorithm'],
    'AI Tools': ['tool', 'api', 'sdk', 'plugin', 'integration', 'developer', 'platform', 'framework', 'copilot', 'assistant', 'agent', 'workflow', 'automation'],
    'AI Policy': ['regulation', 'policy', 'safety', 'ethics', 'governance', 'law', 'legislation', 'ban', 'copyright', 'bias', 'alignment', 'risk', 'executive order'],
    'Industry News': ['funding', 'acquisition', 'startup', 'launch', 'partnership', 'valuation', 'billion', 'million', 'hire', 'layoff'],
};

function categorizeArticle(title, summary, defaultCategory) {
    const text = `${title} ${summary}`.toLowerCase();
    let bestMatch = null;
    let bestCount = 0;

    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
        const count = keywords.filter(kw => text.includes(kw)).length;
        if (count > bestCount) {
            bestCount = count;
            bestMatch = category;
        }
    }

    return bestMatch || defaultCategory;
}

// ─── Cache ──────────────────────────────────────────────────────────

let cache = { articles: [], timestamp: 0 };
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

const parser = new Parser({
    timeout: 10000,
    headers: { 'User-Agent': 'AiUnlocked-NewsBot/1.0' },
});

async function fetchAllFeeds() {
    if (Date.now() - cache.timestamp < CACHE_TTL && cache.articles.length > 0) {
        return cache.articles;
    }

    const results = await Promise.allSettled(
        RSS_SOURCES.map(async (source) => {
            try {
                const feed = await parser.parseURL(source.url);
                return feed.items.map((item) => ({
                    id: Buffer.from(item.link || item.guid || item.title || '').toString('base64url').slice(0, 32),
                    title: item.title || 'Untitled',
                    summary: (item.contentSnippet || item.content || '').slice(0, 300),
                    source: source.name,
                    sourceUrl: source.url,
                    link: item.link || '',
                    date: item.isoDate || item.pubDate || new Date().toISOString(),
                    category: categorizeArticle(item.title || '', item.contentSnippet || '', source.category),
                    imageUrl: item.enclosure?.url || extractImageFromContent(item['content:encoded'] || item.content || '') || null,
                }));
            } catch (err) {
                console.error(`Failed to fetch ${source.name}: ${err.message}`);
                return [];
            }
        })
    );

    const articles = results
        .filter(r => r.status === 'fulfilled')
        .flatMap(r => r.value)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    cache = { articles, timestamp: Date.now() };
    return articles;
}

function extractImageFromContent(html) {
    const match = html.match(/<img[^>]+src=["']([^"']+)["']/);
    return match ? match[1] : null;
}

// ─── News API Endpoints ─────────────────────────────────────────────

app.get('/api/news', async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
        const category = req.query.category || 'all';

        let articles = await fetchAllFeeds();

        if (category !== 'all') {
            articles = articles.filter(a => a.category === category);
        }

        const total = articles.length;
        const start = (page - 1) * limit;
        const paginated = articles.slice(start, start + limit);

        res.json({
            articles: paginated.map(toClientArticle),
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            categories: CATEGORIES,
        });
    } catch (err) {
        console.error('News fetch error:', err.message);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

const CATEGORY_TO_SLUG = {
    'LLMs': 'llms',
    'Computer Vision': 'computer-vision',
    'Robotics': 'robotics',
    'AI Research': 'ai-research',
    'AI Tools': 'ai-tools',
    'AI Policy': 'ai-policy',
    'Industry News': 'industry-news',
};

function toClientArticle(a) {
    return { ...a, category: CATEGORY_TO_SLUG[a.category] || a.category };
}

app.get('/api/news/:id', async (req, res) => {
    try {
        const articles = await fetchAllFeeds();
        const article = articles.find(a => a.id === req.params.id);
        if (!article) return res.status(404).json({ error: 'Article not found' });
        res.json(toClientArticle(article));
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch article' });
    }
});

app.get('/api/sources', (req, res) => {
    res.json({
        sources: RSS_SOURCES.map(({ name, url, category }) => ({ name, url, category })),
    });
});

// ─── Listmonk Integration ───────────────────────────────────────────

const LISTMONK_URL = process.env.LISTMONK_URL || 'https://mail.aiunlocked.xyz';
const LISTMONK_NEWSLETTER_LIST_UUID = process.env.LISTMONK_NEWSLETTER_LIST_UUID || '38582d67-286b-4535-bf5d-13c82ac68bb8';

async function addToListmonk(email, name, listUuids) {
    try {
        const res = await fetch(`${LISTMONK_URL}/api/public/subscription`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                name: name || email.split('@')[0],
                list_uuids: listUuids,
            }),
        });
        const data = await res.json();
        if (!res.ok) {
            console.error('Listmonk error:', data.message);
            return;
        }
        console.log('Listmonk: subscribed:', email);
    } catch (err) {
        console.error('Listmonk sync failed:', err.message);
    }
}

// ─── Newsletter Endpoint ────────────────────────────────────────────

app.post('/api/newsletter', async (req, res) => {
    const { email } = req.body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Valid email is required' });
    }

    let subscribers = [];
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
        subscribers = JSON.parse(fs.readFileSync(SUBSCRIBERS_FILE, 'utf8'));
    }

    if (subscribers.some(s => s.email === email)) {
        return res.json({ message: 'Already subscribed' });
    }

    subscribers.push({ email, subscribedAt: new Date().toISOString() });
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));

    // Sync to Listmonk
    addToListmonk(email, '', [LISTMONK_NEWSLETTER_LIST_UUID]);

    res.status(201).json({ message: 'Subscribed successfully' });
});

// ─── Existing Listings API ──────────────────────────────────────────

app.get('/api/listings', (req, res) => {
    try {
        if (!fs.existsSync(DB_FILE)) {
            return res.json({ listings: [] });
        }
        const data = fs.readFileSync(DB_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post('/api/listings', (req, res) => {
    try {
        let data = { listings: [] };
        if (fs.existsSync(DB_FILE)) {
            data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
        }

        const newListing = {
            id: Date.now().toString(),
            dateAdded: new Date().toISOString().split('T')[0],
            featured: false,
            rating: 0,
            reviews: 0,
            ...req.body
        };

        if (!data.listings) data.listings = [];
        data.listings.push(newListing);
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

        console.log('New listing added:', newListing.title);
        res.status(201).json(newListing);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// ─── Job Board API ──────────────────────────────────────────────────

function readJobs() {
    if (!fs.existsSync(JOBS_FILE)) return { jobs: [] };
    return JSON.parse(fs.readFileSync(JOBS_FILE, 'utf8'));
}

function writeJobs(data) {
    fs.writeFileSync(JOBS_FILE, JSON.stringify(data, null, 2));
}

function isJobExpired(job) {
    if (job.status !== 'approved' || !job.approvedAt) return false;
    const approvedDate = new Date(job.approvedAt);
    const now = new Date();
    return (now - approvedDate) > 30 * 24 * 60 * 60 * 1000;
}

function requireAdmin(req, res, next) {
    const key = req.headers['x-admin-key'];
    if (key !== ADMIN_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

const SLUG_TO_CATEGORY = {
    'llms': 'LLMs',
    'computer-vision': 'Computer Vision',
    'robotics': 'Robotics',
    'ai-research': 'AI Research',
    'ai-tools': 'AI Tools',
    'ai-policy': 'AI Policy',
    'industry-news': 'Industry News',
};

// Public: list approved, non-expired jobs
app.get('/api/jobs', (req, res) => {
    try {
        const data = readJobs();
        let dirty = false;

        // Auto-expire old jobs
        data.jobs.forEach(job => {
            if (isJobExpired(job)) {
                job.status = 'expired';
                dirty = true;
            }
        });
        if (dirty) writeJobs(data);

        let jobs = data.jobs.filter(j => j.status === 'approved');

        // Filters
        const { category, type, location, search } = req.query;
        if (category && category !== 'all') {
            jobs = jobs.filter(j => j.category === category);
        }
        if (type && type !== 'all') {
            jobs = jobs.filter(j => j.jobType === type);
        }
        if (location && location !== 'all') {
            jobs = jobs.filter(j => j.location === location);
        }
        if (search) {
            const q = search.toLowerCase();
            jobs = jobs.filter(j =>
                j.jobTitle.toLowerCase().includes(q) ||
                j.companyName.toLowerCase().includes(q) ||
                j.description.toLowerCase().includes(q)
            );
        }

        // Sort newest first
        jobs.sort((a, b) => new Date(b.approvedAt || b.submittedAt) - new Date(a.approvedAt || a.submittedAt));

        // Paginate
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 20));
        const total = jobs.length;
        const start = (page - 1) * limit;
        const paginated = jobs.slice(start, start + limit);

        res.json({ jobs: paginated, total, page, totalPages: Math.ceil(total / limit) });
    } catch (e) {
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

// Public: single job detail
app.get('/api/jobs/:id', (req, res) => {
    // Skip admin routes
    if (req.params.id === 'admin') return res.status(404).json({ error: 'Not found' });

    try {
        const data = readJobs();
        const job = data.jobs.find(j => j.id === req.params.id && j.status === 'approved');
        if (!job) return res.status(404).json({ error: 'Job not found' });

        // Check expiry
        if (isJobExpired(job)) {
            job.status = 'expired';
            writeJobs(data);
            return res.status(404).json({ error: 'Job not found' });
        }

        res.json(job);
    } catch (e) {
        res.status(500).json({ error: 'Failed to fetch job' });
    }
});

// Public: submit a new job
app.post('/api/jobs', (req, res) => {
    try {
        const { companyName, jobTitle, location, city, salaryMin, salaryMax, jobType, category, description, applyUrl, companyLogoUrl, companyEmail } = req.body;

        if (!companyName || !jobTitle || !description || !applyUrl || !companyEmail) {
            return res.status(400).json({ error: 'Missing required fields: companyName, jobTitle, description, applyUrl, companyEmail' });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(companyEmail)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        const data = readJobs();
        const newJob = {
            id: Date.now().toString(),
            companyName: companyName.trim(),
            jobTitle: jobTitle.trim(),
            location: location || 'remote',
            city: city?.trim() || '',
            salaryMin: salaryMin ? Number(salaryMin) : null,
            salaryMax: salaryMax ? Number(salaryMax) : null,
            jobType: jobType || 'full-time',
            category: category || 'ai-tools',
            description: description.trim(),
            applyUrl: applyUrl.trim(),
            companyLogoUrl: companyLogoUrl?.trim() || '',
            companyEmail: companyEmail.trim(),
            status: 'submitted',
            submittedAt: new Date().toISOString(),
            approvedAt: null,
            expiresAt: null,
        };

        data.jobs.push(newJob);
        writeJobs(data);

        console.log('New job submitted:', newJob.jobTitle, 'at', newJob.companyName);
        res.status(201).json({ message: 'Job submitted for review', job: { id: newJob.id, jobTitle: newJob.jobTitle, status: newJob.status } });
    } catch (e) {
        res.status(500).json({ error: 'Failed to submit job' });
    }
});

// Admin: list all jobs
app.get('/api/jobs/admin/all', requireAdmin, (req, res) => {
    try {
        const data = readJobs();
        res.json(data.jobs);
    } catch (e) {
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

// Admin: approve a job
app.post('/api/jobs/:id/approve', requireAdmin, (req, res) => {
    try {
        const data = readJobs();
        const job = data.jobs.find(j => j.id === req.params.id);
        if (!job) return res.status(404).json({ error: 'Job not found' });

        const now = new Date();
        job.status = 'approved';
        job.approvedAt = now.toISOString();
        job.expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
        writeJobs(data);

        console.log('Job approved:', job.jobTitle, 'at', job.companyName);
        res.json(job);
    } catch (e) {
        res.status(500).json({ error: 'Failed to approve job' });
    }
});

// Admin: reject a job
app.post('/api/jobs/:id/reject', requireAdmin, (req, res) => {
    try {
        const data = readJobs();
        const job = data.jobs.find(j => j.id === req.params.id);
        if (!job) return res.status(404).json({ error: 'Job not found' });

        job.status = 'rejected';
        writeJobs(data);

        console.log('Job rejected:', job.jobTitle, 'at', job.companyName);
        res.json(job);
    } catch (e) {
        res.status(500).json({ error: 'Failed to reject job' });
    }
});

// ─── Catchall for SPA ───────────────────────────────────────────────

app.get(/(.*)/, (req, res) => {
    if (fs.existsSync(path.join(distPath, 'index.html'))) {
        res.sendFile(path.join(distPath, 'index.html'));
    } else {
        res.status(404).send('Client not built');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
