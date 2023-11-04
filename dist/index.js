"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
const run = async () => {
    const token = (0, core_1.getInput)("github-token");
    const label = (0, core_1.getInput)("label");
    const octokit = (0, github_1.getOctokit)(token);
    const pullRequest = github_1.context.payload.pull_request;
    console.log({ token, label, octokit, pullRequest });
    try {
        if (!pullRequest)
            throw new Error("No pull request found");
        const response = await octokit.rest.issues.addLabels({
            owner: github_1.context.repo.owner,
            repo: github_1.context.repo.repo,
            issue_number: pullRequest.number,
            labels: [label],
        });
        console.log("added label successfully", { response });
    }
    catch (error) {
        (0, core_1.setFailed)((error === null || error === void 0 ? void 0 : error.message) || "An unexpected error occurred!");
    }
};
run();
