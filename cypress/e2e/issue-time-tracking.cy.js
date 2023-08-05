describe('Issue delete', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            //Create issue for Time Tracking
            cy.get('[data-testid="icon:plus"]').click();
            cy.get('[data-testid="modal:issue-create"]');
            //Type value to description input field
            cy.get('.ql-editor').type('Time tracking description');
            //Type value to title input field
            cy.get('input[name="title"]').type('Issue for Time Tracking');
            //open issue type dropdown and choose Story
            cy.get('[data-testid="select:type"]').click();
            cy.get('[data-testid="select-option:Story"]').click();
            //Click on button "Create issue"
            cy.get('button[type="submit"]').click();
            //Assert that modal window is closed and successful message is visible
            cy.get('[data-testid="modal:issue-create"]').should('not.exist');
            cy.contains('Issue has been successfully created.').should('be.visible');
            //Assert that successful message has dissappeared after the reload
            cy.reload();
            cy.contains('Issue has been successfully created.').should('not.exist');

        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

    it.skip('Should add, update and remove time estimation succsessfully', () => {
        //Select Issue for Time Tracking on Kanban board Backlog list
        cy.contains('Issue for Time Tracking').click()
        getIssueDetailsModal()
        //Check that time tracker has no spent time added (“No Time Logged” label is visible)
        getIssueDetailsModal().should("contain", "No time logged");
        //User adds value 10 to “Original estimate (hours)” field
        cy.get('[placeholder="Number"]').type('10');
        cy.contains('10h estimated').should('be.visible');
        //User closes issue detail page
        cy.get('[data-testid="icon:close"]').first().click();
        //User reopens the same issue to check that original estimation is saved
        cy.get('[data-testid="board-list:backlog"]').should("be.visible").contains('Issue for Time Tracking').click();
        cy.get('[placeholder="Number"]').should("have.value", 10);
        cy.contains("10h estimated").should("be.visible");

        //User changes value in the field “Original estimate (hours)” from previous value to 20
        getIssueDetailsModal()
        cy.get('[placeholder="Number"]').clear().type('20');
        cy.contains('20h estimated').should('be.visible');
        //User closes issue detail page
        cy.get('[data-testid="icon:close"]').first().click();
        //User reopens the same issue to check that original estimation is saved
        cy.get('[data-testid="board-list:backlog"]').should('be.visible').contains('Issue for Time Tracking').click();
        cy.get('[placeholder="Number"]').should('have.value', 20);
        cy.contains("20h estimated").should('be.visible');

        //User removes value from the field “Original estimate (hours)”
        cy.get('[placeholder="Number"]').click().clear();
        getIssueDetailsModal().should("contain", 'No time logged');
        cy.wait(3000);
        //User closes issue detail page
        cy.get('[data-testid="icon:close"]').first().click();
        //User reopens the same issue to check that original estimation is saved
        cy.get('[data-testid="board-list:backlog"]').should('be.visible').contains('Issue for Time Tracking').click();
        cy.get('[placeholder="Number"]').should('have.value', "").and('be.visible');

    });

    it('Should log time and remove logged time', () => {
        //Select Issue for Time Tracking on Kanban board Backlog list
        cy.contains('Issue for Time Tracking').click();
        //User clicks on time tracking section
        cy.get('[data-testid="icon:stopwatch"]').click();
        //Check that time tracking pop-up dialogue is opened
        cy.get('[data-testid="modal:tracking"]').should('be.visible');
        //User enters value 2 to the field “Time spent”
        cy.get('[placeholder="Number"]').eq(1).type('2');
        //User enters value 5 to the field “Time remaining”
        cy.get('[placeholder="Number"]').eq(2).type('5');
        //User click button “Done”
        cy.contains('button', 'Done').click();
        cy.get('[data-testid="modal:tracking"]').should('not.exist');
        //User click on time tracking section
        cy.get('[data-testid="icon:stopwatch"]').click();
        //Check that time tracking pop-up dialogue is opened
        cy.get('[data-testid="modal:tracking"]').should('be.visible');
        //User removes value from the field “Time spent”
        cy.get('[placeholder="Number"]').eq(1).clear();
        //User removes value from the field “Time remaining”
        cy.get('[placeholder="Number"]').eq(2).clear();
        //User click button “Done”
        cy.contains('button', 'Done').click();
        cy.get('[data-testid="modal:tracking"]').should('not.exist');
    });
});