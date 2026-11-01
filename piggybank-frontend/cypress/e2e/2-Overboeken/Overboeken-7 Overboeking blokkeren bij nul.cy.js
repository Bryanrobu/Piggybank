/// <reference types="cypress" />

// Test case ID: Overboeken-7  |  Prioriteit: Hoog
// Titel: Overboeking blokkeren bij nul.
// Beschrijving: Controleren dat invoerveldvalidatie voorkomt dat er geld overgemaakt
//               wordt met nutteloze € 0 transacties.
// Pre-conditie: Ingelogd als Melvin met voldoende saldo en op het overboek formulier.

describe('Overboeken-7: Overboeking blokkeren bij nul', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('.login__account').contains('Melvin').click();
        cy.visit('http://localhost:3000/transfer');
        cy.contains('h1', 'Overboeken').should('be.visible');
        cy.get('select[name="toaccount"] option').should('have.length.greaterThan', 1);
    });

    it('Bedrag 0 wordt geweigerd', () => {
        // Stap 1: Kies bij Naar rekening een ontvanger.
        cy.get('select[name="toaccount"]').select('Cem Fuijk');

        // Stap 2: Voer het bedrag 0 in.
        cy.get('input[name="amount"]').clear().type('0');
        cy.get('textarea[name="description"]').type('Test overboeking');

        // Stap 3: Klik op Overboeken.
        cy.get('button[type="submit"]').click();
        cy.wait(1000);

        // Verwacht resultaat (eis): formulier weigert verzending, geen bevestiging.
        // (De app heeft geen bedrag-validatie en stuurt € 0 wél door, dus "Gelukt!"
        //  verschijnt en faalt deze test betrouwbaar zolang dat defect bestaat.)
        cy.contains('h1', 'Gelukt!').should('not.exist');
    });
});
