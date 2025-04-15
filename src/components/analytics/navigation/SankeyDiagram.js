import { useEffect } from 'react';
import ApexSankey from 'apexsankey';
import { prepSankeyData, fetchUserNavigation } from './UserNavigation';

function SankeyDiagram() {
    useEffect(() => {
        const staticContainer = document.getElementById('static-sankey-container');
        const dynamicContainer = document.getElementById('dynamic-sankey-container');

        if (staticContainer && dynamicContainer) {
            // Static working Sankey data
            const staticData = {
                nodes: [
                    { id: 'h', title: 'home' },
                    { id: 'l', title: 'learn-more' },
                    { id: 'c', title: 'continue' },
                    { id: 'a', title: 'analytics' },
                ],
                edges: [
                    { source: 'h', target: 'a', value: 2 },
                    { source: 'a', target: 'h', value: 1 },
                    { source: 'h', target: 'l', value: 1 },
                    { source: 'l', target: 'h', value: 1 },
                    { source: 'h', target: 'c', value: 1 },
                    { source: 'c', target: 'h', value: 1 },
                ],
            };

            // Dynamically generated Sankey data
            const navigationData = fetchUserNavigation();
            const dynamicData = prepSankeyData(navigationData.navigationPath);

            // Log both datasets for comparison
            console.log('Static Sankey Data:', JSON.stringify(staticData, null, 2));
            console.log('Dynamic Sankey Data:', JSON.stringify(dynamicData, null, 2));

            const options = {
                width: 800,
                height: 400,
                canvasStyle: 'border: 1px solid #caced0; background: #f6f6f6;',
                spacing: 100,
                nodeWidth: 20,
                enableTooltip: true,
            };

            try {
                // Render static Sankey diagram
                const staticSankey = new ApexSankey(staticContainer, options);
                staticSankey.render(staticData);

                // Render dynamic Sankey diagram
                const dynamicSankey = new ApexSankey(dynamicContainer, options);
                dynamicSankey.render(dynamicData);
            } catch (error) {
                console.error('Error rendering Sankey diagrams:', error);
            }

            return () => {
                staticContainer.innerHTML = '';
                dynamicContainer.innerHTML = '';
            };
        }
    }, []);

    return (
        <div>
            <h2>Static Sankey Diagram</h2>
            <div id="static-sankey-container" style={{ width: '800px', height: '400px' }}></div>
            <h2>Dynamic Sankey Diagram</h2>
            <div id="dynamic-sankey-container" style={{ width: '800px', height: '400px' }}></div>
        </div>
    );
}

export default SankeyDiagram;