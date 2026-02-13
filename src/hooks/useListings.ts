
import { useState, useEffect } from 'react';
import { AIListing } from '../types';
import { listings as mockListings } from '../data/mockData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const useListings = () => {
    const [listings, setListings] = useState<AIListing[]>(mockListings);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                // In production (Docker), we might need to handle absolute URLs or proxy
                // taking strict precaution to use relative path if proxied, slightly safer
                const response = await fetch(`${API_URL}/listings`);
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();

                // Merge/Validation could happen here
                if (data.listings && Array.isArray(data.listings)) {
                    setListings(data.listings);
                }
            } catch (err) {
                console.warn('Failed to fetch live listings, falling back to mock data:', err);
                // We keep mockListings which is already set initial state
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, []);

    return { listings, loading, error };
};
