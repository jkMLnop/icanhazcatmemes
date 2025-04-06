function UserInfo({ userInfo }) {
    if (!userInfo) {
        return <p>Loading user info...</p>;
    }

    return (
        <div className="user-info">
            <h2>User Info</h2>
            <p><strong>IP:</strong> {userInfo.ip || 'Unavailable'}</p>
            <p><strong>Approximate Location:</strong> {userInfo.location || 'Unavailable'}</p>
            <p><strong>Browser:</strong> {userInfo.browserFingerprint}</p>
            <p><strong>Timestamp:</strong> {userInfo.timestamp}</p>
            <p>
                <strong>GPS coordinates:</strong>{' '}
                {userInfo.gpsCoordinates
                    ? `Latitude: ${userInfo.gpsCoordinates.latitude}, Longitude: ${userInfo.gpsCoordinates.longitude}, Accuracy: ${userInfo.gpsCoordinates.accuracy} meters`
                    : 'Unavailable'}
            </p>
        </div>
    );
}

export default UserInfo;