import { getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";

const run = async () => {
  const token = getInput("github-token");
  const label = getInput("label");

  const octokit = getOctokit(token);

  const pullRequest = context.payload.pull_request;
  console.log({ token, label, octokit, pullRequest });

  try {
    if (!pullRequest) throw new Error("No pull request found");

    const response = await octokit.rest.issues.addLabels({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: pullRequest.number,
      labels: [label],
    });
    console.log("added label successfully", { response });
  } catch (error) {
    setFailed((error as Error)?.message || "An unexpected error occurred!");
  }
};

run();
