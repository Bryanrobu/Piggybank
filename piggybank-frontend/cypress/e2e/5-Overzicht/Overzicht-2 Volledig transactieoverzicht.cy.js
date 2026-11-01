/// <reference types="cypress" />

// Test case ID: Overzicht-2  |  Prioriteit: Hoog
// Titel: Navigeren naar en controleren van het volledige transactieoverzicht.
// Beschrijving: Controleren dat de transacties pagina de complete transactiehistorie toont.
// Pre-conditie: Ingelogd als Melvin indien meer dan 3 transacties aanwezig.

describe('Overzicht-2: Volledig transactieoverzicht', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('.login__account').contains('Melvin').click();
        cy.visit('http://localhost:3000/');
        cy.contains('h1', 'Welkom').should('be.visible');
    });

    it('Transactiepagina toont alle transacties', () => {
        // Stap 1: Ga via het menu naar Transacties.
        cy.visit('http://localhost:3000/transactions');
        cy.contains('h1', 'Transactie overzicht').should('be.visible');

        // Stap 2: Controleer het aantal getoonde regels: alle transacties worden getoond
        // (meer dan de 3 van het overzicht).
        cy.get('.transaction').should('have.length.greaterThan', 3);
    });
});
