/**
 * This is an example file and approach for POM in Cypress
 */
import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //open issue detail modal with title from line 16  
    cy.contains(issueTitle).click();
    });
  });

  //issue title, that we are testing with, saved into variable
  const issueTitle = 'This is an issue of type: Task.';

  it('Should delete issue successfully', () => {
    IssueModal.getIssueDetailModal();
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();
    IssueModal.ensureIssueIsNotVisibleOnBoard(issueTitle)
  });
  
  it('Should cancel deletion process successfully', () => {
    IssueModal.getIssueDetailModal();
    IssueModal.clickDeleteButton ();
    IssueModal.cancelDeletion();
    IssueModal.closeDetailModal();
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle);
  });
});

//Good job done! I have small suggestion to share for improvement of the code, 
//inside of the code part that repeat itself at least two times we can re-use the code 
//and pass some params as a part of the function, 
//for example: ensureIssueIsVisibleOnBoard(issueTitle){ cy.get(this.issueDetailModal).should('not.exist'); cy.reload(); cy.contains(issueTitle).should('be.visible'); } We can change the function to have additional param inside called "isVisible", this will represent boolean param which will control the assertion that we need to use. validateIssueVisibilityState(issueTitle, isVisible = true) { cy.get(this.issueDetailModal).should('not.exist'); cy.reload(); if (isVisible) cy.contains(issueTitle).should('be.visible'); if(!isVisible) cy.contains(issueTitle).should('not.be.visible'); // or using if else constructor, doesn't matter here } This way we would not need to create similar function for checking when issue is not visible on the board. 
//Keep up the good work! I see proper POM usage here!