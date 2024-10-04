Cypress.Commands.add('searchProductOnAmazon', (productName) => {
    cy.visit('https://www.amazon.in');
    cy.get('input[id="twotabsearchtextbox"]').type(`${productName}{enter}`);
   cy.get('.s-main-slot .s-result-item').eq(2).as('firstProduct');
    cy.get('span.a-size-medium.a-color-base.a-text-normal').first()
    .invoke('text').as('productName')
    
    cy.get('@firstProduct').find('span.a-price-whole').invoke('text').as('productPrice');
    cy.get('@firstProduct').find('a.a-link-normal').invoke('attr', 'href').as('productLink');
});

Cypress.Commands.add('searchProductOnFlipkart', (productName) => {
    cy.visit('https://www.flipkart.com');
    cy.get('input[name="q"]').type(`${productName}{enter}`);
    cy.get('._75nlfW').eq(2).as('firstProduct');
    cy.get('@firstProduct').find('div.KzDlHZ').invoke('text').as('productName');
    cy.get('@firstProduct').find('div.Nx9bqj._4b5DiR').invoke('text').as('productPrice');
    cy.get('@firstProduct').find('a.CGtC98').invoke('attr', 'href').as('productLink');
});
