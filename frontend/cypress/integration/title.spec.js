describe('Toxicity', () => {
    beforeEach(() => {
      cy.visit('http://localhost:9080/');
    });
  
    it('has the correct title', () => {
      cy.title().should('equal', 'Frontend');
    });
  });