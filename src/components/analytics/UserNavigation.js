import React, { useEffect, useState } from 'react';
import { fetchUserNavigation } from '../../fetchUserData.js';

const UserNavigationPaths = () => {
    const [navigationData, setNavigationData] = useState({ entryPoint: null, navigationPath: [] });

    useEffect(() => {
        const data = fetchUserNavigation();
        setNavigationData(data);
    }, []);

    return (
        <div>
            <h2>User Navigation Paths</h2>
            <p><strong>Entry Point:</strong> {navigationData.entryPoint || 'N/A'}</p>
            <p>
                <strong>Navigation Path:</strong>{' '}
                {navigationData.navigationPath.length > 0
                    ? navigationData.navigationPath.map(path => path.trim()).join(' → ')
                    : 'No navigation data available'}
            </p>
        </div>
    );
};

export default UserNavigationPaths;