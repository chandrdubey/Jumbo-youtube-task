<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Description

## Backend Implementation Using NestJS, Express, TypeScript, and Postgres

### Overview

This document outlines the backend implementation for signup, login and profile features using NodeJS with ExpressJS framework and a MySQL database. The application is implemented using NestJS, which is a scalable, efficient, and structured server-side Node.js framework built with TypeScript. It also uses Express.js under the hood and is compatible with the majority of Express.js middleware.

### Code Structure

The main file of the application is located at apps/rest/src/main.ts. This file creates a factory module similar to an Express app. The code is organised using the repository pattern for DB operations, making it modular and maintainable.

### Validation and Error Handling

The application uses global validations and an error Pipe for intercepting errors and providing appropriate responses. It utilises the class-validator library to validate incoming data.

### Database Operations

The application uses Objection.js and Knex.js as ORM (Object-Relational Mapping) tools to interact with the MySQL database. These ORMs provide a powerful query API and help to prevent SQL injection attacks.

### Data Transformation

A transformer layer is implemented to transform the response data according to the requirements. This layer helps to ensure that the data sent to the client is in the correct format and can be easily consumed.

### NestJS and TypeScript

NestJS is a framework for building efficient, scalable Node.js server-side applications. It uses modern JavaScript, is built with TypeScript and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming) .

### TypeScript

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It offers static types, classes, and interfaces to help you build robust components. When you use TypeScript, you can catch errors early during the development process.

### Dependency Injection

NestJS uses Dependency Injection (DI) to organize the code in a flexible and efficient manner. DI is a design pattern in which a class receives its dependencies from external sources rather than creating them itself. This leads to more modular, testable, and maintainable code .

### Conclusion

This application demonstrates how to implement a secure and efficient backend using NodeJS with ExpressJS framework, MySQL database, and TypeScript. It uses best practices such as server-side validation, error handling, and secure coding. The code is well-structured and modular, making it easy to maintain and extend in the future.

## Installation

```bash
$ npm install
```

## Migration

```bash
$ npm run migrate:up
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
