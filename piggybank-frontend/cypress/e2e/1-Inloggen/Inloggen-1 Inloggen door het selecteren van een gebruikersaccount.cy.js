/// <reference types="cypress" />

// Test case ID: Inloggen-1  |  Prioriteit: Hoog
// Titel: Inloggen door het selecteren van een gebruikersaccount.
// Beschrijving: Controleren dat het aanklikken van een account de sessie start
//               en de gebruiker direct doorstuurt naar het persoonlijke dashboard.
// Pre-conditie: Applicatie draait op localhost, gebruiker zit op het inlogscherm.

describe('Inloggen-1: Inloggen door het selecteren van een gebruikersaccount', () => {

  beforeEach(() => {
    // Pre-conditie: Applicatie draait op localhost, gebruiker zit op het inlogscherm.
    cy.visit('http://localhost:3000/login');
  });

  it('Stap 1 - Navigeer naar de inlogpagina.', () => {
    // Verwacht resultaat: Scherm Login met Kies een account en avatars van
    // Melvin, Sara, Cem en Sophie wordt getoond.
    cy.contains('h1', 'Login').should('be.visible');
    cy.contains('h2', 'Kies een account').should('be.visible');

    cy.get('.login__account').should('have.length', 4);
    cy.get('.login__account').contains('Melvin').should('be.visible');
    cy.get('.login__account').contains('Sara').should('be.visible');
    cy.get('.login__account').contains('Cem').should('be.visible');
    cy.get('.login__account').contains('Sophie').should('be.visible');
  });

  it('Stap 2 - Klik op de user Melvin.', () => {
    // Test data: Account = Melvin.
    cy.get('.login__account').contains('Melvin').click();

    // Verwacht resultaat: Gebruiker wordt ingelogd als Melvin, scherm toont het
    // dashboard met welkomstbericht en de rekeninggegevens van Melvin. (/).
    cy.location('pathname').should('eq', '/');
    cy.contains('h1', 'Welkom').should('be.visible');
    cy.contains('h2', 'Jouw account').should('be.visible');
    cy.get('.accounts__account-name').should('be.visible').and('not.be.empty');
    cy.get('.accounts__account-balance').should('be.visible').and('contain', '€');
  });

});
