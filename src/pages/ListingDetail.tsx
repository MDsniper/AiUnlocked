import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Star, Calendar, Tag, Globe, DollarSign } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { listings, categories } from '../data/mockData';

export const ListingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const listing = listings.find(l => l.id === id);
  const category = listing ? categories.find(c => c.id === listing.category) : null;

  if (!listing) {
    return (
      <div className="min-h-screen bg-dark-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-chocolate mb-4">Tool not found</h2>
          <Link to="/categories">
            <Button>Browse all tools</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-goose-down">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to="/categories"
          className="inline-flex items-center text-coffee hover:text-cinnamon mb-10 text-sm"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to directory
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <Card className="overflow-hidden">
              <div className="aspect-[5/3] bg-gray-100 overflow-hidden">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-8">
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-chocolate mb-4">
                    {listing.title}
                  </h1>
                  <p className="text-lg text-cocoa leading-relaxed">
                    {listing.description}
                  </p>
                </div>

                {/* Key Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-8 mb-8 border-b border-dark-cream">
                  <div>
                    <div className="flex items-center mb-2">
                      <Star size={18} className="text-coffee mr-2" />
                      <span className="text-sm text-cocoa">Rating</span>
                    </div>
                    <div className="font-semibold text-chocolate">{listing.rating} ({listing.reviews})</div>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <DollarSign size={18} className="text-coffee mr-2" />
                      <span className="text-sm text-cocoa">Pricing</span>
                    </div>
                    <div className="font-semibold text-chocolate">{listing.pricing}</div>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <Tag size={18} className="text-coffee mr-2" />
                      <span className="text-sm text-cocoa">Category</span>
                    </div>
                    <div className="font-semibold text-chocolate">{category?.name}</div>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <Calendar size={18} className="text-coffee mr-2" />
                      <span className="text-sm text-cocoa">Added</span>
                    </div>
                    <div className="font-semibold text-chocolate">
                      {new Date(listing.dateAdded).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-chocolate mb-3">About</h3>
                  <p className="text-cocoa leading-relaxed">
                    {listing.longDescription}
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-lg font-semibold text-chocolate mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {listing.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 border border-dark-cream text-cocoa text-sm rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Visit Website Card */}
            <Card>
              <CardContent className="p-6">
                <a
                  href={listing.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full mb-4" size="lg">
                    <Globe size={20} className="mr-2" />
                    Visit Website
                    <ExternalLink size={16} className="ml-2" />
                  </Button>
                </a>

                <div className="text-sm text-cocoa">
                  <p className="mb-2">
                    <strong>Pricing:</strong> {listing.pricing}
                  </p>
                  <p className="mb-2">
                    <strong>Category:</strong> {category?.name}
                  </p>
                  <p>
                    <strong>Added:</strong> {new Date(listing.dateAdded).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Related Category */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-base font-semibold text-chocolate mb-4">Category</h3>
                <Link to={`/categories?category=${listing.category}`}>
                  <div className="flex items-center justify-between p-4 border border-dark-cream rounded-md hover:border-coffee transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{category?.icon}</div>
                      <div>
                        <div className="font-medium text-chocolate">{category?.name}</div>
                        <div className="text-sm text-cocoa">{category?.count} tools</div>
                      </div>
                    </div>
                    <ArrowLeft size={16} className="text-cocoa transform rotate-180" />
                  </div>
                </Link>
              </CardContent>
            </Card>

            {/* Similar Tools */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-base font-semibold text-chocolate mb-4">Similar Tools</h3>
                <div className="space-y-2">
                  {listings
                    .filter(l => l.id !== listing.id && l.category === listing.category)
                    .slice(0, 3)
                    .map((similarListing) => (
                      <Link
                        key={similarListing.id}
                        to={`/listing/${similarListing.id}`}
                        className="block p-3 rounded-md border border-dark-cream hover:border-coffee transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={similarListing.image}
                            alt={similarListing.title}
                            className="w-12 h-12 rounded-md object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-chocolate text-sm truncate mb-1">
                              {similarListing.title}
                            </div>
                            <div className="flex items-center text-xs text-cocoa">
                              <Star size={12} className="text-coffee fill-current mr-1" />
                              {similarListing.rating}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};