describe('Toxicity', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4200/');
    });
  
    it('has the correct title', () => {
      cy.title().should('equal', 'Frontend');
    });
  });