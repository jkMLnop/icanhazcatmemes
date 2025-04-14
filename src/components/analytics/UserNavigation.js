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

export default UserNavigationPaths;
export { setInitialEntryPoint, UserNavigationPaths, updateNavigationPath };