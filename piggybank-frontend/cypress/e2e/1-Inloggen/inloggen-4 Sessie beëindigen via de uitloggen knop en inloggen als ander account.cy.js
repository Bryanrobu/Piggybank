/// <reference types="cypress" />

// Test case ID: Inloggen-4  |  Prioriteit: Midden
// Titel: Sessie beëindigen via de uitloggen knop en inloggen als ander account.
// Beschrijving: Controleren dat de knop uitloggen in de sidebar de huidige sessie
//               leegmaakt en wisselen naar een ander profiel correct toont
// Pre-conditie: Ingelogd als Melvin op het dashboard.

describe('Inloggen-4: Sessie beëindigen via de uitloggen knop en inloggen als ander account.', () => {

    beforeEach('Pre-condition', () => {
        // Pre-conditie: start op de inlogpagina.
        cy.visit('http://localhost:3000/login');
    });

    it('Stap 1 - Klik linksonder op de roze knop Uitloggen.', () => {
        // Pre-conditie: inloggen als Melvin
        cy.get('.login__account').contains('Melvin').click();
        // Test data: Knop: Uitloggen
        // Verwacht resultaat: Huidige sessie stopt, gebruiker belandt weer op het selectiescherm.
        cy.get('.app__logout').contains('button', 'Uitloggen').should('be.visible').click();
        cy.contains('h2', 'Kies een account').should('be.visible');
    });

    it('stap 2 - Klik op de avatar van Sophie.', () => {
        cy.get('.login__account').contains('Sophie').should('be.visible').click();
        // Verwacht resultaat: Gebruiker is nu ingelogd als Sophie, dashboard toont
        // de naam en het saldo van de rekening van Sophie.
        cy.location('pathname').should('eq', '/');
        cy.contains('h2', 'Jouw account').should('be.visible');
        cy.get('.accounts__account-name').should('be.visible').and('contain', 'Sophie');
        cy.get('.accounts__account-balance').should('be.visible').and('contain', '€');
    })
});