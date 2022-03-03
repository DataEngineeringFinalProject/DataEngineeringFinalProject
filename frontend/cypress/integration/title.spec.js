describe('Toxicity', () => {
    beforeEach(() => {
      cy.visit('http://192.168.1.35:9080/');
    });
  
    it('has the correct title', () => {
      cy.title().should('equal', 'Frontend');
    });
  });