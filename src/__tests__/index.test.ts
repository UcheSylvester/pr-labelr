import { run } from '../index';
import { getInput, setFailed } from '@actions/core';
import { context, getOctokit } from '@actions/github';

jest.mock('@actions/core');
jest.mock('@actions/github');

describe('run', () => {
  const mockGetInput = getInput as jest.MockedFunction<typeof getInput>;
  const mockSetFailed = setFailed as jest.MockedFunction<typeof setFailed>;
  const mockGetOctokit = getOctokit as jest.MockedFunction<typeof getOctokit>;
  const mockContext = context as jest.Mocked<typeof context>;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should throw an error if no pull request is found', async () => {
    mockContext.payload = {};

    await run();

    expect(mockSetFailed).toHaveBeenCalledWith('No pull request found');
  });

  it('should add a label to the pull request based on the title', async () => {
    mockContext.payload = {
      pull_request: {
        number: 123,
        title: '[HOTFIX]: This is a hotfix',
      },
    };
    (mockContext.repo as any) = {
      owner: 'owner',
      repo: 'repo',
    };

    mockGetInput.mockReturnValueOnce('token');

    const mockRest = {
      rest: {
        issues: {
          addLabels: jest.fn(),
        },
      },
    };

    mockGetOctokit.mockReturnValueOnce(mockRest as any);

    await run();

    expect(mockGetInput).toHaveBeenCalledWith('github-token');
    expect(mockGetOctokit).toHaveBeenCalledWith('token');
    expect(mockRest.rest.issues.addLabels).toHaveBeenCalledWith({
      owner: 'owner',
      repo: 'repo',
      issue_number: 123,
      labels: ['hotfix'],
    });
  });

  it('should add a label to the pull request based on the title (no colon)', async () => {
    mockContext.payload = {
      pull_request: {
        number: 123,
        title: '[HOTFIX] This is a hotfix',
      },
    };
    (mockContext.repo as any) = {
      owner: 'owner',
      repo: 'repo',
    };

    mockGetInput.mockReturnValueOnce('token');

    const mockRest = {
      rest: {
        issues: {
          addLabels: jest.fn(),
        },
      },
    };

    mockGetOctokit.mockReturnValueOnce(mockRest as any);

    await run();

    expect(mockGetInput).toHaveBeenCalledWith('github-token');
    expect(mockGetOctokit).toHaveBeenCalledWith('token');
    expect(mockRest.rest.issues.addLabels).toHaveBeenCalledWith({
      owner: 'owner',
      repo: 'repo',
      issue_number: 123,
      labels: ['hotfix'],
    });
  });

  it('should add default label to the pull request if no label is provided in title', async () => {
    mockContext.payload = {
      pull_request: {
        number: 123,
        title: 'This is a hotfix',
      },
    };
    (mockContext.repo as any) = {
      owner: 'owner',
      repo: 'repo',
    };

    mockGetInput.mockReturnValueOnce('token');
    mockGetInput.mockReturnValueOnce('pending-review');

    const mockRest = {
      rest: {
        issues: {
          addLabels: jest.fn(),
        },
      },
    };

    mockGetOctokit.mockReturnValueOnce(mockRest as any);

    await run();

    expect(mockGetInput).toHaveBeenCalledWith('github-token');
    expect(mockGetInput).toHaveBeenCalledWith('default-label');
    expect(mockGetOctokit).toHaveBeenCalledWith('token');
    expect(mockRest.rest.issues.addLabels).toHaveBeenCalledWith({
      owner: 'owner',
      repo: 'repo',
      issue_number: 123,
      labels: ['pending-review'],
    });
  });

  it('should set failed if an error occurs', async () => {
    mockContext.payload = {
      pull_request: {
        number: 123,
        title: '[HOTFIX]: This is a hotfix',
      },
    };
    (mockContext.repo as any) = {
      owner: 'owner',
      repo: 'repo',
    };

    mockGetInput.mockReturnValueOnce('token');

    const mockRest = {
      rest: {
        issues: {
          addLabels: jest.fn().mockRejectedValueOnce(new Error('test error')),
        },
      },
    };

    mockGetOctokit.mockReturnValueOnce(mockRest as any);

    await run();

    expect(mockGetInput).toHaveBeenCalledWith('github-token');
    expect(mockGetOctokit).toHaveBeenCalledWith('token');
    expect(mockRest.rest.issues.addLabels).toHaveBeenCalledWith({
      owner: 'owner',
      repo: 'repo',
      issue_number: 123,
      labels: ['hotfix'],
    });
    expect(mockSetFailed).toHaveBeenCalledWith('test error');
  });

  it('should set failed with `An unexpected error occurred!` error message if an error occurs without an error message', async () => {
    mockContext.payload = {
      pull_request: {
        number: 123,
        title: '[HOTFIX]: This is a hotfix',
      },
    };
    (mockContext.repo as any) = {
      owner: 'owner',
      repo: 'repo',
    };

    mockGetInput.mockReturnValueOnce('token');

    const mockRest = {
      rest: {
        issues: {
          addLabels: jest.fn().mockRejectedValueOnce(new Error()),
        },
      },
    };

    mockGetOctokit.mockReturnValueOnce(mockRest as any);

    await run();

    expect(mockGetInput).toHaveBeenCalledWith('github-token');
    expect(mockGetOctokit).toHaveBeenCalledWith('token');
    expect(mockRest.rest.issues.addLabels).toHaveBeenCalledWith({
      owner: 'owner',
      repo: 'repo',
      issue_number: 123,
      labels: ['hotfix'],
    });
    expect(mockSetFailed).toHaveBeenCalledWith('An unexpected error occurred!');
  });
});
