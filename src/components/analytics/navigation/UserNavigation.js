import SankeyDiagram from "./SankeyDiagram";

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

const prepSankeyData = (navigationPath) => {
    const sankeyData = {
        nodes: [],
        edges: [],
    };

    const nodeSet = new Set();

    // Preprocess navigationPath to handle `/` and clean paths
    const processedPath = navigationPath.map(path => {
        if (path === '/') {
            return 'home'; // Replace `/` with `home`
        }
        return path.replace(/^\//, ''); // Remove leading `/` from other paths
    });

    processedPath.forEach((path, index) => {
        if (!nodeSet.has(path)) {
            nodeSet.add(path);
            sankeyData.nodes.push({ id: path, title: path });
        }
        if (index > 0) {
            const source = processedPath[index - 1];
            const target = path;

            // Check if the edge already exists
            const existingEdge = sankeyData.edges.find(edge => edge.source === source && edge.target === target);

            if (existingEdge) {
                // Increment the value if the edge exists
                existingEdge.value += 1;
            } else {
                // Add a new edge if it doesn't exist
                sankeyData.edges.push({ source, target, value: 1 });
            }
        }
    });

    return sankeyData;
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
            <SankeyDiagram />
        </div>
    );
};

const updateNavigationPath = (newPage) => {
    const navigationPath = JSON.parse(sessionStorage.getItem('navigationPath')) || [];
    navigationPath.push(newPage);
    sessionStorage.setItem('navigationPath', JSON.stringify(navigationPath));
};

export default UserNavigationPaths;
export { setInitialEntryPoint, UserNavigationPaths, updateNavigationPath, prepSankeyData, fetchUserNavigation };