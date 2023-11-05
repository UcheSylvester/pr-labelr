import { getInput, setFailed } from '@actions/core';
import { context, getOctokit } from '@actions/github';

const LOOKUP_KEYS = [']:', ']'];

export const run = async () => {
  const token = getInput('github-token');
  const defaultLabel = getInput('default-label')?.toLocaleLowerCase();

  const octokit = getOctokit(token);

  const pullRequest = context.payload.pull_request;

  try {
    if (!pullRequest) throw new Error('No pull request found');

    // title should be in format "[LABEL]: <title>", e.g. "bug: something is broken"
    const title: string = pullRequest.title.toLocaleLowerCase();

    const hasLookupKeys = LOOKUP_KEYS.some((key) => title.includes(key));

    const label = hasLookupKeys
      ? (title.split(']')[0] || title.split(']:')[0])
          ?.replace('[', '')
          ?.replace(' ', '-')
      : defaultLabel;

    await octokit.rest.issues.addLabels({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: pullRequest.number,
      labels: [label],
    });
  } catch (error) {
    setFailed((error as Error)?.message || 'An unexpected error occurred!');
  }
};

if (!process.env.JEST_WORKER_ID) {
  run();
}
