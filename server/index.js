
import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

// Serve static files from the React app
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
}

// Initialize DB if not exists
if (!fs.existsSync(DB_FILE)) {
    // Initial empty structure
    fs.writeFileSync(DB_FILE, JSON.stringify({ listings: [] }, null, 2));
}

// GET listings
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

// POST listing
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

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
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
