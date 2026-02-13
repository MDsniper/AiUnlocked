
const N8N_URL = 'https://n8n.bawhlab.uk';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTY4OWUzYi1iMjM5LTRjNGItOTEyYy0zODdkYzA2MDUxYTAiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiOWJjMDA2ZTItZWJhNS00YzI4LWI2OWEtZjcwOTE0MDY1OWM4IiwiaWF0IjoxNzcwOTcwMzc5fQ._Ta3vzjMB7zTxPYc361z4RRkowVbpD-zl00LJp3SDiQ';

const checkWorkflows = async () => {
    try {
        const response = await fetch(`${N8N_URL}/api/v1/workflows`, {
            headers: { 'X-N8N-API-KEY': API_KEY }
        });
        const data = await response.json();

        console.log('Workflows:', data.data.length);
        data.data.forEach(w => {
            console.log(`- ${w.name} (ID: ${w.id}) Active: ${w.active}`);
            const webhook = w.nodes.find(n => n.type.includes('webhook'));
            if (webhook) {
                console.log(`  Webhook Path: ${webhook.parameters.path}`);
                console.log(`  Webhook Method: ${webhook.parameters.httpMethod}`);
            }
        });
    } catch (e) {
        console.error(e);
    }
};

checkWorkflows();
