
import type {
  Reporter,
  FullConfig,
  Suite,
  TestCase,
  TestResult,
} from '@playwright/test/reporter';

import axios from 'axios';
import 'dotenv/config';

class JiraReporter implements Reporter {
  private suite!: Suite;

  constructor() {
    console.log('JiraReporter loaded!');
  }

  onBegin(config: FullConfig, suite: Suite) {
    console.log('JiraReporter onBegin triggered!');
    this.suite = suite;
  }

  onTestEnd(test: TestCase, result: TestResult) {
    console.log('Test:', test.title);
    console.log('Status:', result.status);
  }

  async onEnd() {
    console.log('JiraReporter onEnd triggered!');

    try {
      const allTests = this.suite.allTests();

      console.log('Total tests found:', allTests.length);

      const failedTests = allTests.filter(
        test => test.outcome() === 'unexpected'
      );

      console.log('Failed tests found:', failedTests.length);

      for (const test of failedTests) {
        await this.createJiraBug(test);
      }
    } catch (error) {
      console.log('Error inside onEnd:', error);
    }
  }

  async createJiraBug(test: TestCase) {
    const jiraBaseUrl = process.env.JIRA_BASE_URL!;
    const jiraEmail = process.env.JIRA_EMAIL!;
    const jiraToken = process.env.JIRA_API_TOKEN!;

    const auth = Buffer.from(
      `${jiraEmail}:${jiraToken}`
    ).toString('base64');

    const lastResult = test.results[test.results.length - 1];
    const errorMessage = lastResult?.error?.message || 'Test failed';

    try {
      const response = await axios.post(
        `${jiraBaseUrl}/rest/api/3/issue`,
        {
          fields: {
            project: { key: 'SCRUM' },
            summary: `Playwright Failure: ${test.title}`,
            description: {
              type: 'doc',
              version: 1,
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: `Test: ${test.title}\nError: ${errorMessage}`,
                    },
                  ],
                },
              ],
            },
            issuetype: { name: 'Task' },
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

      console.log(`Jira bug created: ${response.data.key}`);
    } catch (error: any) {
      console.log(
        'Failed to create Jira bug:',
        error.response?.data || error.message
      );
    }
  }
}

export default JiraReporter;
