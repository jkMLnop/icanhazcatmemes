import { useEffect, useState } from 'react';
import { fetchUserData } from './fetchUserData';

function AnalyticsPage() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const data = await fetchUserData();
      console.log('User Info:', data);
      setUserInfo(data);
    };

    getUserInfo();
  }, []);

  return (
    <div className="analytics-page">
      <h1>Analytics Page</h1>
      {userInfo ? (
        <div className="user-info">
          <h2>User Info</h2>
          <p><strong>IP:</strong> {userInfo.ip || 'Unavailable'}</p>
          <p><strong>Approximate Location:</strong> {userInfo.location || 'Unavailable'}</p>
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
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}

export default AnalyticsPage;