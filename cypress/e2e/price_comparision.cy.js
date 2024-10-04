describe('E-commerce Product Search and Comparison', () => {

  

    it('Search and Capture iPhone 14 128GB Details on Amazon.in', () => {
        cy.visit('https://www.amazon.in');
        cy.searchProductOnAmazon('iPhone 14 128GB');

        cy.get('@productName').then(name => cy.log('Amazon Product Name: ' + name));
        cy.get('@productPrice').then(price => cy.log('Amazon Product Price: ₹' + price));
        cy.get('@productLink').then(link => cy.log('Amazon Product Link: ' + link));
    });

    it('Search and Capture iPhone 14 128GB Details on Flipkart.com', () => {
        cy.searchProductOnFlipkart('iPhone 14 128GB');

        cy.get('@productName').then(name => cy.log('Flipkart Product Name: ' + name));
        cy.get('@productPrice').then(price => cy.log('Flipkart Product Price: ₹' + price));
        cy.get('@productLink').then(link => cy.log('Flipkart Product Link: ' + link));
    });

    it('Navigate to Add to Cart, Buy Now, and Payment Gateway Screens', () => {
        cy.visit('https://www.amazon.in');
        cy.searchProductOnAmazon('iPhone 14 128GB');

       cy.get('button#a-autoid-1-announce').click();
        cy.wait(6000)
        cy.get('#nav-cart').click();
       cy.get('input[name="proceedToRetailCheckout"]').click();
    });

    it('Navigate to Add to Cart, Buy Now, and Payment Gateway Screens', () => {
       
        cy.searchProductOnFlipkart('iPhone 14 128GB');
        cy.get('@firstProduct').find('a.CGtC98').invoke('attr', 'href').then((productLink) => {
            const baseUrl = 'https://www.flipkart.com';
            const fullUrl = `${baseUrl}${productLink}`;
            cy.visit(fullUrl);
        });
         //  cy.get('button').contains('Add to cart').click({ force: true });
         //     cy.get('.QqFHMw.vslbG+.In9uk2.JTo6b7').click({ force: true });

        cy.get('button').contains('Buy Now').click({force:true});
    
    });

    it('Get Amazon Price for iPhone 14 128GB Blue', () => {
        cy.visit('https://www.amazon.in');
        cy.get('input[id="twotabsearchtextbox"]').type('iPhone 14 128GB Blue{enter}');
        cy.get('.s-main-slot .s-result-item').eq(2).find('span.a-price-whole').invoke('text').then(amazonPrice => {
        
            Cypress.env('amazonPrice', amazonPrice);
        });
    });

    it('Get Flipkart Price for iPhone 14 128GB Blue', () => {
        cy.visit('https://www.flipkart.com');
        cy.get('input[name="q"]').type('iPhone 14 128GB Blue{enter}');
        cy.get('._75nlfW').eq(2).find('div.Nx9bqj._4b5DiR').invoke('text').then(flipkartPrice => {
          
            Cypress.env('flipkartPrice', flipkartPrice);
        });
    });

    it('Compare Prices Between Amazon and Flipkart', () => {
        const amazonPrice = parseInt(Cypress.env('amazonPrice').replace(/,/g, ''));
        const flipkartPrice = parseInt(Cypress.env('flipkartPrice').replace(/₹/g, '').replace(/,/g, ''));
    
        if (amazonPrice < flipkartPrice) {
            cy.log('Amazon has the lowest price');
        } else {
            cy.log('Flipkart has the lowest price');
        }
    });
    

    });
