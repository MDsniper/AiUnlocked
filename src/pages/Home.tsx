import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, Zap, Search, Filter, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { categories } from '../data/mockData';
import { useListings } from '../hooks/useListings';

export const Home: React.FC = () => {
  const { listings, loading } = useListings();
  const featuredListings = listings.filter(listing => listing.featured);
  const topCategories = categories.slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-goose-down border-b border-dark-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-chocolate tracking-tight">
              Discover AI Tools
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-cocoa leading-relaxed max-w-3xl mx-auto">
              Find, compare, and unlock the perfect AI tools for your workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/categories">
                <Button size="lg">
                  Explore Tools
                </Button>
              </Link>
              <Link to="/categories">
                <Button variant="outline" size="lg">
                  View All Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-goose-down border-b border-dark-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-chocolate mb-3">{listings.length}+</div>
              <div className="text-base text-cocoa">AI Tools Listed</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-chocolate mb-3">25K+</div>
              <div className="text-base text-cocoa">Monthly Users</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-chocolate mb-3">98%</div>
              <div className="text-base text-cocoa">User Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-20 bg-goose-down">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-chocolate mb-4">
              Featured Tools
            </h2>
            <p className="text-lg text-cocoa">
              Handpicked tools that are transforming workflows
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-coffee" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredListings.map((listing) => (
                <Card key={listing.id} hover className="h-full overflow-hidden">
                  <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-chocolate">
                        {listing.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-md ${listing.pricing === 'Free' ? 'bg-fresh-hay text-chocolate' :
                          listing.pricing === 'Freemium' ? 'bg-lavender text-chocolate' :
                            listing.pricing === 'Paid' ? 'bg-dark-cream text-chocolate' :
                              'bg-dark-cream text-cocoa'
                        }`}>
                        {listing.pricing}
                      </span>
                    </div>

                    <p className="text-cocoa text-sm mb-4 line-clamp-2 leading-relaxed">
                      {listing.description}
                    </p>

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
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-goose-down border-t border-dark-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-chocolate mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-cocoa">
              Find AI tools organized by use case
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topCategories.map((category) => (
              <Link key={category.id} to={`/categories?category=${category.id}`}>
                <Card hover className="p-8">
                  <div className="text-3xl mb-4">{category.icon}</div>
                  <h3 className="text-lg font-semibold text-chocolate mb-2">
                    {category.name}
                  </h3>
                  <p className="text-cocoa mb-3 text-sm leading-relaxed">
                    {category.description}
                  </p>
                  <div className="text-coffee text-sm font-medium">
                    {category.count} tools
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-chocolate border-t border-cocoa">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-5 text-goose-down">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-10 text-dark-cream">
            Join thousands discovering their perfect AI tools
          </p>
          <Link to="/categories">
            <Button size="lg" className="bg-goose-down text-chocolate hover:bg-dark-cream">
              Start Exploring
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};