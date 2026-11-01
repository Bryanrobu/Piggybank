/// <reference types="cypress" />

// Test case ID: Overboeken-4  |  Prioriteit: Hoog
// Titel: Het volledige beschikbare saldo overboeken tot een restsaldo van exact € 0,00.
// Beschrijving: Grenswaardetest om zeker te weten dat een rekening exact naar nul kan
//               worden overgemaakt zonder 'saldo ontoereikend'.
// Pre-conditie: Ingelogd als Cem (saldo € 1000) en Overboeken geopend.

describe('Overboeken-4: Volledige saldo overboeken tot restsaldo nul', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('.login__account').contains('Cem').click();
        cy.visit('http://localhost:3000/transfer');
        cy.contains('h1', 'Overboeken').should('be.visible');
        cy.get('select[name="toaccount"] option').should('have.length.greaterThan', 1);
    });

    it('Volledig saldo overboeken', () => {
        // Stap 1: Kies bij Naar rekening een ontvanger.
        cy.get('select[name="toaccount"]').select('Sophie de Blaak');

        // Stap 2: Voer bij bedrag exact het totale saldo in.
        cy.get('input[name="amount"]').clear().type('1000');
        cy.get('textarea[name="description"]').type('Test overboeking');

        // Stap 3: Klik op Overboeken.
        cy.get('button[type="submit"]').click();

        // Verwacht resultaat: overboeking slaagt; het nieuwe saldo van Cem wordt exact € 0,00.
        cy.contains('h1', 'Gelukt!').should('be.visible');
        cy.get('.alert').should('contain', '1000');
    });
});
