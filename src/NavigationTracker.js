import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateNavigationPath } from './components/analytics/UserNavigation';

const NavigationTracker = () => {
  const location = useLocation();

  useEffect(() => {
    updateNavigationPath(location.pathname);
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default NavigationTracker;