import React from 'react';
import type { ArticleCategory, JobType, JobLocationType } from '../../types';
import { CATEGORY_MAP, JOB_TYPE_MAP, JOB_LOCATION_MAP } from '../../types';

interface Props {
  category: ArticleCategory | null;
  jobType: JobType | null;
  location: JobLocationType | null;
  onCategoryChange: (v: ArticleCategory | null) => void;
  onJobTypeChange: (v: JobType | null) => void;
  onLocationChange: (v: JobLocationType | null) => void;
}

const categories = Object.entries(CATEGORY_MAP) as [ArticleCategory, { name: string }][];
const jobTypes = Object.entries(JOB_TYPE_MAP) as [JobType, string][];
const locations = Object.entries(JOB_LOCATION_MAP) as [JobLocationType, string][];

const pillBase = 'px-3 py-1.5 rounded-full text-xs font-medium transition-all';
const pillActive = 'bg-[var(--accent)] text-white';
const pillInactive = 'bg-[var(--card-bg)] text-[var(--muted)] hover:bg-[var(--surface)] border border-[var(--border)]';

export const JobFilters: React.FC<Props> = ({
  category, jobType, location,
  onCategoryChange, onJobTypeChange, onLocationChange,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button onClick={() => onCategoryChange(null)} className={`${pillBase} ${category === null ? pillActive : pillInactive}`}>
          All Categories
        </button>
        {categories.map(([slug, { name }]) => (
          <button key={slug} onClick={() => onCategoryChange(slug)} className={`${pillBase} ${category === slug ? pillActive : pillInactive}`}>
            {name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => onJobTypeChange(null)} className={`${pillBase} ${jobType === null ? pillActive : pillInactive}`}>
          All Types
        </button>
        {jobTypes.map(([value, label]) => (
          <button key={value} onClick={() => onJobTypeChange(value)} className={`${pillBase} ${jobType === value ? pillActive : pillInactive}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => onLocationChange(null)} className={`${pillBase} ${location === null ? pillActive : pillInactive}`}>
          All Locations
        </button>
        {locations.map(([value, label]) => (
          <button key={value} onClick={() => onLocationChange(value)} className={`${pillBase} ${location === value ? pillActive : pillInactive}`}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
