import React, { useState } from 'react';
import { Mail, MessageCircle, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader } from '../components/ui/Card';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Get in touch via email',
      contact: 'hello@aiunlocked.xyz',
      action: 'mailto:hello@aiunlocked.xyz'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our team',
      contact: 'Available 9 AM - 6 PM PST',
      action: '#'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak with our team',
      contact: '+1 (555) 123-4567',
      action: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Our office location',
      contact: 'San Francisco, CA',
      action: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-goose-down">
      {/* Hero Section */}
      <section className="bg-goose-down border-b border-dark-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6 text-chocolate">
            Get in Touch
          </h1>
          <p className="text-xl text-cocoa leading-relaxed">
            Have questions or want to submit a listing? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((item, index) => (
              <Card key={index} hover className="text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-chocolate rounded-md">
                      <item.icon size={20} className="text-goose-down" />
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-chocolate mb-2">
                    {item.title}
                  </h3>
                  <p className="text-cocoa text-sm mb-3">
                    {item.description}
                  </p>
                  <a
                    href={item.action}
                    className="text-coffee text-sm hover:text-chocolate"
                  >
                    {item.contact}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-chocolate mb-2">Send a Message</h2>
                <p className="text-cocoa text-sm mb-6">
                  We'll get back to you within 24 hours.
                </p>
                {submitted && (
                  <div className="mb-6 p-4 bg-fresh-hay border border-dark-cream rounded-md">
                    <p className="text-chocolate text-sm">
                      Thanks for your message! We'll get back to you soon.
                    </p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <Input
                    label="Subject"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    required
                  />
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-cocoa">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      rows={5}
                      className="block w-full px-3 py-2.5 border border-dark-cream rounded-md focus:outline-none focus:ring-1 focus:ring-coffee focus:border-coffee transition-colors bg-goose-down"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-bold text-chocolate mb-6">
                Common Questions
              </h2>

              <div className="space-y-4">
                {[
                  {
                    question: "How do I submit a new AI tool?",
                    answer: "Click the 'Submit Tool' button in the header and fill out our submission form. All submissions are reviewed by our team."
                  },
                  {
                    question: "Is listing my AI tool free?",
                    answer: "Yes! Basic listings are free. We also offer premium options with additional features."
                  },
                  {
                    question: "How do you choose which tools to feature?",
                    answer: "Featured tools are selected based on user ratings, innovation, and our editorial team's assessment."
                  },
                  {
                    question: "Can I suggest improvements?",
                    answer: "Absolutely! Send us your suggestions through this form or email us directly."
                  }
                ].map((faq, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h3 className="text-base font-semibold text-chocolate mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-cocoa text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};