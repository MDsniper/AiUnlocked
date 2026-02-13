export interface N8nSubmissionData {
  title: string;
  description: string;
  category: string;
  website: string;
  contactEmail: string;
  [key: string]: any;
}

export interface N8nGenerationResponse {
  content: string;
}

const N8N_SUBMIT_WEBHOOK = import.meta.env.VITE_N8N_SUBMIT_WEBHOOK;
const N8N_GENERATE_WEBHOOK = import.meta.env.VITE_N8N_GENERATE_WEBHOOK;

export const n8nService = {
  /**
   * Submits a new listing to n8n workflow
   */
  async submitListing(data: N8nSubmissionData): Promise<void> {
    if (!N8N_SUBMIT_WEBHOOK) {
      console.warn('N8N_SUBMIT_WEBHOOK is not defined in .env');
      return;
    }

    try {
      const response = await fetch(N8N_SUBMIT_WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit listing: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error submitting to n8n:', error);
      throw error;
    }
  },

  /**
   * Generates content using n8n workflow
   */
  async generateContent(prompt: string): Promise<string> {
    if (!N8N_GENERATE_WEBHOOK) {
      console.warn('N8N_GENERATE_WEBHOOK is not defined in .env');
      return 'Configuration Error: VITE_N8N_GENERATE_WEBHOOK is missing.';
    }

    try {
      const response = await fetch(N8N_GENERATE_WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate content: ${response.statusText}`);
      }

      const data = await response.json();
      // Assuming the webhook returns { "content": "..." } or similar
      // Adjust based on actual n8n workflow response structure
      return data.content || data.text || data.output || JSON.stringify(data);

    } catch (error) {
      console.error('Error generating content from n8n:', error);
      throw error;
    }
  }
};
