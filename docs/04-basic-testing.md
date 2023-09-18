# Basic Testing

1. Link to the task: [basic-testing](https://github.com/AlreadyBored/basic-testing/blob/main/README.md)
2. Deadline date: 2023-07-04 01:00 (UTC +03:00)
3. Self-check with a preliminary assessment (249/258)

## Notes

- Use 18 LTS version of Node.js

## Scoring: Basic testing

### Check

For check simplification you have pre-implemented npm-scripts in `package.json`

### Basic Scope

For each implemented test-case:

- **+6** if test case is implemented correctly
- **+3** if test case is implemented incorrectly
- **0** if test case is not implemented

Test case is considered to be correctly implemented if:

- [x] Actually tests what's described in its title
- [x] Stable (multiple runs produce same test result)
- [x] Isolated (don't rely on external data/don't perform API calls)

### Forfeits

- [ ] **-5** for each linter warning
- [ ] **-10** for each linter/TS compiler error
- [ ] **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
