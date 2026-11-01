/// <reference types="cypress" />

// Test case ID: Inloggen-2  |  Prioriteit: Hoog
// Titel: Status van ingelogd account behouden na refresh.
// Beschrijving: Controleren dat een pagina refresh de actieve gebruiker
// niet plotseling uitlogt of terugstuurt naar het selectiescherm.
// Pre-conditie: Ingelogd als Melvin op het dashboard.

describe('Inloggen-2: Status van ingelogd account behouden na refresh', () => {

    beforeEach(() => {
        // Pre-conditie: Ingelogd als Melvin op het dashboard.
        cy.visit('http://localhost:3000/login');
        cy.get('.login__account').contains('Melvin').click();
    });

    it('Stap 1 - Druk op F5 of de pagina refresh knop', () => {
        // Verwacht resultaat: De pagina herlaadt zonder errors, Melvin blijft ingelogd
        // en het dashboard toont direct de juiste data.
        cy.reload();
        // Rekeninggegevens van Melvin worden getoond (naam + saldo).
        cy.contains('h2', 'Jouw account').should('be.visible');
        cy.get('.accounts__account-name').should('be.visible').and('not.be.empty');
        cy.get('.accounts__account-balance').should('be.visible').and('contain', '€');
    });
});