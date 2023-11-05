# Pr Labelr

<div style="display:flex; gap:20px; flex-wrap:wrap">
  <a href="https://github.com/marketplace/actions/pr-labelr" style="text-decoration:none">
    <img src="https://img.shields.io/github/release/UcheSylvester/pr-labelr.svg"  />
  </a>

  <a href="https://github.com/marketplace/actions/pr-labelr" style="text-decoration:none">
    <img src="https://img.shields.io/badge/marketplace-pr--labelr-green?logo=github"  />
  </a>

  <a href="https://github.com/marketplace/actions/pr-labelr" style="text-decoration:none">
    <img src="https://img.shields.io/github/languages/top/UcheSylvester/pr-labelr.svg"  />
  </a>
</div>

---

This GitHub Action automatically adds given labels to pull requests based on the title of the pull request.

It does this by checking if the title of the pull request contains any word or phrase enclosed in a bracket (eg `[HOTFIX]: This is a hotfix`); if it does, it automatically adds the label to the pull request.

## Inputs

### `github-token`

**Required** The GitHub token to use for authentication. Typically, this should be set to `${{ secrets.GITHUB_TOKEN }}`.

### `default-label`

**Optional** The default label to add to pull requests if no label is found in the title of the pull request. Default: `pending-review`.

## Usage

1. **Create a Workflow YAML File**: In your repository, create or edit a workflow YAML file (e.g., `.github/workflows/pr-labels.yml`).

2. **Define the Workflow**:

```yaml
name: Auto Add Label to PRs

on:
  pull_request:
    types:
      - opened
      - reopened

jobs:
  add_labels:
    runs-on: ubuntu-latest
    steps:
      - name: Check out code
        uses: actions/checkout@v2

      - name: Add Labels to PR
        uses: UcheSylvester/pr-labelr@v0.1.1
        with:
          default-label: some-label
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

## Run Locally

To run this action locally, you need to have [Node.js](https://nodejs.org/en/) installed on your machine.

1. Clone this repository:

```bash
git clone
```

2. Install dependencies:

```bash
yarn
```

3. Build the typescript:

```bash
yarn build
```

4. Run the tests:

```bash
yarn test
```

5. Run the local action with [nektos/act](https://github.com/nektos/act):

```bash
act -j pr-labelr -s GITHUB_TOKEN=${{ secrets.GITHUB_TOKEN }}
```

## Contributing

We welcome contributions from the community to make Pr Labelr even better. Whether it's bug fixes, new features, or improvements to documentation, your input is valuable. To contribute, follow these steps:

1. Create an issue describing the feature/bug you want to work on.
2. Fork the repository on GitHub.
3. Create a new branch for your changes.
4. Make your changes and commit them with descriptive messages.
5. Submit a pull request to the main repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Get In Touch

[Email](mailto:okorocode@gmail.com) | [Follow on Twitter](https://twitter.com/ucylvester) | [Connect on LinkedIn](https://www.linkedin.com/in/uchenna-okoro/) | [Report an Issue](https://github.com/UcheSylvester/pr-labelr/issues)
