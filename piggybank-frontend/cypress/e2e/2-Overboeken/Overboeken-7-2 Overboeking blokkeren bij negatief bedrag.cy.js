/// <reference types="cypress" />

// Test case ID: Overboeken-7-2  |  Prioriteit: Hoog
// Titel: Overboeking blokkeren bij negatieve bedragen.
// Beschrijving: Controleren dat invoerveldvalidatie voorkomt dat er geld overgemaakt
//               wordt met negatieve bedragen.
// Pre-conditie: Ingelogd als Melvin met voldoende saldo en op het overboek formulier.

describe('Overboeken-7-2: Overboeking blokkeren bij negatief bedrag', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('.login__account').contains('Melvin').click();
        cy.visit('http://localhost:3000/transfer');
        cy.contains('h1', 'Overboeken').should('be.visible');
        cy.get('select[name="toaccount"] option').should('have.length.greaterThan', 1);
    });

    it('Negatief bedrag wordt geweigerd', () => {
        // Stap 1: Kies bij Naar rekening een ontvanger.
        cy.get('select[name="toaccount"]').select('Cem Fuijk');

        // Stap 2: Voer een negatief bedrag in.
        cy.get('input[name="amount"]').clear().type('-10');
        cy.get('textarea[name="description"]').type('Test overboeking');

        // Stap 3: Klik op Overboeken.
        cy.get('button[type="submit"]').click();

        // Verwacht resultaat: veld/validatie weigert het negatieve bedrag; geen overboeking.
        cy.get('input[name="amount"]').then(($i) => {
            expect($i[0].validity.valid, 'bedrag is ongeldig').to.eq(false);
        });
        cy.contains('h1', 'Gelukt!').should('not.exist');
    });
});
