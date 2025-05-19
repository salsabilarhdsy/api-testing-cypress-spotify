# Cypress API Test Starter

A simple-quick setup for API testing with **Cypress**.

This project includes the following dev dependencies:
```bash
npm install cypress --save-dev
```

## Getting Started

1. **Clone this repository**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run Cypress**
   ```bash
   npx cypress run
   ```
   Or run in interactive mode:
   ```bash
   npx cypress open
   ```

---

## Configuration Steps

1. **Set your API base URL**

   Add your base URL to `cypress.config.js`:
   ```js
   const { defineConfig } = require("cypress");

   module.exports = defineConfig({
     e2e: {
       baseUrl: 'https://dummyjson.com',
       setupNodeEvents(on, config) {
         // implement node event listeners here
       },
     },
   });
   ```

3. **Use custom commands**  
   You can define a reusable login command in `cypress/support/commands.js`:
   ```js
   Cypress.Commands.add('loginAPI', () => {
     cy.request({
       method: 'POST',
       url: '/auth/login',
       body: {
         username: 'emilys',
         password: 'emilyspass',
       },
     }).then((res) => {
       Cypress.env('token', res.body.token);
       cy.log(`Bearer Token: ${res.body.token}`);
     });
   });
   ```

---

## Example Test Case

The `api/products.cy.js` file demonstrates:

1. **HTTP methods**:
   - GET `/products`
   - POST `/products/add`
   - PUT `/products/1`
   - DELETE `/products/1`

2. **Authorization Header (Bearer Token)**:
   ```js
   headers: {
     Authorization: `Bearer ${Cypress.env('token')}`,
   }
   ```

3. **Assertions with Chai (Expect)**:
   - `to.equal()`
   - `to.be.an(data type)`
   - `to.have.property()`
   - `to.contain()`
   - `to.deep.contain()`
   - `to.be.within()`
   - `to.include()`
   - `to.have.lengthOf()`
   - `to.be.true`

Use `api/products.cy.js` or the default example `default-example/` as a reference when creating new test scenarios.

---

## Bonus Tips

- Run specific spec file:
  ```bash
  npx cypress run --spec "cypress/e2e/api/products.cy.js"
  ```

- Customize the script run in package.json
  ```js
  "scripts": {
    "cy:run": "cypress run",
    "cy:open": "cypress open",
    "cy:api": "cypress run --spec 'cypress/e2e/api/*.cy.js'"
  }
  ```


