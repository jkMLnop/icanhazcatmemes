// frontend/src/hooks/useAnalytics.js
import { useState, useCallback } from 'react';

export const useAnalytics = () => {
  const [loading, setLoading] = useState(false);

  const trackClick = useCallback(async (data) => {
    setLoading(true);
    try {
      await fetch('/api/analytics/click', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return { trackClick, loading };
};