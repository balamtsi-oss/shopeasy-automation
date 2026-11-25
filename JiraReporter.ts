
import type {
  Reporter,
  FullConfig,
  Suite,
  TestCase,
} from '@playwright/test/reporter';
import 'dotenv/config';
import { createJiraClient, getJiraErrorMessage } from './jira-config';

class JiraReporter implements Reporter {
  private suite!: Suite;
  private jira!: ReturnType<typeof createJiraClient>;

  onBegin(_config: FullConfig, suite: Suite): void {
    this.suite = suite;
    this.jira = createJiraClient();
  }

  async onEnd(): Promise<void> {
    const failedTests = this.suite
      .allTests()
      .filter(test => test.outcome() === 'unexpected');
    const reported = new Set<string>();

    for (const test of failedTests) {
      const summary = this.getSummary(test);
      if (reported.has(summary)) {
        continue;
      }
      reported.add(summary);

      try {
        await this.createJiraBug(test, summary);
      } catch (error: unknown) {
        console.error(
          `Could not report failed test "${test.title}" to Jira: ${getJiraErrorMessage(error)}`
        );
      }
    }
  }

  private getSummary(test: TestCase): string {
    return `Playwright failure: ${test.location.file}:${test.location.line} - ${test.title}`.slice(
      0,
      255
    );
  }

  private async createJiraBug(test: TestCase, summary: string): Promise<void> {
    const escapedSummary = summary.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    const jql = `project = "${this.jira.projectKey}" AND summary = "${escapedSummary}"`;
    const existing = await this.jira.client.get<{ issues: { key: string }[] }>(
      '/rest/api/3/search/jql',
      { params: { jql, maxResults: 1, fields: 'key' } }
    );

    if (existing.data.issues.length > 0) {
      console.info(
        `Skipping duplicate Jira issue for "${test.title}": ${existing.data.issues[0].key}`
      );
      return;
    }

    const lastResult = test.results[test.results.length - 1];
    const errorMessage = lastResult?.error?.message ?? 'Test failed without an error message.';
    const response = await this.jira.client.post<{ key: string }>(
      '/rest/api/3/issue',
      {
        fields: {
          project: { key: this.jira.projectKey },
          summary,
          description: {
            type: 'doc',
            version: 1,
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: `Test: ${test.title}\nFile: ${test.location.file}:${test.location.line}\nError: ${errorMessage}`,
                  },
                ],
              },
            ],
          },
          issuetype: { name: 'Bug' },
        },
      }
    );

    console.info(`Jira bug created: ${response.data.key}`);
  }
}

export default JiraReporter;
