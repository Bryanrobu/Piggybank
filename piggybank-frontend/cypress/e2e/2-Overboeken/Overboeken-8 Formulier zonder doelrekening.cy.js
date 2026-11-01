/// <reference types="cypress" />

// Test case ID: Overboeken-8  |  Prioriteit: Midden
// Titel: Formulier indienen zonder een doelrekening te kiezen.
// Beschrijving: Controleren dat de dropdown Naar rekening verplicht is zodat deze niet
//               op de placeholder kan staan.
// Pre-conditie: Ingelogd als Melvin met voldoende saldo en op het overboek formulier.

describe('Overboeken-8: Formulier zonder doelrekening', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('.login__account').contains('Melvin').click();
        cy.visit('http://localhost:3000/transfer');
        cy.contains('h1', 'Overboeken').should('be.visible');
        cy.get('select[name="toaccount"] option').should('have.length.greaterThan', 1);
    });

    it('Zonder ontvanger wordt verzending geweigerd', () => {
        // Stap 1: Kies bij Naar rekening geen ontvanger (blijft op de placeholder staan).
        // (Bewust geen ontvanger selecteren.)

        // Stap 2: Voer een bedrag in.
        cy.get('input[name="amount"]').clear().type('10');
        cy.get('textarea[name="description"]').type('Test overboeking');

        // Stap 3: Klik op Overboeken.
        cy.get('button[type="submit"]').click();

        // Verwacht resultaat: formulier weigert verzending, ontvanger is verplicht,
        // saldo blijft hetzelfde.
        cy.get('select[name="toaccount"]').then(($s) => {
            expect($s[0].validity.valid, 'ontvanger is verplicht').to.eq(false);
        });
        cy.contains('h1', 'Gelukt!').should('not.exist');
    });
});
