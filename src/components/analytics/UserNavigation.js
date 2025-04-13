// TODO figure out nav path dupes / missing components
import React, { useEffect } from 'react'; // Importing useEffect hook because we cant use a regular variable to manage state because component functions only run once
import { useLocation } from 'react-router-dom';

const setInitialEntryPoint = () => {
    if (!sessionStorage.getItem('initialEntryPoint')) {
        sessionStorage.setItem('initialEntryPoint', window.location.pathname);
        sessionStorage.setItem('navigationPath', JSON.stringify([window.location.pathname]));
    }
};

// Fetch user navigation data from sessionStorage
const fetchUserNavigation = () => {
    return {
        entryPoint: sessionStorage.getItem('initialEntryPoint') || null,
        navigationPath: JSON.parse(sessionStorage.getItem('navigationPath')) || [],
    };
};

const UserNavigationPaths = () => {
    // useState is a hook that allows you to add React state to function components
    // useState returns an array with two elements: the current state and a function to update it
    // Here, we are initializing the state with an object containing entryPoint and navigationPath
    // entryPoint is initialized to null and navigationPath is initialized to an empty array
    // This state will hold the user's navigation data
    // The entryPoint will store the initial page the user landed on
    // The navigationPath will store the sequence of pages the user visited
    const navigationData = fetchUserNavigation();

    return (
        <div>
            <h2>User Navigation Paths</h2>
            <p><strong>Entry Point:</strong> {navigationData.entryPoint || 'N/A'}</p>
            <p>
                <strong>Navigation Path:</strong>{' '}
                {navigationData.navigationPath.length > 0
                    ? navigationData.navigationPath.map(path => path).join(' → ')
                    : 'No navigation data available'}
            </p>
        </div>
    );
};

const updateNavigationPath = (newPage) => {
    const navigationPath = JSON.parse(sessionStorage.getItem('navigationPath')) || [];
    navigationPath.push(newPage);
    sessionStorage.setItem('navigationPath', JSON.stringify(navigationPath));
};

const NavigationTracker = () => {
    const location = useLocation();

    // TODO: is this needed?
    useEffect(() => {
        updateNavigationPath(location.pathname);
    }, [location.pathname]);

    return null; // This component doesn't render anything
};

export default UserNavigationPaths;
export { setInitialEntryPoint, UserNavigationPaths, NavigationTracker, updateNavigationPath };