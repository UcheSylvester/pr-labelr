# Pr Labelr

This GitHub Action automatically adds given labels to pull requests

## Usage

1. **Create a Workflow YAML File**: In your repository, create or edit a workflow YAML file (e.g `.github/workflows/auto-add-labels.yml`).

2. **Define the Workflow**:

```yaml
name: Auto Add Label to PRs

on:
  pull_request:
    types:
      - opened

jobs:
  add_labels:
    runs-on: ubuntu-latest
    steps:
      - name: Check out code
        uses: actions/checkout@v2

      - name: Add Labels to PR
        uses: UcheSylvester/pr-labelr@v0.0.3
        with:
          label: some-label
          github-token: ${{ secrets.GITHUB_TOKEN }}
```
