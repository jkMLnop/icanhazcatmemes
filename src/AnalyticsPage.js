import { useEffect, useState } from 'react';
import { fetchUserData } from './fetchUserData';
import ApexSankey from 'apexsankey';

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

    useEffect(() => {
        // Render the Sankey diagram into the static container
        const sankeyContainer = document.getElementById('sankey-container');
        console.log('Sankey Container:', sankeyContainer);
    
        if (sankeyContainer) {
            const data = {
                nodes: [
                    { id: 'h', title: 'home' },
                    { id: 'l', title: 'learn-more' },
                    { id: 'c', title: 'continue' },
                    { id: 'a', title: 'analytics' },
                ],
                // NOTE: sankey cant handle self loops
                // self loops are edges that start and end at the same node
                edges: [
                    // { source: 'h', target: 'h', value: 2 },
                    { source: 'h', target: 'a', value: 2 },
                    { source: 'a', target: 'h', value: 1 },
                    { source: 'h', target: 'l', value: 1 },
                    { source: 'l', target: 'h', value: 1 },
                    { source: 'h', target: 'c', value: 1 },
                    { source: 'c', target: 'h', value: 1 },
                ],
            };
    
            const options = {
                width: 800,
                height: 400,
                canvasStyle: 'border: 1px solid #caced0; background: #f6f6f6;',
                spacing: 100,
                nodeWidth: 20,
                enableTooltip: true,
            };
    
            try {
                const sankey = new ApexSankey(sankeyContainer, options);
                sankey.render(data);
                console.log('Sankey rendered successfully');
            } catch (error) {
                console.error('Error rendering Sankey diagram:', error); // Error logging restored
            }
    
            // Cleanup function to prevent duplicate rendering
            return () => {
                console.log('Cleaning up Sankey instance');
                sankeyContainer.innerHTML = ''; // Clear the container
            };
        }
    }, []); // Dependency array ensures this runs only once

    return (
        <div className="analytics-page">
            <h1>Analytics Page</h1>
            <div id="sankey-container" style={{ width: '800px', height: '400px' }}></div>
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
                    <p>
                        <strong>Navigation Path:</strong>{' '}
                        {userInfo.navigationPath && userInfo.navigationPath.length > 0
                            ? userInfo.navigationPath.join(' → ')
                            : 'No navigation data available'}
                    </p>
                </div>
            ) : (
                <p>Loading user info...</p>
            )}
        </div>
    );
}

export default AnalyticsPage;