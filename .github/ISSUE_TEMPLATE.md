# Definition of Done (DoD) Checklist

**Task State:** Ready to be moved to the "Done" column in GitHub Projects.

---

## I. Development & Code Quality
- [ ] All acceptance criteria defined in the task/issue have been met.
- [ ] Code is written following the team's established coding standards and best practices.
- [ ] Code is self-documenting where possible, with clear inline comments for complex logic.
- [ ] No known critical bugs introduced by the changes.

---

## II. Branching & Version Control
- [ ] All work has been completed on a dedicated feature branch created from the `develop` branch.
- [ ] The feature branch has been appropriately named according to team conventions.
- [ ] The feature branch has been rebased/merged with the latest `develop` branch to resolve any conflicts before the Pull Request.
- [ ] Commit messages are clear, concise, and follow the team's defined format.

---

## III. Automated Testing (CI/CD Pipeline)
*This section assumes CI runs on the feature branch/PR before merging to `develop`.*
- [ ] All linting checks pass successfully.
- [ ] All unit tests pass successfully.
- [ ] All integration tests pass successfully.
- [ ] Test coverage meets the agreed-upon minimum of 70-80% (confirm specific target if it varies).
- [ ] The full CI/CD pipeline (linting, unit tests, integration tests) has passed successfully for the feature branch.

---

## IV. Manual Testing (Performed in "Testing" column or during "Code Review")
- [ ] Manual testing (e.g., UI testing, exploratory testing for specific cases) as defined for the task has been completed by another developer or QA person.
- [ ] All issues identified during manual testing have been addressed and re-verified.

---

## V. Documentation
- [ ] `package.json` version has been updated appropriately (if applicable to the changes).
- [ ] `CHANGELOG.md` has been updated with a clear and concise description of the changes made.
- [ ] Any other relevant technical documentation (e.g., READMEs, API documentation, configuration changes) stored in markdown files has been created or updated.

---

## VI. Code Review (Performed in "Code Review" column)
- [ ] A Pull Request (PR) has been created targeting the `develop` branch.
- [ ] The PR description clearly explains:
    - [ ] What changes were made.
    - [ ] The problem or feature being addressed.
    - [ ] How to test or verify the changes.
- [ ] The PR has been reviewed and approved by at least one other developer or QA person as per team policy.
- [ ] All comments, questions, and feedback from the code review have been addressed and resolved.

---

## VII. Merge & Final Verification
- [ ] The approved feature branch has been successfully merged into the `develop` branch.
- [ ] The CI/CD pipeline has passed successfully on the `develop` branch after the merge.
    *(This confirms successful integration without breaking the `develop` branch).*
- [ ] The associated task/issue in GitHub Projects is now ready to be moved to the "Done" column.

---

### How to Use This DoD with Your Kanban Columns:

* **Todo (Backlog):** When an issue is created or picked up, this DoD checklist can be added to the issue description (ideally via a GitHub issue template).
* **In Development:** The developer works on the task, aiming to satisfy the relevant DoD items (Development, Branching, starting on Automated Testing, initial Documentation).
* **Testing:**
    * The developer ensures all their automated tests are passing.
    * Manual testing is performed by another developer/QA as per item IV. Any feedback is addressed by the developer.
    * The developer ensures CI/CD pipeline (item III) fully passes on their feature branch.
* **Code Review:**
    * A PR is submitted.
    * The reviewer(s) (another developer or QA) go through the code, verify documentation (item V), and ensure all prior DoD points (especially testing) appear to be met. They provide feedback (item VI).
    * The original developer addresses feedback.
* **Done:**
    * Once the PR is approved and all DoD checkboxes are ticked, the feature branch is merged into `develop`.
    * A final check that CI passes on `develop` (item VII).
    * The card is moved to the "Done" column in GitHub Projects.

**Note on Merging to `main`:**
This DoD focuses on getting a task "Done" and integrated into your `develop` branch. The process of merging from `develop` to `main` (which then might trigger deployment) can be considered a separate step, potentially part of a release process, or could have its own "Release DoD" if it involves further checks or coordination. For the context of a single task being "Done" on your Kanban board, merged and verified on `develop` is a common and solid approach.

### Suggestions for Implementation:

1.  **GitHub Issue Templates:** Create an issue template in your repository's `.github/ISSUE_TEMPLATE` directory (or `.github/` for older setups) that includes this checklist. This ensures every new task starts with the DoD.
2.  **Team Agreement:** Discuss this DoD with your team. Ensure everyone understands and agrees on each point. The DoD is a living document; it can be iterated upon as your team and processes evolve.
3.  **Visibility:** Keep the DoD visible. Pin it in your team's chat, link it in your repository's `CONTRIBUTING.md` or `README.md`.
4.  **Consistency:** Strive for consistency in applying the DoD. This helps maintain quality and predictability.
