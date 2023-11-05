import { getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";

export const run = async () => {
  const token = getInput("github-token");
  const label = getInput("label");

  const octokit = getOctokit(token);

  const pullRequest = context.payload.pull_request;

  try {
    if (!pullRequest) throw new Error("No pull request found");

    console.log("hello2");

    await octokit.rest.issues.addLabels({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: pullRequest.number,
      labels: [label],
    });
  } catch (error) {
    setFailed((error as Error)?.message || "An unexpected error occurred!");
  }
};

run();
