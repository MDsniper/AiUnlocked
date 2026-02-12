import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, Star, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { listings, categories } from '../data/mockData';

export const Categories: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedPricing, setSelectedPricing] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filteredListings = useMemo(() => {
    let filtered = listings;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(listing => listing.category === selectedCategory);
    }

    // Filter by pricing
    if (selectedPricing !== 'all') {
      filtered = filtered.filter(listing => listing.pricing === selectedPricing);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(listing =>
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort listings
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedPricing, sortBy]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const newParams = new URLSearchParams(searchParams);
    if (categoryId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', categoryId);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-goose-down">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-chocolate mb-3">
            AI Tools Directory
          </h1>
          <p className="text-lg text-cocoa">
            Discover and compare {listings.length}+ AI tools
          </p>
        </div>

        {/* Filters */}
        <div className="bg-goose-down rounded-lg border border-dark-cream p-6 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cocoa" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools..."
                  className="w-full pl-10 pr-4 py-2.5 border border-dark-cream rounded-md focus:outline-none focus:ring-1 focus:ring-coffee focus:border-coffee bg-goose-down text-chocolate"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-3 py-2.5 border border-dark-cream rounded-md focus:outline-none focus:ring-1 focus:ring-coffee focus:border-coffee bg-goose-down text-chocolate"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Pricing Filter */}
            <div>
              <select
                value={selectedPricing}
                onChange={(e) => setSelectedPricing(e.target.value)}
                className="w-full px-3 py-2.5 border border-dark-cream rounded-md focus:outline-none focus:ring-1 focus:ring-coffee focus:border-coffee bg-goose-down text-chocolate"
              >
                <option value="all">All Pricing</option>
                <option value="Free">Free</option>
                <option value="Freemium">Freemium</option>
                <option value="Paid">Paid</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-dark-cream">
            <span className="text-sm text-cocoa mr-1">Sort:</span>
            {[
              { value: 'featured', label: 'Featured' },
              { value: 'rating', label: 'Rating' },
              { value: 'reviews', label: 'Most Reviewed' },
              { value: 'newest', label: 'Newest' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  sortBy === option.value
                    ? 'bg-chocolate text-goose-down'
                    : 'text-cocoa hover:bg-dark-cream'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-cocoa">
            Showing {filteredListings.length} results
            {searchQuery && (
              <span className="ml-1">for "{searchQuery}"</span>
            )}
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} hover className="h-full overflow-hidden">
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                {listing.featured && (
                  <div className="absolute top-3 left-3 bg-chocolate text-goose-down px-2 py-1 text-xs font-medium rounded-md">
                    Featured
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-md ${
                    listing.pricing === 'Free' ? 'bg-fresh-hay text-chocolate' :
                    listing.pricing === 'Freemium' ? 'bg-lavender text-chocolate' :
                    listing.pricing === 'Paid' ? 'bg-dark-cream text-chocolate' :
                    'bg-dark-cream text-chocolate'
                  }`}>
                    {listing.pricing}
                  </span>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-chocolate mb-2">
                    {listing.title}
                  </h3>
                  <p className="text-cocoa text-sm line-clamp-2 leading-relaxed">
                    {listing.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {listing.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 border border-dark-cream text-cocoa text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                  {listing.tags.length > 2 && (
                    <span className="px-2 py-1 border border-dark-cream text-cocoa text-xs rounded-md">
                      +{listing.tags.length - 2}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-dark-cream">
                  <div className="flex items-center space-x-1">
                    <Star size={14} className="text-coffee fill-current" />
                    <span className="text-sm font-medium text-chocolate">{listing.rating}</span>
                    <span className="text-sm text-cocoa">({listing.reviews})</span>
                  </div>
                  <Link
                    to={`/listing/${listing.id}`}
                    className="text-coffee hover:text-chocolate text-sm flex items-center"
                  >
                    View <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <Filter size={48} className="mx-auto text-cocoa mb-4" />
            <h3 className="text-xl font-semibold text-chocolate mb-2">
              No tools found
            </h3>
            <p className="text-cocoa mb-6">
              Try adjusting your filters or search terms
            </p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedPricing('all');
                setSearchParams({});
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};