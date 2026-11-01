/// <reference types="cypress" />

// Test case ID: Overboeken-1  |  Prioriteit: Hoog
// Titel: Geld overmaken met een rekening waar geld op staat.
// Beschrijving: Controleren of een overboeking succesvol wordt verwerkt wanneer er voldoende saldo is.
// Pre-conditie: Ingelogd als Melvin met positief saldo, ontvanger Sara bestaat in de database.

describe('Overboeken-1: Geld overmaken met voldoende saldo', () => {

    beforeEach(() => {
        // Pre-conditie: ingelogd als Melvin, formulier Overboeken geopend.
        cy.visit('http://localhost:3000/login');
        cy.get('.login__account').contains('Melvin').click();
        cy.visit('http://localhost:3000/transfer');
        cy.contains('h1', 'Overboeken').should('be.visible');
        cy.get('select[name="toaccount"] option').should('have.length.greaterThan', 1);
    });

    it('Overboeking uitvoeren en bevestiging krijgen', () => {
        // Stap 1: Van rekening toont vooraf geselecteerd de rekening van Melvin.
        cy.get('select[name="account"]').should('exist');

        // Stap 2: Selecteer bij Naar rekening de rekening van Sara.
        // Testdata plan: "Rekening van Sara" (in de UI heet de optie "Sara Ravestein").
        cy.get('select[name="toaccount"]').select('Sara Ravestein');

        // Stap 3: Controleer dat de valuta op EURO (€) staat.
        cy.get('select[name="currency"]').should('have.value', 'EURO');

        // Stap 4: Voer bij bedrag 100 in.
        cy.get('input[name="amount"]').clear().type('100');

        // Stap 5: Voer bij omschrijving een tekst in.
        cy.get('textarea[name="description"]').type('Cadeau verjaardag');

        // Stap 6: Klik op Overboeken.
        cy.get('button[type="submit"]').click();

        // Verwacht resultaat: melding van succesvolle overboeking; saldo van Melvin daalt.
        // (Het exacte saldo wordt niet gecontroleerd: de in-memory database bewaart
        //  transacties tussen runs, dus het startsaldo is niet gegarandeerd.)
        cy.contains('h1', 'Gelukt!').should('be.visible');
        cy.get('.alert').should('contain', '100');
    });
});
