import React from 'react';
import { Zap, Target, Users, Award } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';

export const About: React.FC = () => {
  const stats = [
    { label: 'AI Tools Listed', value: '150+' },
    { label: 'Monthly Users', value: '25K+' },
    { label: 'Categories', value: '12+' },
    { label: 'User Satisfaction', value: '98%' }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      bio: 'Former AI researcher at Google, passionate about democratizing AI access.',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Product',
      bio: 'Product strategist with 8+ years building developer tools and platforms.',
      image: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Elena Petrov',
      role: 'Lead Engineer',
      bio: 'Full-stack developer specializing in AI integration and scalable systems.',
      image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  return (
    <div className="min-h-screen bg-goose-down">
      {/* Hero Section */}
      <section className="bg-goose-down border-b border-dark-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6 text-chocolate">
            About AI Unlocked
          </h1>
          <p className="text-xl text-cocoa leading-relaxed max-w-2xl mx-auto">
            We help everyone discover and implement the perfect AI tools for their needs.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-goose-down border-b border-dark-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-chocolate mb-2">
                  {stat.value}
                </div>
                <div className="text-cocoa text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-chocolate mb-4">Our Mission</h2>
            <p className="text-lg text-cocoa leading-relaxed max-w-3xl">
              AI is transforming every industry, but navigating the landscape can be overwhelming.
              We bridge that gap by curating and presenting the best AI tools in an accessible way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-8">
              <Target size={40} className="mx-auto text-coffee mb-4" />
              <h3 className="text-lg font-semibold text-chocolate mb-3">Discover</h3>
              <p className="text-cocoa text-sm leading-relaxed">
                Find AI tools organized by category and use case.
              </p>
            </Card>

            <Card className="text-center p-8">
              <Users size={40} className="mx-auto text-coffee mb-4" />
              <h3 className="text-lg font-semibold text-chocolate mb-3">Compare</h3>
              <p className="text-cocoa text-sm leading-relaxed">
                Make informed decisions with ratings and reviews.
              </p>
            </Card>

            <Card className="text-center p-8">
              <Award size={40} className="mx-auto text-coffee mb-4" />
              <h3 className="text-lg font-semibold text-chocolate mb-3">Implement</h3>
              <p className="text-cocoa text-sm leading-relaxed">
                Get the information you need to integrate AI.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-goose-down border-t border-dark-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-chocolate mb-8">Our Story</h2>
          <div className="space-y-6 text-cocoa leading-relaxed">
            <p>
              AI Unlocked began in 2024 when our founder, Sarah Chen, was working as an AI researcher
              at Google. She noticed that while incredible AI tools were being developed at a rapid pace,
              there was no central place for people to discover and learn about them.
            </p>
            <p>
              "I was spending hours every week just trying to keep up with new AI tools that could help
              me in my work," Sarah recalls. "I realized that if someone like me, working in AI, was
              struggling with this, then everyone else must be completely overwhelmed."
            </p>
            <p>
              That insight led to the creation of AI Unlocked—a comprehensive directory that not only
              lists AI tools but provides the context, comparisons, and insights needed to make informed
              decisions. Today, we help over 25,000 monthly users discover and implement AI solutions
              that transform their work and creative processes.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-chocolate mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-8">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-chocolate mb-1">
                    {member.name}
                  </h3>
                  <p className="text-coffee text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-cocoa text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-chocolate border-t border-cocoa">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-goose-down">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-goose-down">Transparency</h3>
              <p className="text-dark-cream text-sm leading-relaxed">
                We provide honest, unbiased information about every AI tool we list.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-goose-down">Accessibility</h3>
              <p className="text-dark-cream text-sm leading-relaxed">
                AI should be accessible to everyone, regardless of technical background.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-goose-down">Innovation</h3>
              <p className="text-dark-cream text-sm leading-relaxed">
                We're constantly improving our platform to serve our community better.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};