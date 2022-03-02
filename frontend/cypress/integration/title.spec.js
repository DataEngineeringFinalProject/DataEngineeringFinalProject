describe('Toxicity', () => {
    beforeEach(() => {
      cy.visit('http://localhost:80/');
    });
  
    it('has the correct title', () => {
      cy.title().should('equal', 'Frontend');
    });
  });