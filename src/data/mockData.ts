import { AIListing, Category } from '../types';

export const categories: Category[] = [
  {
    id: 'writing',
    name: 'Writing & Content',
    description: 'AI tools for content creation, copywriting, and text generation',
    icon: '✍️',
    count: 24
  },
  {
    id: 'design',
    name: 'Design & Art',
    description: 'Creative AI tools for design, image generation, and digital art',
    icon: '🎨',
    count: 18
  },
  {
    id: 'productivity',
    name: 'Productivity',
    description: 'AI assistants and automation tools for enhanced productivity',
    icon: '⚡',
    count: 31
  },
  {
    id: 'analysis',
    name: 'Data & Analysis',
    description: 'AI tools for data processing, analytics, and insights',
    icon: '📊',
    count: 15
  },
  {
    id: 'development',
    name: 'Development',
    description: 'AI-powered coding assistants and development tools',
    icon: '💻',
    count: 22
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'AI tools for marketing automation, SEO, and customer engagement',
    icon: '📈',
    count: 19
  }
];

export const listings: AIListing[] = [
  {
    id: '1',
    title: 'GPT-4 Turbo',
    description: 'Advanced language model for complex reasoning and creative tasks',
    longDescription: 'GPT-4 Turbo is OpenAI\'s most advanced language model, offering exceptional performance in understanding and generating human-like text. It excels in complex reasoning tasks, creative writing, code generation, and multi-step problem solving. With improved accuracy and reduced hallucinations compared to previous versions, it\'s perfect for professional applications requiring high-quality AI assistance.',
    category: 'productivity',
    tags: ['language-model', 'reasoning', 'creative', 'professional'],
    website: 'https://openai.com/gpt-4',
    pricing: 'Paid',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    rating: 4.8,
    reviews: 1247,
    dateAdded: '2024-01-15'
  },
  {
    id: '2',
    title: 'Midjourney',
    description: 'AI art generation tool for creating stunning visual content',
    longDescription: 'Midjourney is a cutting-edge AI art generator that transforms text descriptions into breathtaking visual artwork. Using advanced diffusion models, it can create everything from photorealistic images to abstract art, illustrations, and concept designs. Popular among artists, designers, and content creators for its exceptional quality and artistic style.',
    category: 'design',
    tags: ['image-generation', 'art', 'creative', 'visual'],
    website: 'https://midjourney.com',
    pricing: 'Freemium',
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    rating: 4.7,
    reviews: 892,
    dateAdded: '2024-01-10'
  },
  {
    id: '3',
    title: 'Claude 3 Opus',
    description: 'Sophisticated AI assistant for analysis and creative tasks',
    longDescription: 'Claude 3 Opus by Anthropic is a highly capable AI assistant designed for complex analytical tasks, creative projects, and detailed research. It excels in maintaining context over long conversations, providing nuanced responses, and handling multi-faceted problems with careful reasoning.',
    category: 'productivity',
    tags: ['assistant', 'analysis', 'research', 'conversation'],
    website: 'https://claude.ai',
    pricing: 'Freemium',
    image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    rating: 4.6,
    reviews: 634,
    dateAdded: '2024-01-08'
  },
  {
    id: '4',
    title: 'GitHub Copilot',
    description: 'AI-powered code completion and programming assistant',
    longDescription: 'GitHub Copilot is an AI-powered coding assistant that helps developers write code faster and more efficiently. It provides intelligent code completions, generates entire functions from comments, and assists with debugging and refactoring across dozens of programming languages.',
    category: 'development',
    tags: ['coding', 'development', 'programming', 'automation'],
    website: 'https://github.com/features/copilot',
    pricing: 'Paid',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    rating: 4.5,
    reviews: 2156,
    dateAdded: '2024-01-05'
  },
  {
    id: '5',
    title: 'Jasper AI',
    description: 'AI writing assistant for marketing and content creation',
    longDescription: 'Jasper AI is a comprehensive writing platform designed for marketers, content creators, and businesses. It helps generate high-quality blog posts, social media content, email campaigns, and marketing copy with brand voice consistency and SEO optimization.',
    category: 'writing',
    tags: ['writing', 'marketing', 'content', 'copywriting'],
    website: 'https://jasper.ai',
    pricing: 'Paid',
    image: 'https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    rating: 4.4,
    reviews: 789,
    dateAdded: '2024-01-03'
  },
  {
    id: '6',
    title: 'DataRobot',
    description: 'Enterprise AI platform for automated machine learning',
    longDescription: 'DataRobot is an enterprise-grade AI platform that automates the end-to-end process for building, deploying, and maintaining machine learning models. It enables organizations to quickly develop predictive models without extensive data science expertise.',
    category: 'analysis',
    tags: ['machine-learning', 'enterprise', 'automation', 'predictive'],
    website: 'https://datarobot.com',
    pricing: 'Enterprise',
    image: 'https://images.pexels.com/photos/8386421/pexels-photo-8386421.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    rating: 4.3,
    reviews: 445,
    dateAdded: '2024-01-01'
  }
];