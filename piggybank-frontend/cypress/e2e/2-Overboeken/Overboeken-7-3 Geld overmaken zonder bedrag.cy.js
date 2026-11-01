/// <reference types="cypress" />

// Test case ID: Overboeken-7-3  |  Prioriteit: Midden
// Titel: Geld overmaken zonder een bedrag in te vullen.
// Beschrijving: Controleren of het systeem een foutmelding geeft als het bedrag leeg is.
// Pre-conditie: Ingelogd als Melvin met voldoende saldo en op het overboek formulier.

describe('Overboeken-7-3: Geld overmaken zonder bedrag', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('.login__account').contains('Melvin').click();
        cy.visit('http://localhost:3000/transfer');
        cy.contains('h1', 'Overboeken').should('be.visible');
        cy.get('select[name="toaccount"] option').should('have.length.greaterThan', 1);
    });

    it('Leeg bedrag wordt geweigerd', () => {
        // Stap 1: Kies bij Naar rekening een ontvanger.
        cy.get('select[name="toaccount"]').select('Cem Fuijk');

        // Stap 2: Laat het bedrag-veld leeg.
        cy.get('input[name="amount"]').should('have.value', '');
        cy.get('textarea[name="description"]').type('Test overboeking');

        // Stap 3: Klik op Overboeken.
        cy.get('button[type="submit"]').click();

        // Verwacht resultaat: formulier weigert verzending (bedrag verplicht), saldo blijft hetzelfde.
        cy.get('input[name="amount"]').then(($i) => {
            expect($i[0].validity.valid, 'bedrag is verplicht').to.eq(false);
        });
        cy.contains('h1', 'Gelukt!').should('not.exist');
    });
});
