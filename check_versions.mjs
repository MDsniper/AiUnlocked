
const N8N_URL = 'https://n8n.bawhlab.uk';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTY4OWUzYi1iMjM5LTRjNGItOTEyYy0zODdkYzA2MDUxYTAiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiOWJjMDA2ZTItZWJhNS00YzI4LWI2OWEtZjcwOTE0MDY1OWM4IiwiaWF0IjoxNzcwOTcwMzc5fQ._Ta3vzjMB7zTxPYc361z4RRkowVbpD-zl00LJp3SDiQ';

const checkVersions = async () => {
    try {
        const response = await fetch(`${N8N_URL}/api/v1/workflows`, {
            headers: { 'X-N8N-API-KEY': API_KEY }
        });
        const data = await response.json();

        data.data.forEach(w => {
            if (w.name.includes('(App)') || w.name.includes('Fooocus')) {
                console.log(`Workflow: ${w.name}`);
                console.log(`  ID: ${w.id}`);
                console.log(`  Active: ${w.active}`);
                console.log(`  VersionId: ${w.versionId}`);
                console.log(`  ActiveVersionId: ${w.activeVersionId}`); // Might not be in list response
            }
        });
    } catch (e) {
        console.error(e);
    }
};

checkVersions();
