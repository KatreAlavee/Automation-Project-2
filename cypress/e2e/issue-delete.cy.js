describe('Issue delete', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();

            //Assert, that issue detail view modal is visible
            cy.get('[data-testid="modal:issue-details"]').should('be.visible');
        });
    });


    it('Should delete an issue and validate it successfully', () => {
        cy.get('[data-testid="modal:issue-details"]').within(() => {
            cy.get('[data-testid="icon:trash"]').click();
        });
        //Confirm deletion
        cy.get('[data-testid="modal:confirm"]').should('be.visible');
        cy.contains('Delete issue').click();
        cy.get('[data-testid="modal:confirm"]').should('not.exist');
        cy.contains('This is an issue of type: Task.').should('not.exist');
    })


    it('Should start deleting issue process and canceling this action', () => {
        cy.get('[data-testid="modal:issue-details"]').within(() => {
            cy.get('[data-testid="icon:trash"]').click();
        });

    //Cancel the deletion in the confirmation pop-up
    cy.get('[data-testid="modal:confirm"]').should('be.visible');
    cy.contains('Cancel').click();
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    cy.get('[data-testid="icon:close"]').first().click();
    cy.contains('This is an issue of type: Task.').should('be.visible');
    })    
});

