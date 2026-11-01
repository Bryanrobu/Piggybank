/// <reference types="cypress" />

// Test case ID: Overzicht-1  |  Prioriteit: Hoog
// Titel: Saldo en laatste 3 transacties controleren op de hoofdpagina.
// Beschrijving: Controleren dat het dashboard direct het totaalsaldo toont en de laatste
//               3 transacties weergeeft.
// Pre-conditie: Ingelogd als Melvin op de overzicht pagina.

describe('Overzicht-1: Saldo en laatste 3 transacties op de hoofdpagina', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('.login__account').contains('Melvin').click();
        cy.visit('http://localhost:3000/');
        cy.contains('h1', 'Welkom').should('be.visible');
    });

    it('Dashboard toont saldo en laatste 3 transacties', () => {
        // Stap 1: Dashboard laadt met twee hoofdblokken: Jouw account en Laatste 3 transacties.
        cy.contains('h2', 'Jouw account').should('be.visible');
        cy.contains('h2', 'Laatste 3 transacties').should('be.visible');

        // Stap 2: Controleer het saldo.
        cy.get('.accounts__account-balance').should('be.visible').and('contain', '€');

        // Stap 3: Controleer de laatste 3 transacties (maximaal 3 regels, limit=3).
        cy.get('.transaction').should('have.length', 3);
    });
});
