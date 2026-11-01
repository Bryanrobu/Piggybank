/// <reference types="cypress" />

// Test case ID: Overboeken-3  |  Prioriteit: Hoog
// Titel: Overboeking weigeren wanneer bedrag hoger is dan het saldo.
// Beschrijving: Controleren dat de applicatie de transactie afkeurt zodra het ingevoerde
//               bedrag het actuele saldo overschrijdt.
// Pre-conditie: Ingelogd als Cem (saldo € 1000) en Overboeken geopend.

describe('Overboeken-3: Overboeking weigeren bij bedrag hoger dan saldo', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('.login__account').contains('Cem').click();
        cy.visit('http://localhost:3000/transfer');
        cy.contains('h1', 'Overboeken').should('be.visible');
        cy.get('select[name="toaccount"] option').should('have.length.greaterThan', 1);
    });

    it('Overboeking hoger dan saldo wordt geweigerd', () => {
        // Stap 1: Kies bij Naar rekening een ontvanger.
        cy.get('select[name="toaccount"]').select('Sophie de Blaak');

        // Stap 2: Voer een bedrag in dat hoger is dan het saldo.
        cy.get('input[name="amount"]').clear().type('1500');
        cy.get('textarea[name="description"]').type('Test overboeking');

        // Stap 3: Klik op Overboeken.
        cy.get('button[type="submit"]').click();

        // Verwacht resultaat (eis): transactie geweigerd met foutmelding "Onvoldoende saldo";
        // het saldo van Cem blijft € 1000,-.
        cy.contains('Onvoldoende saldo').should('be.visible');
        cy.contains('h1', 'Gelukt!').should('not.exist');
    });
});
