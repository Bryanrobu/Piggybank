/// <reference types="cypress" />

// Test case ID: Overboeken-2  |  Prioriteit: Midden
// Titel: Euro-overboeking uitvoeren met een leeg omschrijvingsveld.
// Beschrijving: Controleren dat het veld omschrijving optioneel is en het formulier
//               verzendt zonder validatiefout.
// Pre-conditie: Ingelogd als Melvin, formulier Overboeken geopend, voldoende saldo.

describe('Overboeken-2: Euro-overboeking met leeg omschrijvingsveld', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('.login__account').contains('Melvin').click();
        cy.visit('http://localhost:3000/transfer');
        cy.contains('h1', 'Overboeken').should('be.visible');
        cy.get('select[name="toaccount"] option').should('have.length.greaterThan', 1);
    });

    it('Overboeken zonder omschrijving', () => {
        // Stap 1: Kies bij Naar rekening een ontvanger.
        cy.get('select[name="toaccount"]').select('Sara Ravestein');

        // Stap 2: Voer een geldig bedrag in.
        cy.get('input[name="amount"]').clear().type('25');

        // Stap 3: Laat het tekstvak Omschrijving leeg.
        cy.get('textarea[name="description"]').should('have.value', '');

        // Stap 4: Klik op Overboeken.
        cy.get('button[type="submit"]').click();

        // Verwacht resultaat (eis): transactie wordt verwerkt, geen blokkade wegens
        // ontbrekende beschrijving.
        cy.contains('h1', 'Gelukt!').should('be.visible');
    });
});
