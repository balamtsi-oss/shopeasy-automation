import axios, { type AxiosInstance } from 'axios';

type JiraClientConfig = {
  client: AxiosInstance;
  projectKey: string;
};

export function createJiraClient(): JiraClientConfig {
  const baseURL = process.env.JIRA_BASE_URL?.replace(/\/+$/, '');
  const email = process.env.JIRA_EMAIL;
  const token = process.env.JIRA_API_TOKEN;
  const projectKey = process.env.JIRA_PROJECT_KEY || 'SCRUM';
  const missing: string[] = [];
  if (!baseURL) missing.push('JIRA_BASE_URL');
  if (!email) missing.push('JIRA_EMAIL');
  if (!token) missing.push('JIRA_API_TOKEN');

  if (!baseURL || !email || !token) {
    throw new Error(`Missing Jira configuration: ${missing.join(', ')}`);
  }

  try {
    new URL(baseURL);
  } catch {
    throw new Error('JIRA_BASE_URL must be a valid absolute URL.');
  }

  return {
    client: axios.create({
      baseURL,
      auth: { username: email, password: token },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }),
    projectKey,
  };
}

export function getJiraErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    return status
      ? `Jira request failed with HTTP ${status}: ${error.message}`
      : `Jira request failed: ${error.message}`;
  }

  return error instanceof Error ? error.message : 'Unknown Jira error.';
}
