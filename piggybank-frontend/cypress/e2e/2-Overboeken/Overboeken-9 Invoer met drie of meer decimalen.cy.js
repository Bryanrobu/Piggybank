/// <reference types="cypress" />

// Test case ID: Overboeken-9  |  Prioriteit: Midden
// Titel: Invoer met drie of meer decimalen.
// Beschrijving: Voorkomen dat afrondingsfouten of fracties van centen kunnen worden
//               opgeslagen in de database.
// Pre-conditie: Ingelogd als Melvin met voldoende saldo en op het overboek formulier.

describe('Overboeken-9: Invoer met drie of meer decimalen', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('.login__account').contains('Melvin').click();
        cy.visit('http://localhost:3000/transfer');
        cy.contains('h1', 'Overboeken').should('be.visible');
        cy.get('select[name="toaccount"] option').should('have.length.greaterThan', 1);
    });

    it('Bedrag met drie decimalen wordt geweigerd', () => {
        // Stap 1: Kies bij Naar rekening een ontvanger.
        cy.get('select[name="toaccount"]').select('Cem Fuijk');

        // Stap 2: Voer een bedrag in met drie cijfers achter de punt/komma.
        cy.get('input[name="amount"]').clear().type('10.123');
        cy.get('textarea[name="description"]').type('Test overboeking');

        // Stap 3: Klik op Overboeken.
        cy.get('button[type="submit"]').click();

        // Verwacht resultaat (eis): formulier weigert overboeking; maximaal 2 decimalen toegestaan.
        cy.contains('h1', 'Gelukt!').should('not.exist');
        cy.contains('h1', 'Overboeken').should('be.visible');
    });
});
