import { setupBeforeEach, tearDownAfterEach } from '../support/e2e';

describe('Blocks Tests', () => {
  beforeEach(setupBeforeEach);
  afterEach(tearDownAfterEach);

  it('Add Block: Empty', () => {
    // Change page title
    cy.get('.documentFirstHeading')
      .focused()
      .clear()
      .type('My Add-on Page')
      .get('.documentFirstHeading')
      .contains('My Add-on Page');

    cy.get('.documentFirstHeading') /* .focused() */
      .type('{enter}');

    // Add block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Media').click();
    cy.get('.content.active.media .button.image').contains('Image').click();

    // Save
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    // then the page view should contain our changes
    cy.contains('My Add-on Page');
    //cy.get('.block.image');
  });
});
