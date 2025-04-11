import axios from 'axios';

// Fetch user navigation data from sessionStorage
const fetchUserNavigation = () => {
  return {
    entryPoint: sessionStorage.getItem('initialEntryPoint') || null,
    navigationPath: JSON.parse(sessionStorage.getItem('navigationPath')) || [],
  };
};

const fetchUserData = async () => {
  const userNavigation = fetchUserNavigation();

  const userData = {
    ip: null,
    location: null,
    browserFingerprint: `${navigator.userAgent} | ${navigator.language}`,
    timestamp: new Date().toISOString(),
    gpsCoordinates: null,
    ...userNavigation, // Include navigation data
  };

  try {
    // Fetch IP and location
    const { data } = await axios.get('https://ipapi.co/json/');
    userData.ip = data.ip;
    userData.location = `${data.city}, ${data.region}, ${data.country_name}`;
  } catch (error) {
    console.error('Error fetching approximate location and IP data:', error);
    userData.location = null; // Populate with null if location cannot be obtained
  }

  // Attempt to get precise GPS coordinates
  if (navigator.geolocation) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000, // 10 seconds timeout
        });
      });
      userData.gpsCoordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy, // Accuracy in meters
      };
    } catch (error) {
      console.error('Error fetching GPS coordinates:', error);
      userData.gpsCoordinates = null; // Populate with null if GPS cannot be obtained
    }
  } else {
    console.warn('Geolocation API is not available in this browser.');
  }

  return userData;
};

const setInitialEntryPoint = () => {
  if (!sessionStorage.getItem('initialEntryPoint')) {
    sessionStorage.setItem('initialEntryPoint', window.location.pathname);
    sessionStorage.setItem('navigationPath', JSON.stringify([window.location.pathname]));
  }
};

const updateNavigationPath = (newPage) => {
  const navigationPath = JSON.parse(sessionStorage.getItem('navigationPath')) || [];
  navigationPath.push(newPage);
  sessionStorage.setItem('navigationPath', JSON.stringify(navigationPath));
};

export default fetchUserData;
export { fetchUserData, fetchUserNavigation, setInitialEntryPoint, updateNavigationPath };