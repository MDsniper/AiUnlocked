
const N8N_URL = 'https://n8n.bawhlab.uk';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTY4OWUzYi1iMjM5LTRjNGItOTEyYy0zODdkYzA2MDUxYTAiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiOWJjMDA2ZTItZWJhNS00YzI4LWI2OWEtZjcwOTE0MDY1OWM4IiwiaWF0IjoxNzcwOTcwMzc5fQ._Ta3vzjMB7zTxPYc361z4RRkowVbpD-zl00LJp3SDiQ';
const WORKFLOW_ID = 'lEPkSHZ7uhwV8tsm'; // Generate Content (App)

const toggle = async () => {
    // Deactivate
    console.log('Deactivating...');
    await fetch(`${N8N_URL}/api/v1/workflows/${WORKFLOW_ID}/deactivate`, {
        method: 'POST',
        headers: { 'X-N8N-API-KEY': API_KEY }
    });

    // Wait a bit
    await new Promise(r => setTimeout(r, 1000));

    // Activate
    console.log('Activating...');
    const res = await fetch(`${N8N_URL}/api/v1/workflows/${WORKFLOW_ID}/activate`, {
        method: 'POST',
        headers: { 'X-N8N-API-KEY': API_KEY }
    });
    console.log('Activate response:', res.status);
};

toggle();
