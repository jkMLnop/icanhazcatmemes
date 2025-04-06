import { useEffect, useState } from 'react';
import { fetchUserData } from './fetchUserData';
import SankeyDiagram from './components/analytics/SankeyDiagram';
import UserInfo from './components/analytics/UserInfo';
import UserNavigation from './components/analytics/UserNavigation';

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
            <UserNavigation userInfo={userInfo} />
            <UserInfo userInfo={userInfo} />
            <SankeyDiagram />
        </div>
    );
}

export default AnalyticsPage;