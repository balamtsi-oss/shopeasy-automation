import { test, expect } from '@playwright/test';

test.skip(
  process.env.JIRA_REPORTER_SMOKE !== 'true' ||
    process.env.JIRA_REPORTER_ENABLED !== 'true',
  'Set JIRA_REPORTER_SMOKE=true and JIRA_REPORTER_ENABLED=true to verify Jira failure reporting.'
);

test('Jira reporter smoke test', async () => {
  expect(1).toBe(2);
});
