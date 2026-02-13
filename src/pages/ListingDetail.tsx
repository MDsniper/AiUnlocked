import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Star, Calendar, Tag, Globe, DollarSign, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { categories } from '../data/mockData';
import { useListings } from '../hooks/useListings';

export const ListingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { listings, loading } = useListings();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" />
      </div>
    );
  }

  const listing = listings.find(l => l.id === id);
  const category = listing ? categories.find(c => c.id === listing.category) : null;

  if (!listing) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[var(--text)] mb-4">Tool not found</h2>
          <Link to="/categories">
            <Button>Browse all tools</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/categories"
          className="inline-flex items-center text-[var(--muted)] hover:text-[var(--accent)] mb-10 text-sm transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to directory
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="overflow-hidden">
              <div className="aspect-[5/3] bg-[var(--surface)] overflow-hidden">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-8">
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-[var(--text)] mb-4">{listing.title}</h1>
                  <p className="text-lg text-[var(--muted)] leading-relaxed">{listing.description}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-8 mb-8 border-b border-[var(--border)]">
                  <div>
                    <div className="flex items-center mb-2">
                      <Star size={18} className="text-[var(--accent)] mr-2" />
                      <span className="text-sm text-[var(--muted)]">Rating</span>
                    </div>
                    <div className="font-semibold text-[var(--text)]">{listing.rating} ({listing.reviews})</div>
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      <DollarSign size={18} className="text-[var(--accent)] mr-2" />
                      <span className="text-sm text-[var(--muted)]">Pricing</span>
                    </div>
                    <div className="font-semibold text-[var(--text)]">{listing.pricing}</div>
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      <Tag size={18} className="text-[var(--accent)] mr-2" />
                      <span className="text-sm text-[var(--muted)]">Category</span>
                    </div>
                    <div className="font-semibold text-[var(--text)]">{category?.name}</div>
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      <Calendar size={18} className="text-[var(--accent)] mr-2" />
                      <span className="text-sm text-[var(--muted)]">Added</span>
                    </div>
                    <div className="font-semibold text-[var(--text)]">
                      {new Date(listing.dateAdded).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-[var(--text)] mb-3">About</h3>
                  <p className="text-[var(--muted)] leading-relaxed">{listing.longDescription}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[var(--text)] mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {listing.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 border border-[var(--border)] text-[var(--muted)] text-sm rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <a href={listing.website} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full mb-4" size="lg">
                    <Globe size={20} className="mr-2" />
                    Visit Website
                    <ExternalLink size={16} className="ml-2" />
                  </Button>
                </a>
                <div className="text-sm text-[var(--muted)]">
                  <p className="mb-2"><strong className="text-[var(--text)]">Pricing:</strong> {listing.pricing}</p>
                  <p className="mb-2"><strong className="text-[var(--text)]">Category:</strong> {category?.name}</p>
                  <p><strong className="text-[var(--text)]">Added:</strong> {new Date(listing.dateAdded).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-base font-semibold text-[var(--text)] mb-4">Category</h3>
                <Link to={`/categories?category=${listing.category}`}>
                  <div className="flex items-center justify-between p-4 border border-[var(--border)] rounded-md hover:border-[var(--accent)]/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{category?.icon}</div>
                      <div>
                        <div className="font-medium text-[var(--text)]">{category?.name}</div>
                        <div className="text-sm text-[var(--muted)]">{category?.count} tools</div>
                      </div>
                    </div>
                    <ArrowLeft size={16} className="text-[var(--muted)] transform rotate-180" />
                  </div>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-base font-semibold text-[var(--text)] mb-4">Similar Tools</h3>
                <div className="space-y-2">
                  {listings
                    .filter(l => l.id !== listing.id && l.category === listing.category)
                    .slice(0, 3)
                    .map((similarListing) => (
                      <Link
                        key={similarListing.id}
                        to={`/listing/${similarListing.id}`}
                        className="block p-3 rounded-md border border-[var(--border)] hover:border-[var(--accent)]/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <img src={similarListing.image} alt={similarListing.title} className="w-12 h-12 rounded-md object-cover" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-[var(--text)] text-sm truncate mb-1">{similarListing.title}</div>
                            <div className="flex items-center text-xs text-[var(--muted)]">
                              <Star size={12} className="text-[var(--accent)] fill-current mr-1" />
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
