# Amusement Park Recruiting System
Project for IV1201 - Design of Global Applications at KTH.

## About the project
In this document word "app" will be used to describe a digital application, meanwhile "application" will be used to describe a job application.

This project is a web app that is made to help an amusement park to recruit new staff. The system has two types of users: applicants and recruiters. An applicant can send an application for a position within the company and a recruiter can accept or decline the application. The system has two parts: registration and administration of applications.

The app is built according to MVC (Model-View-Controller) system. Model includes logic, DTO classes and sequelize containers. Views are different components that are displayed to the user. Controller connects Views and Models with each other. There is also an Integration layer that includes connection to the Database. About the structure of database you can read here [Insert link]. 

Controller, Integration and Models are located in the respective folders. Views are separated to ejs, javascript and css files and are located in the api folder. Api also includes error handling functionality. Tests are made with Jest and are located in the test folder. Util folder hosts useful utility functions, such as logger and validators. 

You can use docker with this app. 

If you wish to contribute to this project, read the next section below. Changes on the main branch only happen through pull requests of other branches.

App is currently deployed on Render. It will automatically update to the latest commit on the main branch.

## How to start
- Read this document.
- Read [Workflow document](https://github.com/Ainraven/iv1201/blob/main/workflow.md), it has most of the useful information on how to make your first contribution to the project.
- Create a fork/branch of the project
- Start working!
