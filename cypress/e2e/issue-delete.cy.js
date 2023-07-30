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


    it.skip('Should delete an issue and validate it successfully', () => {
        cy.get('[data-testid="modal:issue-details"]').within(() => {
            cy.get('[data-testid="icon:trash"]').click();
        });
        //Confirm deletion
        cy.get('[data-testid="modal:confirm"]').should('be.visible');
        cy.contains('Delete issue').click();
        cy.get('[data-testid="modal:confirm"]').should('not.exist');
        cy.contains('This is an issue of type: Task.').should('not.exist');
    })


    it.skip('Should start deleting issue process and canceling this action', () => {
        cy.get('[data-testid="modal:issue-details"]').within(() => {
            cy.get('[data-testid="icon:trash"]').click();
        });

    //Cancel the deletion in the confirmation pop-up
    cy.get('[data-testid="modal:confirm"]').should('be.visible');
    cy.contains('Cancel').click();
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    cy.get('[data-testid="icon:close"]').first().click();
    //Confirm that the issue is not deleted and is still on Kanban board
    cy.contains('This is an issue of type: Task.').should('be.visible');
    })    
});

describe('Issue delete', () => {
    let issueTitle = "";
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.get('[data-testid="board-list:backlog').should('be.visible').within(() => {
                // Get the first issue from the backlog board, and save the issue title to variable
                cy.get('[data-testid="list-issue"]').first().find('p')
                .invoke("text")
                    .then((text) => {
                        issueTitle = text;
                    });
                // Open the first issue
                cy.get('[data-testid="list-issue"]').first().click();
            });
        });
    });

  it.skip('Test 1 - Delete an issue from board and validate that it is deleted', () => {
    cy.get('[data-testid="icon:trash"]').click();
    // Deletion confirmation dialog should be visible
    cy.get('[data-testid="modal:confirm"]').should('be.visible').within(()=>{
        // Select Confirm delete button and click it
        cy.get('[class="sc-bwzfXH dIxFno sc-kGXeez bLOzZQ"]').click();
    });

    // Assert, that deletion confirmation dialogue is not visible.
    cy.get('[data-testid="modal:confirm"]').should('not.exist');

    // Waiting for page to remove the issue, since the load times are trash.
    cy.wait(15000);

    // Validate that the first issue is no longer present
    cy.get('[data-testid="board-list:backlog').should('be.visible')
        .contains("p", issueTitle)
        .should("not.exist");
  });

  it.skip('Test 2 - cancel issue deletion in dialogue', () => {
    cy.get('[data-testid="icon:trash"]').click();
    // Deletion confirmation dialog should be visible
    cy.get('[data-testid="modal:confirm"]').should('be.visible').within(()=>{
        // Select Cancel button and click it
        cy.get('[class="sc-bwzfXH ewzfNn sc-kGXeez bLOzZQ"]').click();
    });

    // Assert, that deletion confirmation dialogue is not visible.
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    cy.get('[class="sc-bdVaJa fuyACr"][data-testid="icon:close"]').click();


    // Waiting for page to fully load, since the load times are trash.
    cy.wait(15000);

    // Validate that the issue still exists
    cy.get('[data-testid="board-list:backlog').should('be.visible')
        .contains("p", issueTitle)
        .should("exist");
  });
});

describe('Issue create', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            // open first available issue
            cy.get('[data-testid="board-list:backlog"]').children().eq(0).click();
        });
    });

    // Assignment 3. Test 1
    it('Delete first issue and verify it has been successfully removed from board', () => {

        let issueTitle

        //Getting issue details modal and working with it.
        cy.get('[data-testid="modal:issue-details"]').as('issueModal').should('be.visible');
        cy.get('@issueModal').within(() => {

            cy.get('[placeholder="Short summary"]').invoke('text').then((title) => {
                issueTitle = title;
                cy.log(`Deleting issue: "${issueTitle}"`)
            })

            cy.get('[data-testid="icon:trash"]').click()

        }).then(() => {

            // only then working with confimation modal and board list, preventing async execusion 
            cy.get('[data-testid="modal:confirm"]').contains('Delete issue').click()
            cy.get('[data-testid="modal:confirm"]').should('not.exist')

            cy.reload()

            // assert target issue is deleted and not visible on the jira board
            cy.get('[data-testid="board-list:backlog"]').children().should('not.contain', issueTitle);

        });

    });

    // Assignment 3. Test 2
    it('Start issue delete process and abort it. Verify issue is not affected', () => {

        let issueTitle

        //Getting issue details modal and working with it.
        cy.get('[data-testid="modal:issue-details"]').as('issueModal').should('be.visible');
        cy.get('@issueModal').within(() => {

            cy.get('[placeholder="Short summary"]').invoke('text').then((title) => {
                issueTitle = title;
                cy.log(`Deleting issue: "${issueTitle}"`)
            })

            cy.get('[data-testid="icon:trash"]').click()

        }).then(() => {

            // only then working with confimation modal and board list, preventing async execusion 
            cy.get('[data-testid="modal:confirm"]').contains('Cancel').click()
            cy.get('[data-testid="modal:confirm"]').should('not.exist')

            cy.reload()

            cy.get('@issueModal').within(() => {
                cy.get('[data-testid="icon:close"]').first().click();
            })
            // assert target issue is not deleted and visible on the jira board
            cy.get('[data-testid="board-list:backlog"]').children().should('contain', issueTitle);

        });

    });

});

//staff comments: Great work! Small suggestion on the line 4 use 
//Cypress.env() to get base URL: https://github.com/KatreAlavee/Automation-Project-5/blob/master/cypress/e2e/issue-delete.cy.js#L4