import React from 'react';

function UserInfo({ userInfo }) {
    if (!userInfo) {
        return <p>Loading user info...</p>;
    }

    return (
        <div className="user-info">
            <h2>User Info</h2>
            <p><strong>IP:</strong> {userInfo.ip}</p>
            <p><strong>Browser:</strong> {userInfo.browserFingerprint}</p>
            <p><strong>Timestamp:</strong> {userInfo.timestamp}</p>
        </div>
    );
}

export default UserInfo;