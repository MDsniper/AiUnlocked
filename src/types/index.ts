export interface AIListing {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  tags: string[];
  website: string;
  pricing: 'Free' | 'Freemium' | 'Paid' | 'Enterprise';
  image: string;
  featured: boolean;
  rating: number;
  reviews: number;
  dateAdded: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

export interface SubmitListingData {
  title: string;
  description: string;
  longDescription: string;
  category: string;
  tags: string[];
  website: string;
  pricing: string;
  contactEmail: string;
}