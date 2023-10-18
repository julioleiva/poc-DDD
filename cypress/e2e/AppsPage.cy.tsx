/// <reference types="Cypress" />


describe("AppsPage e2e tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should load the apps and display them in a grid or list", () => {
    cy.get('[data-cy=app-item]', { timeout: 10000 }).should('have.length.greaterThan', 0);
  });

  it("should open a modal when clicking on the edit button of an app", () => {
    cy.get("[data-cy=app-edit-button]").first().click();
    cy.contains("h2", "Edit Application").should("be.visible");
  });

  it("should allow an app to be edited", () => {
    cy.get("[data-cy=app-edit-button]").first().click();

    cy.get("input[name=title]").clear().type("New App Title");

    cy.contains("button", "Save").click();

    cy.contains("h2", "Edit Application").should("not.exist");

    cy.contains("New App Title").should("be.visible");
  });

  it("should delete an app when the delete process is confirmed", () => {
    cy.get("[data-cy=app-delete-button]").first().click();

    cy.contains("button", "Confirm").click();

    cy.get("[data-cy=app-item]").should("have.length", 2);
  });

  it("should switch between list and grid view", () => {
    cy.get("[data-cy=toggle-view-button]").click();
    cy.get("[data-cy=list-view]").should("be.visible");
    cy.get("[data-cy=grid-view]").should("not.exist");

    cy.get("[data-cy=toggle-view-button]").click();
    cy.get("[data-cy=grid-view]").should("be.visible");
    cy.get("[data-cy=list-view]").should("not.exist");
  });
});
