
const N8N_URL = 'https://n8n.bawhlab.uk';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTY4OWUzYi1iMjM5LTRjNGItOTEyYy0zODdkYzA2MDUxYTAiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiOWJjMDA2ZTItZWJhNS00YzI4LWI2OWEtZjcwOTE0MDY1OWM4IiwiaWF0IjoxNzcwOTcwMzc5fQ._Ta3vzjMB7zTxPYc361z4RRkowVbpD-zl00LJp3SDiQ';
const WORKFLOW_ID = 'lEPkSHZ7uhwV8tsm';

const update = async () => {
    // 1. Get current workflow
    const res = await fetch(`${N8N_URL}/api/v1/workflows/${WORKFLOW_ID}`, {
        headers: { 'X-N8N-API-KEY': API_KEY }
    });
    const workflow = await res.json();

    // 2. Modify node
    const webhook = workflow.nodes.find(n => n.type.includes('webhook'));
    // webhook.parameters.authentication = 'none'; // Explicitly set default

    // Minimal payload
    const payload = {
        name: 'Generate Content (App)',
        nodes: workflow.nodes,
        connections: workflow.connections,
        settings: workflow.settings
    };

    // 3. Update workflow
    console.log('Updating workflow...');
    const updateRes = await fetch(`${N8N_URL}/api/v1/workflows/${WORKFLOW_ID}`, {
        method: 'PUT',
        headers: {
            'X-N8N-API-KEY': API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (updateRes.ok) {
        console.log('Update success');
    } else {
        console.log('Update failed', await updateRes.text());
    }
};

update();
