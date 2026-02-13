import { useState, useCallback } from 'react';
import { subscribeNewsletter } from '../services/newsletterApi';

interface UseNewsletterState {
  email: string;
  frequency: 'daily' | 'weekly';
  categories: string[];
  loading: boolean;
  success: boolean;
  error: string | null;
}

export function useNewsletter() {
  const [state, setState] = useState<UseNewsletterState>({
    email: '',
    frequency: 'weekly',
    categories: [],
    loading: false,
    success: false,
    error: null,
  });

  const setEmail = useCallback((email: string) => {
    setState(s => ({ ...s, email, error: null }));
  }, []);

  const setFrequency = useCallback((frequency: 'daily' | 'weekly') => {
    setState(s => ({ ...s, frequency }));
  }, []);

  const toggleCategory = useCallback((category: string) => {
    setState(s => ({
      ...s,
      categories: s.categories.includes(category)
        ? s.categories.filter(c => c !== category)
        : [...s.categories, category],
    }));
  }, []);

  const validate = useCallback((): string | null => {
    if (!state.email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) return 'Please enter a valid email';
    return null;
  }, [state.email]);

  const submit = useCallback(async () => {
    const validationError = validate();
    if (validationError) {
      setState(s => ({ ...s, error: validationError }));
      return;
    }

    setState(s => ({ ...s, loading: true, error: null }));
    try {
      await subscribeNewsletter(state.email, state.frequency, state.categories);
      setState(s => ({ ...s, loading: false, success: true }));
    } catch (err) {
      setState(s => ({
        ...s,
        loading: false,
        error: err instanceof Error ? err.message : 'Something went wrong',
      }));
    }
  }, [state.email, state.frequency, state.categories, validate]);

  const reset = useCallback(() => {
    setState({
      email: '',
      frequency: 'weekly',
      categories: [],
      loading: false,
      success: false,
      error: null,
    });
  }, []);

  return { ...state, setEmail, setFrequency, toggleCategory, submit, reset };
}
