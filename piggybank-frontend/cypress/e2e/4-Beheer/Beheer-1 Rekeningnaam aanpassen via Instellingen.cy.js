/// <reference types="cypress" />

// Test case ID: Beheer-1  |  Prioriteit: Hoog
// Titel: Rekeningnaam succesvol aanpassen via "Instellingen".
// Beschrijving: Controleren dat de rekeningnaam via de instellingenpagina gewijzigd kan
//               worden en overal in de applicatie synchroniseert.
// Pre-conditie: Ingelogd als Melvin.

describe('Beheer-1: Rekeningnaam aanpassen via Instellingen', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('.login__account').contains('Melvin').click();
        cy.visit('http://localhost:3000/settings');
        cy.contains('h3', 'Rekening naam aanpassen').should('be.visible');
        // Wacht tot de huidige naam is ingeladen in het veld.
        cy.get('input[name="accountName"]').should('not.have.value', '');
    });

    it('Rekeningnaam wijzigen en terugzien op het overzicht', () => {
        // Stap 1: Instellingen is geopend met het veld "Rekening naam aanpassen".
        cy.get('input[name="accountName"]').should('be.visible');

        // Stap 2: Wijzig de tekst in het invoerveld Account naam.
        cy.get('input[name="accountName"]').clear().type("Melvin's Spaarpotje");

        // Stap 3: Klik op Opslaan.
        cy.get('button[type="submit"]').click();

        // Bevestigingsmelding verschijnt dat de naam is opgeslagen.
        cy.contains('h1', 'Hoppa!').should('be.visible');

        // Stap 4: Ga naar Overzicht; de nieuwe naam staat bij het saldo.
        cy.visit('http://localhost:3000/');
        cy.get('.accounts__account-name').should('contain', 'Spaarpotje');
    });
});
