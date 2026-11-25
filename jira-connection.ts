import 'dotenv/config';
import { createJiraClient, getJiraErrorMessage } from './jira-config';

async function connectToJira() {
  try {
    const { client } = createJiraClient();
    const response = await client.get<{ displayName: string }>('/rest/api/3/myself');

    console.info('Jira connection successful.');
    console.info('Logged in as:', response.data.displayName);
  } catch (error: unknown) {
    console.error('Jira connection failed:', getJiraErrorMessage(error));
    process.exitCode = 1;
  }
}

void connectToJira();