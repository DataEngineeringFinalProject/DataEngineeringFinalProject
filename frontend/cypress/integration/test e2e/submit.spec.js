describe('Toxicity', () => {
    beforeEach(() => { cy.visit('http://localhost:80/');
    })
    
    it('enter insult', () => {
    cy.get('#sentence').type('you are a cunt')
    })
})