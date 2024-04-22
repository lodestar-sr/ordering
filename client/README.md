# Sales Management Client - README

This is the front-end of the Sales Management application developed in React.js.

## Application Structure

- Main application entry point: `src/index.js`.
- Main App Component: `src/App.js`.
- Routes are defined in: `src/components/Routes.js`.
- Order related components, validation, and context files are located in:
  - `src/components/Order/Orders.js`
  - `src/validations/OrderValidationSchema.js`
  - `src/context/OrderContext.js`
  - `src/hooks/useOrders.js`
- Unittest file usually at the same place of the main file.
  + Ex: `src/App.test.js` for `src/App.js`
  + `src/components/Order/Orders.test.js` for `src/components/Order/Orders.js`

## Setting Up and Running the Application

1. Ensure Node.js is installed on your system. This application was created using Node.js version 21.7.3.
    + If you don't have nvm installed, you can install it by following the instructions on the official GitHub repository: [nvm-sh/nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
    + `nvm install 21.7.3`
2. Run `yarn install` to install the application dependencies.
3. To start the application in development mode, run `yarn start`.

    The application will start, and by default, it can be accessed at [http://localhost:3000](http://localhost:3000).

4. For build, use `yarn build`.
5. For test, use `yarn test`.

## API Server

The API server by default is `http://localhost:9000` and the version is `v1`. Modify `src/config.js` to change the API server.

## Additional Notes

- The project uses Jest for testing. The configuration file can be found at `jest.config.js`.
- ESLint is used for linting. The configuration file is located at `.eslintrc.js`.
