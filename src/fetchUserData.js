import axios from 'axios';

// TODO: firgure out why browser info looks wrong (is it?) 
// Browser: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 | en-US
const fetchUserData = async () => {
  const userData = {
    ip: null,
    location: null,
    browserFingerprint: `${navigator.userAgent} | ${navigator.language}`,
    timestamp: new Date().toISOString(),
    entryPoint: sessionStorage.getItem('initialEntryPoint') || null,
    gpsCoordinates: null,
    navigationPath: JSON.parse(sessionStorage.getItem('navigationPath')) || [],
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
export { fetchUserData, setInitialEntryPoint, updateNavigationPath };