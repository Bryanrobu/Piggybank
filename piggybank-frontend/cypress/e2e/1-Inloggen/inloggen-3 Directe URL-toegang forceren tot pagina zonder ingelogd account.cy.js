/// <reference types="cypress" />

// Test case ID: Inloggen-3  |  Prioriteit: Midden
// Titel: Directe URL-toegang forceren tot pagina zonder ingelogd account.
// Beschrijving: Controleren dat afgeschermde pagina's niet handmatig via de
//               adresbalk bereikbaar zijn als er geen account is geselecteerd.
// Pre-conditie: Geen actieve sessie, gebruiker is nog niet ingelogd.

describe('Inloggen-3: Directe URL-toegang forceren tot pagina zonder ingelogd account.', () => {

    it('Pre-condition', () => {
        // Pre-conditie: start op de inlogpagina.
        cy.visit('http://localhost:3000/login');
    });

    it('Stap 1 - Voer de directe URL in van het dashboard in een schone/incognito browser.', () => {
        // Test data: URL: http://localhost:3000/
        // Verwacht resultaat: Toegang wordt geweigerd,
        // applicatie redirect automatisch terug naar het lognscherm.
        cy.visit('http://localhost:3000/');
        cy.contains('h1', 'Login').should('be.visible');
        cy.contains('h2', 'Kies een account').should('be.visible');
    });

    it('Stap 2 - Voer de directe URL in van de overboekpagina zonder in te loggen.', () => {
        // Test data: URL: http://localhost:3000/transfer
        // Verwacht resultaat: Toegang wordt geweigerd, redirect naar login.
        cy.visit('http://localhost:3000/transfer');
        cy.contains('h1', 'Login').should('be.visible');
        cy.contains('h2', 'Kies een account').should('be.visible');
    })
});