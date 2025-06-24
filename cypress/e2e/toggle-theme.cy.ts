// cypress/e2e/toggle-theme.cy.ts

describe('Theme toggling', () => {
  it('should toggle the theme', () => {
    cy.visit('http://localhost:4200');
    cy.get('[data-cy="toggle-dark-mode"]').click();
    cy.get('[data-cy="toggle-dark-mode"]').click();
  });
});
