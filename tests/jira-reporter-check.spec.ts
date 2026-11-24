import { test, expect } from '@playwright/test';

// Skipped in CI to prevent intentional failure from breaking the pipeline.
// Un-skip locally when testing Jira bug creation in JiraReporter.ts.
test.skip('Jira reporter intentional failure', async () => {
  expect(1).toBe(2);
});
