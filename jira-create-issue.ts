import 'dotenv/config';
import { createJiraClient, getJiraErrorMessage } from './jira-config';

async function createJiraIssue() {
  try {
    const { client, projectKey } = createJiraClient();
    const response = await client.post<{ key: string; id: string }>(
      '/rest/api/3/issue',
      {
        fields: {
          project: { key: projectKey },
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
          issuetype: { name: 'Task' },
        },
      }
    );

    console.info('Jira issue created successfully.');
    console.info('Issue Key:', response.data.key);
    console.info('Issue ID:', response.data.id);
  } catch (error: unknown) {
    console.error('Jira issue creation failed:', getJiraErrorMessage(error));
    process.exitCode = 1;
  }
}

void createJiraIssue();