/// <reference types="cypress" />

// Test case ID: Valuta-2  |  Prioriteit: Hoog
// Titel: Weigering valutaboeking wanneer tegenwaarde in EUR het saldo overstijgt.
// Beschrijving: Controleren dat saldovalidatie plaatsvindt op basis van de omgerekende euro waarde.
// Pre-conditie: Ingelogd als een account met een laag saldo (plan: bijv. € 10,00) en op het
//   overboek formulier.
//   Let op: de seed-data kent geen account van € 10. We loggen in als Sophie (laagste saldo,
//   € 862,71) en gebruiken een USD-bedrag waarvan de tegenwaarde het saldo overstijgt, zodat
//   dezelfde conditie wordt getest.

describe('Valuta-2: Weigering valutaboeking bij onvoldoende saldo', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('.login__account').contains('Sophie').click();
        cy.visit('http://localhost:3000/transfer');
        cy.contains('h1', 'Overboeken').should('be.visible');
        cy.get('select[name="toaccount"] option').should('have.length.greaterThan', 1);
    });

    it('Valutaboeking boven saldo wordt geweigerd', () => {
        // Stap 1: Kies bij Naar rekening een ontvanger.
        cy.get('select[name="toaccount"]').select('Cem Fuijk');

        // Stap 2: Selecteer in het valuta-keuzemenu naast Bedrag de dollar ($).
        cy.get('select[name="currency"]').select('USD');
        cy.get('select[name="currency"]').should('have.value', 'USD');

        // Stap 3: Voer een bedrag in waarvan de tegenwaarde hoger is dan het actuele saldo.
        cy.get('input[name="amount"]').clear().type('1000');
        cy.get('textarea[name="description"]').type('Test overboeking');

        // Stap 4: Klik op Overboeken.
        cy.get('button[type="submit"]').click();

        // Verwacht resultaat (eis): transactie geweigerd met melding onvoldoende saldo;
        // het saldo wordt niet negatief.
        cy.contains('Onvoldoende saldo').should('be.visible');
        cy.contains('h1', 'Gelukt!').should('not.exist');
    });
});
