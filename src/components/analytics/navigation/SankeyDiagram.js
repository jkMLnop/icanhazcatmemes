import { useEffect } from 'react';
import ApexSankey from 'apexsankey';
import { prepSankeyData, fetchUserNavigation } from './UserNavigation';

function SankeyDiagram() {
    useEffect(() => {
        const sankeyContainer = document.getElementById('navigation-sankey-container');

        if (sankeyContainer) {
            const navigationData = fetchUserNavigation();
            const sankeyData = prepSankeyData(navigationData.navigationPath);

            const options = {
                width: 800,
                height: 400,
                canvasStyle: 'border: 1px solid #caced0; background: #f6f6f6;',
                spacing: 100,
                nodeWidth: 20,
                enableTooltip: true,
            };

            // console.log('Navigation Sankey Data:', JSON.stringify(sankeyData, null, 2));

            try {
                const navigationSankey = new ApexSankey(sankeyContainer, options);
                navigationSankey.render(sankeyData);
            } catch (error) {
                console.error('Error rendering Sankey diagram:', error);
            }

            return () => {
                sankeyContainer.innerHTML = '';
            };
        }
    }, []);

    return (
        <div>
            <h4>User Navigation Sankey Diagram</h4>
            <div id="navigation-sankey-container" style={{ width: '800px', height: '400px' }}></div>
        </div>
    );
}

export default SankeyDiagram;