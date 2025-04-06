function UserNavigation({ userInfo }) {
    if (!userInfo) {
        return <p>Loading navigation data...</p>;
    }

    return (
        <div id="nav-path-container" style={{ width: '800px', height: '400px' }}>
            <h2>User Navigation Paths</h2>
            <p><strong>Entry Point:</strong> {userInfo.entryPoint}</p>
            <p>
                <strong>Navigation Path:</strong>{' '}
                {userInfo.navigationPath && userInfo.navigationPath.length > 0
                    ? userInfo.navigationPath.join(' → ')
                    : 'No navigation data available'}
            </p>
        </div>
    );
}

export default UserNavigation;