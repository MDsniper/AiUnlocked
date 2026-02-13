
const N8N_URL = 'https://n8n.bawhlab.uk';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTY4OWUzYi1iMjM5LTRjNGItOTEyYy0zODdkYzA2MDUxYTAiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiOWJjMDA2ZTItZWJhNS00YzI4LWI2OWEtZjcwOTE0MDY1OWM4IiwiaWF0IjoxNzcwOTcwMzc5fQ._Ta3vzjMB7zTxPYc361z4RRkowVbpD-zl00LJp3SDiQ';
const WORKFLOW_ID = 'lEPkSHZ7uhwV8tsm';

const inspect = async () => {
    try {
        const response = await fetch(`${N8N_URL}/api/v1/workflows/${WORKFLOW_ID}`, {
            headers: { 'X-N8N-API-KEY': API_KEY }
        });
        const data = await response.json();
        const webhook = data.nodes.find(n => n.type.includes('webhook'));
        console.log(JSON.stringify(webhook, null, 2));
    } catch (e) {
        console.error(e);
    }
};

inspect();
