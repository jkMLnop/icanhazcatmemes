import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import clickCat from './click.jpg';
import koolKat from './koolkat.svg';

const Button = ({ onClick, children, to }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    console.log(`${children} button clicked!`);
    onClick?.();
    if (to) {
      navigate(to);
    }
  };

  return (
    <button id={children.toLowerCase()} onClick={handleClick}>
      {children}
    </button>
  );
};

const ClickableImage = ({ src, alt, to, onClick }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    console.log('Image clicked!');
    onClick?.();
    if (to) {
      navigate(to);
    }
  };

  return (
    <img
      src={src}
      alt={alt}
      onClick={handleClick}
      className="clickable-image"
    />
  );
};

// Function to fetch user data
const fetchUserData = async () => {
  const userData = {
    ip: null,
    location: null,
    browserFingerprint: `${navigator.userAgent} | ${navigator.language}`,
    timestamp: new Date().toISOString(),
    entryPoint: window.location.pathname,
    gpsCoordinates: null,
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

function MainContent() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const data = await fetchUserData();
      console.log('User Info:', data);
      setUserInfo(data);
    };

    getUserInfo();
  }, []);

  // TODO: firgure out why browser info looks wrong (is it?) 
  // Browser: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 | en-US
  return (
    <div>
      <h1>Your Main Content</h1>
      <ClickableImage
        src={clickCat}
        alt="Continue Reading"
        to="/continue"
        onClick={() => console.log('Image clicked!')}
      />
      {userInfo && (
        <div className="user-info">
          <h2>User Info</h2>
          <p><strong>IP:</strong> {userInfo.ip || 'Unavailable'}</p>
          <p><strong>Location:</strong> {userInfo.location || 'Unavailable'}</p>
          <p><strong>Browser:</strong> {userInfo.browserFingerprint}</p>
          <p><strong>Timestamp:</strong> {userInfo.timestamp}</p>
          <p><strong>Entry Point:</strong> {userInfo.entryPoint}</p>
          <p>
            <strong>GPS coordinates:</strong>{' '}
            {userInfo.gpsCoordinates
              ? `Latitude: ${userInfo.gpsCoordinates.latitude}, Longitude: ${userInfo.gpsCoordinates.longitude}, Accuracy: ${userInfo.gpsCoordinates.accuracy} meters`
              : 'Unavailable'}
          </p>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <div className="ad-content">
              <h2>Sample Advertisement</h2>
              <img
                src={koolKat}
                alt="Advertisement"
              />
              <Button onClick={() => console.log('Ad clicked')} to="/learn-more">
                Learn More
              </Button>
            </div>

            <main className="content">
              <MainContent />
            </main>
          </div>
        } />

        <Route path="/learn-more" element={
          <div className="page-content">
            <h1>Learn More Page</h1>
            <Button onClick={() => console.log('Back clicked')} to="/">
              Back Home
            </Button>
          </div>
        } />

        <Route path="/continue" element={
          <div className="page-content">
            <h1>Continue Reading Page</h1>
            <Button onClick={() => console.log('Back clicked')} to="/">
              Back Home
            </Button>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;