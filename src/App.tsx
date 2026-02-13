import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Categories } from './pages/Categories';
import { CategoryDetail } from './pages/CategoryDetail';
import { ArticleView } from './pages/ArticleView';
import { About } from './pages/About';
import { Newsletter } from './pages/Newsletter';
import { JobBoard } from './pages/JobBoard';
import { JobDetail } from './pages/JobDetail';
import { JobPost } from './pages/JobPost';

function App() {
  return (
    <ThemeProvider>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:slug" element={<CategoryDetail />} />
          <Route path="/article/:id" element={<ArticleView />} />
          <Route path="/jobs" element={<JobBoard />} />
          <Route path="/jobs/post" element={<JobPost />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/newsletter" element={<Newsletter />} />
        </Routes>
      </Layout>
    </Router>
    </ThemeProvider>
  );
}

export default App;
