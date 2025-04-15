import { useEffect, useState } from 'react';
import fetchUserData from './fetchUserData';
import SankeyDiagram from './components/analytics/navigation/SankeyDiagram';
import UserInfo from './components/analytics/UserInfo';
import UserLocation from './components/analytics/location/UserLocation';
import UserNavigationPaths from './components/analytics/navigation/UserNavigation';

function AnalyticsPage() {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const getUserInfo = async () => {
            const data = await fetchUserData();
            setUserInfo(data);
        };

        getUserInfo();
    }, []);

    return (
        <div className="analytics-page">
            <h1>Analytics Page</h1>
            <UserNavigationPaths />
            <UserInfo userInfo={userInfo} />
            {userInfo && (
                <UserLocation
                    gpsCoordinates={userInfo.gpsCoordinates}
                    location={userInfo.location}
                />
            )}
        </div>
    );
}

export default AnalyticsPage;