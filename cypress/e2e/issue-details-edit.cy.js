describe('Issue details editing', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });

  it.skip('Should update type, status, assignees, reporter, priority successfully', () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="select:type"]').click('bottomRight');
      cy.get('[data-testid="select-option:Story"]')
        .trigger('mouseover')
        .trigger('click');
      cy.get('[data-testid="select:type"]').should('contain', 'Story');

      cy.get('[data-testid="select:status"]').click('bottomRight');
      cy.get('[data-testid="select-option:Done"]').click();
      cy.get('[data-testid="select:status"]').should('have.text', 'Done');

      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('[data-testid="select:assignees"]').should('contain', 'Baby Yoda');
      cy.get('[data-testid="select:assignees"]').should('contain', 'Lord Gaben');

      cy.get('[data-testid="select:reporter"]').click('bottomRight');
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="select:reporter"]').should('have.text', 'Pickle Rick');

      cy.get('[data-testid="select:priority"]').click('bottomRight');
      cy.get('[data-testid="select-option:Medium"]').click();
      cy.get('[data-testid="select:priority"]').should('have.text', 'Medium');
    });
  });

  it.skip('Should update title, description successfully', () => {
      const title = 'TEST_TITLE';
      const description = 'TEST_DESCRIPTION';

      getIssueDetailsModal().within(() => {
        cy.get('textarea[placeholder="Short summary"]')
          .clear()
          .type(title)
          .blur();

        cy.get('.ql-snow')
          .click()
          .should('not.exist');

        cy.get('.ql-editor').clear().type(description);

        cy.contains('button', 'Save')
          .click()
          .should('not.exist');

        cy.get('textarea[placeholder="Short summary"]').should('have.text', title);
        cy.get('.ql-snow').should('have.text', description);
      });


      const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    });

  //Create test for checking dropdown “Priority” on issue detail page. 
  //Practice usage of array functions.
  //Predefine variable for expected number of elements in the priority dropdown,
  // for example “const expectedLength = 5”
  //Predefine empty array variable. Decide, which definition is needed: const or let?

  it('Should check dropdown "priority" on issue detail page', () => {
    const expectedLength = 5
    const priority = ["Highest", "High", "Medium", "Low", "Lowest"]

    let priorities = []
    priorities.push("Highest")



    //Push into this array first element from initially selected priority value 
    //(value, that is chosen in the dropdown when we open issue detail view).

    //Access the list of all priority options (you have to open the dropdown list before by clicking on the priority field) - 
    //choose appropriate selector to access all options from the dropdown.

    //Loop through the elements: each time invoke text value from the current element and save it into your predefined array.

    //Print out added value and length of the array during each iteration, using cy.log(…) command.

    //Assert that created array has the same length as your predefined number, if everything is done correctly.

    //Expected result: You have a test that validates values in issue priorities. Finished array must have 5 elements: [“Lowest“, “Low“, “Medium”, “High“, “Highest”]
  });
});
//TEST2
// Create new test for checking that reporter name has only characters in it. Practice usage of string functions.
//Access reporter name (find proper selector) and invoke its text value.
//Assert that it has only characters in it (no numbers, no special characters etc). Regex to be used: /^[A-Za-z]*$/
//Expected result: You will have a test that validates reporter matching defined regular expression

//TEST3
//Issue create all