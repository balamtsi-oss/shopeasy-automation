import axios from 'axios';
import 'dotenv/config';

const jiraBaseUrl = process.env.JIRA_BASE_URL;
const jiraEmail = process.env.JIRA_EMAIL;
const jiraToken = process.env.JIRA_API_TOKEN;

const auth = Buffer.from(`${jiraEmail}:${jiraToken}`).toString('base64');

async function connectToJira() {
  try {
    const response = await axios.get(`${jiraBaseUrl}/rest/api/3/myself`, {
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: 'application/json',
      },
    });

    console.log('Jira connection successful!');
    console.log('Logged in as:', response.data.displayName);
  } catch (error: any) {
    console.log('Jira connection failed!');
    console.log('Error:', error.response?.status, error.response?.data || error.message);
  }
}

connectToJira();