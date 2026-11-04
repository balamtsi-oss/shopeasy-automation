import axios from 'axios';
import 'dotenv/config';

const jiraBaseUrl = process.env.JIRA_BASE_URL;
const jiraEmail = process.env.JIRA_EMAIL;
const jiraToken = process.env.JIRA_API_TOKEN;

const auth = Buffer.from(`${jiraEmail}:${jiraToken}`).toString('base64');

async function createJiraIssue() {
  try {
    const response = await axios.post(
      `${jiraBaseUrl}/rest/api/3/issue`,
      {
        fields: {
          project: {
            key: 'SCRUM',
          },
          summary: 'Playwright API Integration Test',
          description: {
            type: 'doc',
            version: 1,
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'This Jira issue was created automatically using TypeScript and Axios.',
                  },
                ],
              },
            ],
          },
          issuetype: {
            name: 'Task',
          },
        },
      },
      {
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Jira issue created successfully!');
    console.log('Issue Key:', response.data.key);
    console.log('Issue ID:', response.data.id);
  } catch (error: any) {
    console.log('Jira issue creation failed!');
    console.log('Status:', error.response?.status);
    console.log('Details:', JSON.stringify(error.response?.data || error.message));
  }
}

createJiraIssue();