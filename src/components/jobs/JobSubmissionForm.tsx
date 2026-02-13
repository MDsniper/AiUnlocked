import React from 'react';
import { CheckCircle, Info } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useJobSubmission } from '../../hooks/useJobs';
import { CATEGORY_MAP, JOB_TYPE_MAP, JOB_LOCATION_MAP } from '../../types';
import type { ArticleCategory, JobType, JobLocationType } from '../../types';

const categories = Object.entries(CATEGORY_MAP) as [ArticleCategory, { name: string }][];
const jobTypes = Object.entries(JOB_TYPE_MAP) as [JobType, string][];
const locations = Object.entries(JOB_LOCATION_MAP) as [JobLocationType, string][];

const selectClasses = 'block w-full px-3 py-2.5 border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-colors bg-[var(--card-bg)] text-[var(--text)]';

export const JobSubmissionForm: React.FC = () => {
  const { formData, loading, success, error, updateField, submit, reset } = useJobSubmission();

  if (success) {
    return (
      <div className="text-center py-12">
        <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
        <h3 className="text-xl font-semibold text-[var(--text)] mb-2">Job Submitted!</h3>
        <p className="text-[var(--muted)] mb-6">
          Your listing has been submitted for review. We'll notify you at {formData.companyEmail} once it's approved.
        </p>
        <Button variant="outline" onClick={reset}>Submit Another</Button>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="space-y-6">
      <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--accent)]/5 border border-[var(--accent)]/20">
        <Info size={20} className="text-[var(--accent)] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-[var(--text)]">
          <strong>$99 per listing</strong> - 30-day duration. Your job will be reviewed before publishing. Payment details will be sent to your email after approval.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Company Name *"
          placeholder="Acme AI"
          value={formData.companyName}
          onChange={(e) => updateField('companyName', e.target.value)}
        />
        <Input
          label="Company Email *"
          type="email"
          placeholder="jobs@acme.ai"
          value={formData.companyEmail}
          onChange={(e) => updateField('companyEmail', e.target.value)}
        />
      </div>

      <Input
        label="Job Title *"
        placeholder="Senior ML Engineer"
        value={formData.jobTitle}
        onChange={(e) => updateField('jobTitle', e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-[var(--text)]">Category *</label>
          <select
            className={selectClasses}
            value={formData.category}
            onChange={(e) => updateField('category', e.target.value as ArticleCategory)}
          >
            {categories.map(([slug, { name }]) => (
              <option key={slug} value={slug}>{name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-[var(--text)]">Job Type *</label>
          <select
            className={selectClasses}
            value={formData.jobType}
            onChange={(e) => updateField('jobType', e.target.value as JobType)}
          >
            {jobTypes.map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-[var(--text)]">Location *</label>
          <select
            className={selectClasses}
            value={formData.location}
            onChange={(e) => updateField('location', e.target.value as JobLocationType)}
          >
            {locations.map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {formData.location !== 'remote' && (
        <Input
          label="City *"
          placeholder="San Francisco, CA"
          value={formData.city || ''}
          onChange={(e) => updateField('city', e.target.value)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Salary Min"
          type="number"
          placeholder="100000"
          value={formData.salaryMin ?? ''}
          onChange={(e) => updateField('salaryMin', e.target.value ? Number(e.target.value) : undefined)}
        />
        <Input
          label="Salary Max"
          type="number"
          placeholder="200000"
          value={formData.salaryMax ?? ''}
          onChange={(e) => updateField('salaryMax', e.target.value ? Number(e.target.value) : undefined)}
        />
      </div>

      <Input
        label="Apply URL *"
        type="url"
        placeholder="https://acme.ai/careers/ml-engineer"
        value={formData.applyUrl}
        onChange={(e) => updateField('applyUrl', e.target.value)}
      />

      <Input
        label="Company Logo URL (optional)"
        type="url"
        placeholder="https://acme.ai/logo.png"
        value={formData.companyLogoUrl || ''}
        onChange={(e) => updateField('companyLogoUrl', e.target.value)}
      />

      <div className="space-y-1">
        <label className="block text-sm font-medium text-[var(--text)]">Job Description *</label>
        <textarea
          rows={8}
          placeholder="Describe the role, requirements, and what makes your company a great place to work..."
          value={formData.description}
          onChange={(e) => updateField('description', e.target.value)}
          className={selectClasses + ' resize-y'}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Job Listing - $99'}
      </Button>
    </form>
  );
};
