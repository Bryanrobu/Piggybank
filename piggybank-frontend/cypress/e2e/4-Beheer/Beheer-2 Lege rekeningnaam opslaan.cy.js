/// <reference types="cypress" />

// Test case ID: Beheer-2  |  Prioriteit: Hoog
// Titel: Rekeningnaam leegmaken en proberen op te slaan.
// Beschrijving: Controleren dat een rekeningnaam niet blanco kan worden opgeslagen.
// Pre-conditie: Ingelogd als Melvin op de instellingenpagina.

describe('Beheer-2: Lege rekeningnaam opslaan', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('.login__account').contains('Melvin').click();
        cy.visit('http://localhost:3000/settings');
        cy.contains('h3', 'Rekening naam aanpassen').should('be.visible');
        cy.get('input[name="accountName"]').should('not.have.value', '');
    });

    it('Leeg naamveld wordt geweigerd', () => {
        // Stap 1: Maak het invoerveld account naam leeg.
        cy.get('input[name="accountName"]').clear();
        cy.get('input[name="accountName"]').should('have.value', '');

        // Stap 2: Klik op Opslaan.
        cy.get('button[type="submit"]').click();

        // Verwacht resultaat: actie geweigerd (naam verplicht), geen bevestiging,
        // oude naam blijft ongewijzigd.
        cy.get('input[name="accountName"]').then(($i) => {
            expect($i[0].validity.valid, 'naam is verplicht').to.eq(false);
        });
        cy.contains('h1', 'Hoppa!').should('not.exist');
    });
});
