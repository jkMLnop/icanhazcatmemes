import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for missing marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function UserInfo({ userInfo }) {
    if (!userInfo) {
        return <p>Loading user info...</p>;
    }

    const { gpsCoordinates } = userInfo;

    return (
        <div className="user-info">
            <h2>User Info</h2>
            <p><strong>IP:</strong> {userInfo.ip || 'Unavailable'}</p>
            <p><strong>Browser:</strong> {userInfo.browserFingerprint}</p>
            <p><strong>Timestamp:</strong> {userInfo.timestamp}</p>
            <p><strong>Approximate Location:</strong> {userInfo.location || 'Unavailable'}</p>
            <p>
                <strong>GPS coordinates:</strong>{' '}
                {gpsCoordinates
                    ? `Latitude: ${gpsCoordinates.latitude}, Longitude: ${gpsCoordinates.longitude}, Accuracy: ${gpsCoordinates.accuracy} meters`
                    : 'Unavailable'}
            </p>
            {gpsCoordinates && (
                <div style={{ height: '400px', width: '800px' }}>
                    <MapContainer
                        center={[gpsCoordinates.latitude, gpsCoordinates.longitude]}
                        zoom={15}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[gpsCoordinates.latitude, gpsCoordinates.longitude]}>
                            <Popup>
                                Latitude: {gpsCoordinates.latitude}, Longitude: {gpsCoordinates.longitude}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            )}
        </div>
    );
}

export default UserInfo;