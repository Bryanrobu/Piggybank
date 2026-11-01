/// <reference types="cypress" />

// Test case ID: Overboeken-6  |  Prioriteit: Midden
// Titel: Bedrag invoeren met een komma als scheidingsteken (5,50).
// Beschrijving: Controleren of de invoer van een komma correct geaccepteerd wordt door
//               het invoerveld en niet leidt tot een error.
// Pre-conditie: Ingelogd als Melvin met voldoende saldo en Overboeken geopend.

describe('Overboeken-6: Bedrag met komma als scheidingsteken', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('.login__account').contains('Melvin').click();
        cy.visit('http://localhost:3000/transfer');
        cy.contains('h1', 'Overboeken').should('be.visible');
        cy.get('select[name="toaccount"] option').should('have.length.greaterThan', 1);
    });

    it('Bedrag met komma verwerken', () => {
        // Stap 1: Kies bij Naar rekening een ontvanger.
        cy.get('select[name="toaccount"]').select('Cem Fuijk');

        // Stap 2: Voer een decimaal bedrag in met een komma.
        cy.get('input[name="amount"]').clear().type('5,50');
        cy.get('textarea[name="description"]').type('Test overboeking');

        // Stap 3: Klik op Overboeken.
        cy.get('button[type="submit"]').click();

        // Verwacht resultaat (eis): transactie verwerkt exact € 5,50 zonder errors.
        cy.contains('h1', 'Gelukt!').should('be.visible');
        cy.get('.alert').should('contain', '5,50');
    });
});
