This file establishes norms and conventions for different parts of the project. It will hopefully make development easier, less confusing and more streamlined.

# Workflow

To make a change in the project, please follow the rules below.

1. Choose an area to work on, perhaps something from the issue list.
2. Create a new branch. **Do not** work on the main branch. Give the branch a meaningful name that reflects what you are working on.
3. Write code. Document whatever you make. Commit when needed. Try to divide your commits evenely, with one commit - one thing.
4. Test that the code works. Create tests and see if the code is working properly.
5. Create a pull request. Once you are done, create a pull request to the main branch. One of the others will close it.

# Conventions

- For naming of anything, use **camelCase**.
- Do not use any semicolons (;) where they are not required. 
- Add JSDoc to any code that needs clarificatiions.

# How to commit
Follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)

```
<type>[optional scope]: <description>
[optional body]
[optional footer(s)]
```
### Types
- `fix`: fixes a bug
- `feat`: introduces a new feature
- `test`: adds tests
- `docs`: adds documentqation
- `refactor`: changes that neither fix a bug nor add a feature
- `style`: changes that do not affect the meaning of the code (white spaces, formtting etc.)
- `build`: changes that affect the build system or dependencies
- `ci`: changes to CI/CD configuration
- `misc`: miscelanious

### Scope
Use what you feel fit for the scope or do not specify the scope at all.

# How to test
Write something about jest in the future

# Issues

If you find a bug, want to add a feature or something is missing - create an issue. We will deal with it later. 

While creating issues, use correct labels. 

# Pull-requests

# Labels

For better understanding of different issues, pull-requests and commits, we use following label system. Each label has it's own one-letter prefix category. 

## Area - A
Mutually exclusive and required, every issue should have exactly one of these labels.

Labels:
- A-everything: Related to the whole codebase
- A-ci: Related to the CI/CD pipelines
- A-backend: Related to the backend
- A-frontend: Related to the frontend

## Priority - P
Mutually exclusive and required, every issue should have exactly one of these labels.

Labels:
- P-high
- P-medium
- P-low

## Type - T
Mutually exclusive and required, every issue should have exactly one of these labels.

Labels:
- T-bug: Found a bug
- T-feature: Missing features that should be implemented
- T-docs: Improvements or additions to documentation
- T-misc: Miscelanious

## Status - S
Mutually exclusive, every issue should have at most one of these labels, but could have none.

Labels:
- S-help-needed: When you need help with the issue
- S-pending: The issue is waiting for decision, information or other issues to be resolved
- S-invalid: This doesn't seem right
- S-rejected: This will not be done

## Category - C
Not mutually exclusive, issues could have multiple of these labels.

Labels:
- C-database: Database related issues
- C-dependency: Issues with dependencies
- C-styling: Styling of code, configuration etc.
- C-assets: Issues related to assets, such as images
