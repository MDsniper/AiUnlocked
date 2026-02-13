import { useState, useCallback } from 'react';
import { submitJob } from '../services/jobsApi';
import type { JobSubmission } from '../types';

const initialFormData: JobSubmission = {
  companyName: '',
  jobTitle: '',
  location: 'remote',
  city: '',
  salaryMin: undefined,
  salaryMax: undefined,
  jobType: 'full-time',
  category: 'llms',
  description: '',
  applyUrl: '',
  companyLogoUrl: '',
  companyEmail: '',
};

export function useJobSubmission() {
  const [formData, setFormData] = useState<JobSubmission>({ ...initialFormData });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = useCallback(<K extends keyof JobSubmission>(field: K, value: JobSubmission[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  }, []);

  const validate = useCallback((): string | null => {
    if (!formData.companyName.trim()) return 'Company name is required';
    if (!formData.jobTitle.trim()) return 'Job title is required';
    if (!formData.companyEmail.trim()) return 'Company email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.companyEmail)) return 'Please enter a valid email';
    if (!formData.description.trim()) return 'Job description is required';
    if (!formData.applyUrl.trim()) return 'Apply URL is required';
    if (formData.location !== 'remote' && !formData.city?.trim()) return 'City is required for hybrid/onsite jobs';
    return null;
  }, [formData]);

  const submit = useCallback(async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await submitJob(formData);
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }, [formData, validate]);

  const reset = useCallback(() => {
    setFormData({ ...initialFormData });
    setLoading(false);
    setSuccess(false);
    setError(null);
  }, []);

  return { formData, loading, success, error, updateField, submit, reset };
}
