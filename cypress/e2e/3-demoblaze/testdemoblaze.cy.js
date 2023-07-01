describe('Demoblaze Web Testing', () => {

  it('Successful Signup', () => {
    cy.visit('https://demoblaze.com/index.html')
    cy.get('[data-target="#signInModal"]').click()
    cy.get('#sign-username').type('tipupul').should('be.visible')
    cy.get('#sign-password').type('123').should('be.visible')
    cy.get("[onclick='register()']").click()
  })

  it('Successful purchase order', () => {
    cy.visit('https://demoblaze.com/index.html')
    cy.wait(50)
    // click link text login
    cy.get("[data-target='#logInModal']").click()
    cy.get("[onclick='logIn()']").should('be.visible')
 
    // fill username & password
    cy.get('#loginusername').type('tipupul').should('be.visible')
    cy.get('#loginpassword').type('123').should('be.visible')
    cy.get("[onclick='logIn()']").click()
    
    // assert homescreen
    //cy.get('#nameofuser').should('contain', 'tipupul')
    //select an item
    cy.get('#tbodyid > div:nth-of-type(5) .hrefch').click()
    cy.get('.name').should('contain', 'Iphone 6 32gb')
    //add to cart
    cy.get('.btn-success').click()
    //Confirm alert
    cy.on('window:alert', (str) => {
    expect(str).to.equal('Product added.')
    })
    cy.on('window:confirm', () => true)
    cy.get('#cartur').click() 

    //assert page
    cy.location("pathname").should("eq", "/cart.html")
    //assert item
    cy.get('td:nth-of-type(2)').should('contain', 'Iphone 6 32gb')
    //Place order
    cy.get('.btn-success').should('be.visible').click()
    

    cy.get("[onclick='purchaseOrder()']").should('be.visible')
    cy.screenshot(); //6
    cy.get('#name').type('nurmawar').should('have.value', 'nurmawar')
    cy.get('#country').type('Indonesia').should('have.value', 'Indonesia')
    cy.get('#city').type('Mojokerto').should('have.value', 'Mojokerto')
    cy.get('#card').type('1234-5678-1234-5678').should('have.value', '1234-5678-1234-5678')
    cy.get('#month').type('9').should('have.value', '9')
    cy.get('#year').type('21').should('have.value', '21')
    cy.get("[onclick='purchaseOrder()']").click()

    cy.get('.sweet-alert > h2').should('be.visible').should('contain', 'Thank you for your purchase!')
    cy.get('.confirm').click()
    cy.screenshot(); //8
    //logout
    cy.visit('https://demoblaze.com/index.html')
    cy.get("[onclick='logOut()']").click()
    

    cy.get("[data-target='#logInModal']").should('be.visible')
  });

  it('Successful contact email', () => {
    cy.visit('https://demoblaze.com/index.html')
    cy.wait(50)
    // click link text login
    cy.get("[data-target='#logInModal']").click()
    cy.get("[onclick='logIn()']").should('be.visible')
    
    // fill username & password
    cy.get('#loginusername').type('tipupul').should('be.visible')
    cy.get('#loginpassword').type('123').should('have.value', '123')
    // click button login
    cy.get("[onclick='logIn()']").click()
    
    // assert homescreen
    //cy.get('#nameofuser').should('contain', 'tipupul')

    //click contact menu
    cy.get("[data-target='#exampleModal']").click()
    cy.get("[onclick='send()']").should('be.visible')

    //fill in form
    cy.get('#recipient-email').click().type('nrmawar@email.com').should('have.value', 'nrmawar@email.com')
    cy.get('#recipient-name').type('Random User').should('have.value', 'Random User')
    cy.get('#message-text').type('Hello, Mawar !').should('have.value', 'Hello, Mawar !')

    //send message
    cy.get("[onclick='send()']").click()

    //Confirm alert
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Thanks for the message!!')
    })
    cy.on('window:confirm', () => true)
  });
});