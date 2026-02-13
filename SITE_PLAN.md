# AiUnlocked - AI News Aggregation Site Plan

## Overview

Transform the existing AI tool directory into an AI news aggregation site. The site will pull articles from major AI news sources via RSS feeds and present them in a clean, categorized news feed.

---

## Page Structure

| Page | Route | Description |
|------|-------|-------------|
| Home (News Feed) | `/` | Filterable, paginated feed of aggregated AI news articles |
| Article View | `/article/:id` | Full article summary with link to original source |
| Categories | `/categories` | Browse articles by category with article counts |
| Category Detail | `/categories/:slug` | Filtered news feed for a single category |
| About | `/about` | About AiUnlocked, mission, team |
| Newsletter | `/newsletter` | Email signup for daily/weekly AI news digest |

---

## Data Models

### Article

```typescript
export interface Article {
  id: string;
  title: string;
  summary: string;
  source: string;        // e.g. "TechCrunch", "ArXiv"
  sourceUrl: string;     // link to original article
  date: string;          // ISO 8601
  category: ArticleCategory;
  imageUrl?: string;
  author?: string;
  tags?: string[];
}
```

### NewsSource

```typescript
export interface NewsSource {
  id: string;
  name: string;
  feedUrl: string;
  siteUrl: string;
  logoUrl?: string;
  enabled: boolean;
}
```

### NewsletterSubscription

```typescript
export interface NewsletterSubscription {
  email: string;
  frequency: 'daily' | 'weekly';
  categories?: ArticleCategory[];
}
```

### ArticleCategory (enum)

```typescript
export type ArticleCategory =
  | 'llms'
  | 'computer-vision'
  | 'robotics'
  | 'ai-research'
  | 'ai-tools'
  | 'ai-policy'
  | 'industry-news';
```

---

## Category Taxonomy

| Slug | Display Name | Description |
|------|-------------|-------------|
| `llms` | LLMs | Large language models, GPT, Claude, Llama, etc. |
| `computer-vision` | Computer Vision | Image recognition, generation, video AI |
| `robotics` | Robotics | AI-powered robotics, autonomous systems |
| `ai-research` | AI Research | Papers, breakthroughs, academic research |
| `ai-tools` | AI Tools | New AI products, developer tools, platforms |
| `ai-policy` | AI Policy | Regulation, ethics, governance, safety |
| `industry-news` | Industry News | Funding, acquisitions, partnerships, hiring |

---

## RSS Feed Sources

| Source | Feed URL | Categories |
|--------|----------|------------|
| TechCrunch AI | `https://techcrunch.com/category/artificial-intelligence/feed/` | industry-news, ai-tools |
| The Verge AI | `https://www.theverge.com/rss/ai-artificial-intelligence/index.xml` | industry-news |
| ArXiv CS.AI | `https://rss.arxiv.org/rss/cs.AI` | ai-research |
| OpenAI Blog | `https://openai.com/blog/rss.xml` | llms, ai-research |
| Google AI Blog | `https://blog.google/technology/ai/rss/` | ai-research, llms |
| Anthropic Blog | `https://www.anthropic.com/rss.xml` | llms, ai-research |
| HuggingFace Blog | `https://huggingface.co/blog/feed.xml` | ai-tools, ai-research |
| MIT Tech Review AI | `https://www.technologyreview.com/topic/artificial-intelligence/feed` | ai-research, ai-policy |

---

## API Endpoints

### `GET /api/news`

Fetch paginated, filtered news articles.

**Query params:**
- `page` (number, default 1)
- `limit` (number, default 20)
- `category` (ArticleCategory, optional)
- `source` (string, optional)
- `search` (string, optional)

**Response:**
```json
{
  "articles": [Article],
  "total": 150,
  "page": 1,
  "totalPages": 8
}
```

### `GET /api/sources`

List all configured RSS feed sources.

**Response:**
```json
{
  "sources": [NewsSource]
}
```

### `POST /api/newsletter`

Subscribe to the newsletter.

**Body:**
```json
{
  "email": "user@example.com",
  "frequency": "weekly",
  "categories": ["llms", "ai-tools"]
}
```

**Response:** `{ "success": true }`

---

## Component Structure

```
src/
  components/
    layout/
      Header.tsx          # Nav with category links
      Footer.tsx          # Footer with newsletter CTA
      Layout.tsx          # Wraps all pages
    news/
      ArticleCard.tsx     # Card for news feed items
      ArticleFeed.tsx     # Paginated list of ArticleCards
      FeaturedArticle.tsx # Hero/featured article display
      CategoryFilter.tsx  # Category pill/tab filter
      SourceBadge.tsx     # Shows article source with logo
      SearchBar.tsx       # Search input for articles
    newsletter/
      NewsletterForm.tsx  # Email signup form
    ui/
      Button.tsx          # (existing)
      Card.tsx            # (existing)
      Input.tsx           # (existing)
      Modal.tsx           # (existing)
      Pagination.tsx      # Page navigation
  pages/
    Home.tsx              # News feed with filters
    ArticleView.tsx       # Single article detail
    Categories.tsx        # Category listing
    CategoryDetail.tsx    # Articles filtered by category
    About.tsx             # About page
    Newsletter.tsx        # Newsletter signup page
  types/
    index.ts              # Article, NewsSource, etc.
  services/
    newsApi.ts            # Fetch articles from API
    newsletterApi.ts      # Newsletter subscription
  hooks/
    useArticles.ts        # Fetch + filter articles
    useNewsletter.ts      # Newsletter form state
```

---

## Implementation Priority

1. **Phase 1 - Core:** Data models, Article feed, Home page, Article view
2. **Phase 2 - Navigation:** Categories, category filtering, search
3. **Phase 3 - Engagement:** Newsletter signup, About page
4. **Phase 4 - Backend:** RSS feed aggregation service, API endpoints, database
