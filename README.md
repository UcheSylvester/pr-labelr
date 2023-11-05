# Pr Labelr

<div style="display:flex; gap:10px; flex-wrap:wrap">
  <a href="https://github.com/marketplace/actions/pr-labelr">
    <img src="https://img.shields.io/github/release/UcheSylvester/pr-labelr.svg"  />
  </a>

  <a href="https://github.com/marketplace/actions/pr-labelr">
    <img src="https://img.shields.io/badge/marketplace-pr--labelr-green?logo=github"  />
  </a>

  <a href="https://github.com/marketplace/actions/pr-labelr">
    <img src="https://img.shields.io/github/languages/top/UcheSylvester/pr-labelr.svg"  />
  </a>
</div>

<hr/>

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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
