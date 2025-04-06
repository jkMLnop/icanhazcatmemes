import { useEffect } from 'react';
import ApexSankey from 'apexsankey';

function SankeyDiagram() {
    useEffect(() => {
        const sankeyContainer = document.getElementById('sankey-container');
        if (sankeyContainer) {
            const data = {
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
            } catch (error) {
                console.error('Error rendering Sankey diagram:', error);
            }

            return () => {
                sankeyContainer.innerHTML = '';
            };
        }
    }, []);

    return <div id="sankey-container" style={{ width: '800px', height: '400px' }}></div>;
}

export default SankeyDiagram;