/// <reference types="cypress" />

// Test case ID: Overboeken-5  |  Prioriteit: Midden
// Titel: Minimale toegestane transactie van 1 cent (€ 0,01).
// Beschrijving: Controleren dat bedragen met decimalen tot op de cent nauwkeurig
//               zonder afrondingsverschillen verwerkt worden.
// Pre-conditie: Ingelogd als Melvin met voldoende saldo en Overboeken geopend.

describe('Overboeken-5: Minimale transactie van 1 cent', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('.login__account').contains('Melvin').click();
        cy.visit('http://localhost:3000/transfer');
        cy.contains('h1', 'Overboeken').should('be.visible');
        cy.get('select[name="toaccount"] option').should('have.length.greaterThan', 1);
    });

    it('Overboeking van 1 cent', () => {
        // Stap 1: Kies bij Naar rekening een ontvanger.
        cy.get('select[name="toaccount"]').select('Cem Fuijk');

        // Stap 2: Voer het minimumbedrag van 1 cent in.
        cy.get('input[name="amount"]').clear().type('0.01');
        cy.get('textarea[name="description"]').type('Test overboeking');

        // Stap 3: Klik op Overboeken.
        cy.get('button[type="submit"]').click();

        // Verwacht resultaat: transactie slaagt, saldo wordt met exact 1 cent verminderd.
        cy.contains('h1', 'Gelukt!').should('be.visible');
        cy.get('.alert').should('contain', '0.01');
    });
});
