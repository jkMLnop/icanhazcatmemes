// frontend/src/components/AdTracker.js
// https://www.phind.com/search/cm7z7h1uy0000356r14me05rg
// TODO: strip this out here and in App.js probably..

import { useEffect, useRef, useState } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

// Intersection Observer Hook
function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.5,
        ...options
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [elementRef, isVisible];
}

// AdTracker
export function AdTracker({ children, adId }) {
  const [ref, isVisible] = useIntersectionObserver();
  const { trackClick } = useAnalytics();

  useEffect(() => {
    if (isVisible) {
      // Send impression data after 1 second of visibility
      const timer = setTimeout(() => {
        trackClick({ adId });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, adId, trackClick]);

  return <div ref={ref}>{children}</div>;
}