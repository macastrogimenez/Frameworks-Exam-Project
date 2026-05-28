# T-shirt web shop project

This is a sample project of a web-shop in which we would sell different types of t-shirts. The idea is to implement a single page application in React connected to a back-end made with Node.js through a REST API using Express.
Moreover, this web showcases the basic implementation of a basket and its operations, product catalogue overview, authentication, validation, as well as responsive design.

## Resources

[Jira](https://itu-frameworks.atlassian.net/jira/software/projects/KAN/boards/1 "Kanban for project management")

[Notion](https://www.notion.so/Exam-Project-30f863b9ac2e8018b81ac6c034b746fe "Page for project planning and brainstorming")

### Mini-project 1: Front-end

[Github](https://github.com/macastrogimenez/miniproject1_webshop_frontEnd "basic front end with HTML, CSS and JS")

### Mini-project 2: Back-end

[Github](https://github.com/macastrogimenez/miniproject2_webshop_server "RESTFUL API with basic operations - basket, products and user")

## Final project: joining front and back-end

In this repository a complete version of the web-shop can be found:

- Back end: We will use the original REST API we have designed and connect it with
- Front end: A new Front end designed using React, TS and JS

### How to run project

#### Mac
0. Make sure Node.js is installed in your Mac - [Node.js](https://nodejs.org/en/download)
1. Install all dependencies - open command terminal on project root (only necessary the first time you run it): `make install`.
2. Open 2 terminals at project root:
    - Start the server by running on Terminal 1: `make server`
    - Start the client by running on Terminal 2: `make client`
  
#### Windows
0. Make sure Node.js is installed in your Pc - [Node.js](https://nodejs.org/en/download)
1. Install all dependencies - open command terminal (not PowerShell) on project root (only necessary the first time you run it) and run the following command: `cd client && npm install && cd ..\server && npm install`.
2. Open a command terminal at the project root and start the server by running: `cd server && npm start`
3. Open a second command terminal at the project root and start the client by running: `cd client && npm start`
