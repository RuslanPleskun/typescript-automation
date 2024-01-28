## Getting Started

!!! The same tests as in https://github.com/RuslanPleskun/test-repo but with the usage of TypeScript as primary programming language instead of JavaScript

1. Install NodeJS
    *Requirement: Node.js version 18 or higher*

2. Create an empty folder, open terminal in that folder, clone repository with the following command and switch to that folder:
`git clone https://github.com/RuslanPleskun/test-repo.git`

2. Run `npm install` to install all the dependencies

3. Run `npm i typescript` to install TypeScript

4. Run `npm i --save-dev cypress-mochawesome-reporter` to install Mochawesome needed dependencies

5. Run the following commands to verify test results:

* `npm run e2e_complete` - to run tests in headless mode and generate report with attached video and screenshots(only if test fails and report will be visible only locally, it was ignored in .gitignore file)
* `npm run test` - to run tests in headed mode
* `npx cypress open` - to run tests manually using UI


## Architecture

Cypress expects certain folders to be named a certain way so if you're wanting to rename folders you need to update the cypress.json file to tell it where to look for those files.

* fixtures - used for static data that needs to be used by the tests and they should reside in the fixtures folder
* e2e - the actual tests that get ran, they should reside in the integration folder
* component-objects - classical approach with page objects
* support - utility functions and plugins for Cypress
