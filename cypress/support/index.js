// cypress/support/index.js

Cypress.on('uncaught:exception', (err) => {
    // Ignore the NS_BINDING_ABORTED error
    if (err.message.includes('NS_BINDING_ABORTED')) {
      return false;
    }
  
    // If you want to ignore other errors, you can customize this section
  
    // Returning false here prevents Cypress from failing the test
    return false;
  });
  