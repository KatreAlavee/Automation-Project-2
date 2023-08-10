import { faker } from '@faker-js/faker';

describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

    it('Should create a comment successfully', () => {
        const comment = 'TEST_COMMENT';

        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...')
                .click();

            cy.get('textarea[placeholder="Add a comment..."]').type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.contains('Add a comment...').should('exist');
            cy.get('[data-testid="issue-comment"]').should('contain', comment);
        });
    });

    it('Should edit a comment successfully', () => {
        const previousComment = 'An old silent pond...';
        const comment = 'TEST_COMMENT_EDITED';

        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="issue-comment"]')
                .first()
                .contains('Edit')
                .click()
                .should('not.exist');

            cy.get('textarea[placeholder="Add a comment..."]')
                .should('contain', previousComment)
                .clear()
                .type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.get('[data-testid="issue-comment"]')
                .should('contain', 'Edit')
                .and('contain', comment);
        });
    });

    it('Should delete a comment successfully', () => {
        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .contains('Delete')
            .click();

        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete comment')
            .click()
            .should('not.exist');

        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .should('not.exist');
    });

    const myComment = faker.lorem.sentence()
    const getIssueComment = () => cy.get('[data-testid="issue-comment"]')

    it('Should add, edit and delete a comment successfully', () => {
        //Add comment
        getIssueDetailsModal()
        cy.contains('Add a comment...').click();
        cy.get('textarea[placeholder="Add a comment..."]').type(myComment);
        cy.contains('button', 'Save').click()

        //Assert, that comment is added and visible
        cy.contains('Add a comment...').should('exist');
        cy.contains(myComment).should('exist');

        //Edit comment
        getIssueComment()
        cy.contains('Edit').click()
        cy.get('textarea[placeholder="Add a comment..."]').clear().type(myComment)
        cy.contains('button', 'Save').click()

        //Assert, that updated comment is visible
        cy.contains('Add a comment...').should('exist');
        getIssueComment().should('contain', myComment);

        //Remove comment
        getIssueDetailsModal()
        .find('[data-testid="issue-comment"]').first().contains('Delete').click()
        cy.get('[data-testid="modal:confirm"]').contains('button', 'Delete comment').click().should('not.exist')

        //assert, that comment is deleted and not visible
        getIssueDetailsModal().contains(myComment).should('not.exist');
    });



});