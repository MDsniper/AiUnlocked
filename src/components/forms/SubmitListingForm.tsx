import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { categories } from '../../data/mockData';
import { SubmitListingData } from '../../types';

interface SubmitListingFormProps {
  onSubmit: (data: SubmitListingData) => void;
  onCancel: () => void;
}

export const SubmitListingForm: React.FC<SubmitListingFormProps> = ({
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<SubmitListingData>({
    title: '',
    description: '',
    longDescription: '',
    category: '',
    tags: [],
    website: '',
    pricing: '',
    contactEmail: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SubmitListingData, string>>>({});
  const [tagInput, setTagInput] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SubmitListingData, string>> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.longDescription.trim()) newErrors.longDescription = 'Detailed description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.website.trim()) newErrors.website = 'Website URL is required';
    if (!formData.pricing) newErrors.pricing = 'Pricing model is required';
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.contactEmail && !emailRegex.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Tool Name"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          error={errors.title}
          placeholder="e.g., GPT-4, Midjourney"
        />

        <div className="space-y-1">
          <label className="block text-sm font-medium text-[var(--text)]">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className={`block w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--card-bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] ${
              errors.category ? 'border-red-400' : ''
            }`}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
        </div>
      </div>

      <Input
        label="Website URL"
        type="url"
        value={formData.website}
        onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
        error={errors.website}
        placeholder="https://example.com"
      />

      <div className="space-y-1">
        <label className="block text-sm font-medium text-[var(--text)]">Short Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className={`block w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--card-bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] ${
            errors.description ? 'border-red-400' : ''
          }`}
          placeholder="Brief description of what this tool does..."
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-[var(--text)]">Detailed Description</label>
        <textarea
          value={formData.longDescription}
          onChange={(e) => setFormData(prev => ({ ...prev, longDescription: e.target.value }))}
          rows={5}
          className={`block w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--card-bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] ${
            errors.longDescription ? 'border-red-400' : ''
          }`}
          placeholder="Provide a comprehensive description including features, use cases, and benefits..."
        />
        {errors.longDescription && <p className="text-sm text-red-500">{errors.longDescription}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-[var(--text)]">Pricing Model</label>
        <select
          value={formData.pricing}
          onChange={(e) => setFormData(prev => ({ ...prev, pricing: e.target.value }))}
          className={`block w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--card-bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] ${
            errors.pricing ? 'border-red-400' : ''
          }`}
        >
          <option value="">Select pricing model</option>
          <option value="Free">Free</option>
          <option value="Freemium">Freemium</option>
          <option value="Paid">Paid</option>
          <option value="Enterprise">Enterprise</option>
        </select>
        {errors.pricing && <p className="text-sm text-red-500">{errors.pricing}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-[var(--text)]">Tags</label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            placeholder="Add tags..."
            className="flex-1 px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--card-bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)]"
          />
          <Button type="button" onClick={addTag} variant="outline" size="sm">
            Add
          </Button>
        </div>
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-sm rounded-full"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-[var(--accent)] hover:text-[var(--accent-hover)]"
                >
                  x
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <Input
        label="Contact Email"
        type="email"
        value={formData.contactEmail}
        onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
        error={errors.contactEmail}
        placeholder="your@email.com"
      />

      <div className="flex justify-end space-x-4 pt-6">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Submit for Review
        </Button>
      </div>
    </form>
  );
};
