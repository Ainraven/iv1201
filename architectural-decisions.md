# Architectural Decisions
This document lists different architectural decisions made for this project and as to why specifically those decisions were made. 

## Conventions

- **Naming convention:** camelCase. No particular reason as to why exactly camelCase, but to standarise the names of files, functions and classes, this convention is simple enough.
- **Labels:** issues and pull requests must have labels associated to them, according to the rules described in the [Workflow document](https://github.com/Ainraven/iv1201/blob/main/workflow.md). This makes it easier to understand and filter both issues and pull requests.
- **Commits:** for understanding and better organisation in version control, commits must follow [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) with modifications, also described in the [Workflow document](https://github.com/Ainraven/iv1201/blob/main/workflow.md).
- **Semicolons** are ommitted in all places they are not required.
- **Classes** are used in most of the files where it is applicable.

## Organisation

- **GitHub** is used for version control, collaboration and general development.
- **Visual Studio Code** is an IDE of choice for all current contributors as it is easy to work with and supports all required frameworks.
- **Trello** is a canban board for organising and managing tasks within the team.
- **Google Drive and Google Environment** is used to store non-code related files and documents, such as meeting notes. 

## Communication

- **Discord** is the main communication channel as it is an easy solution for this amount of contributors.
- **Comments and reviews** on gitHub are also used to convey information about specific commits, functions or files.

## General

- **JSDocs** is used to document all functions in a proper manner. 
- **PostgreSQL and SQL** is used to work with the database.
- **Render** is used for deployment.
- **Node.js** is used to build the project and configure the required dependencies.
- **npm** package manager for Node

## Backend

- **Javascript** is used as a primary programming language for everything that requires programming.
- **Express.js** is the chosen framework.
- **Jest** is used for testing.
- **cls-hooked** is used to automate sequelize managed transactions.  
- **sequelize** ORM used for everything database related. It handles the models, queries and transactions.
- **bcrypt** encryption tool used to encrypt passwords in database.
- **pgAdmin** used to verify that database acts correctly during testing. 
- **nodemon** used to automate server starting during development

## Frontend

- **EJS** is used in frontend views with incorporation of HTML, CSS and Javascript.

## Middleware

- **JWT (JSON Web Tokens)** helps configure authorisation and authentication
