# GRANT EASE
## SD Project 2024

This project is a fullstack application for Grant Ease, a platform for grant applications.

[![codecov](https://codecov.io/gh/TheNumbered/grant-ease/graph/badge.svg?token=DI4459MDBF)](https://codecov.io/gh/TheNumbered/grant-ease)
<br/>
## Code Coverage Graph
<img src="https://codecov.io/gh/TheNumbered/grant-ease/graphs/icicle.svg?token=DI4459MDBF"/>

## Getting Started

### Prerequisites

Make sure you have the following software installed on your machine:
- [Node.js](https://nodejs.org/)
- [PNPM](https://pnpm.io/)

### Installation

1. Clone the repository.
    ```shell
    git clone https://github.com/TheNumbered/grant-ease.git
    ```

2. Navigate to the project directory.
    ```shell
    cd grant-ease
    ```

3. Install the global dependencies.
    ```shell
    npm run install-global-dep
    ```

4. Install the dependencies for each module.
    ```shell
    pnpm  install
    ```

## Configure App

To configure the app, you need to set the following environment variables:

### Frontend Environment Variables

- `VITE_API_URL`: The API URL for the backend server.
- `VITE_CLERK_PUBLISHABLE_KEY`: The publishable key for Clerk authentication.

### Backend Environment Variables

- `CLERK_SECRET_KEY`: The secret key for Clerk authentication.
- `MYSQL_DATABASE`: The name of the MySQL database.
- `MYSQL_HOST`: The host of the MySQL database.
- `MYSQL_PASSWORD`: The password for the MySQL database.
- `MYSQL_PORT`: The port of the MySQL database.
- `MYSQL_USER`: The username for the MySQL database.

Make sure to set these environment variables before running the app.

## Usage

- To start the backend server, run the following command:
    ```shell
    pnpm backend
    ```

- To start the frontend development server, run the following command:
    ```shell
    pnpm frontend
    ```

- To build the frontend for production, run the following command:
    ```shell
    pnpm build
    ```

## Testing

- To run tests, use the following command:
    ```shell
    pnpm test
    ```

- To generate test coverage report, use the following command:
    ```shell
    pnpm coverage
    ```
*For database migrations read the README.MD in backend/db/README.MD

*Note: Some files are hidden by default. To show these files, navigate to `.vscode/settings.json` and comment out the file you want to show.*
