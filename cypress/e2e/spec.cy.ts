/**
 A solid test generally covers 3 phases:

  * Set up the application state.
  * Take an action.
  * Make an assertion about the resulting application state.

 */

describe("My First Test", () => {
  // it("Does not do much!", () => {
  //   expect(true).to.equal(true);
  // });
  it("Visits the Kitchen Sink, then finds the content", () => {
    cy.visit("https://example.cypress.io");
    cy.contains("Kitchen Sink");
  });
  it("click the link 'type'", () => {
    cy.visit("https://example.cypress.io");
    cy.contains("type").click();
  });
  it('clicking "type" navigates to a new url', () => {
    cy.visit("https://example.cypress.io");
    cy.contains("type").click();

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should("include", "/commands/actions");
  });
  it("Gets, types and asserts", () => {
    cy.visit("https://example.cypress.io");

    cy.contains("type").click();

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should("include", "/commands/actions");

    // Get an input, type into it and verify
    // that the value has been updated
    cy.get(".action-email")
      .type("fake@email.com")
      .should("have.value", "fake@email.com");

    // cy.get('[data-cy="submit"]').click()
  });
});

export default {};
