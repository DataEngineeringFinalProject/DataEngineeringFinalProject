describe('Toxicity', () => {
    beforeEach(() => { cy.visit('http://localhost:9080/');
    cy.get('#identity').should('be.empty')
    cy.get('#insult').should('be.empty')
    cy.get('#obscene').should('be.empty')
    cy.get('#S_Toxicity').should('be.empty')
    cy.get('#Threat').should('be.empty')
    cy.get('#Toxicity').should('be.empty')
    })

    it('enter insult', () => {
    cy.get('#sentence').type('you are a cunt')
    cy.get('form').submit()
    cy.get('#identity').should('not.be.empty').contains('Identity Attack :')
    cy.get('#insult').should('not.be.empty').contains('Insult : ')
    cy.get('#obscene').should('not.be.empty').contains('Obscene :')
    cy.get('#S_Toxicity').should('not.be.empty').contains('Severe Toxicity :')
    cy.get('#Threat').should('not.be.empty').contains('Threat :')
    cy.get('#Toxicity').should('not.be.empty').contains('Toxicity :')
    })

    })

