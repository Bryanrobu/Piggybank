/// <reference types="cypress" />

// Test case ID: Valuta-1  |  Prioriteit: Hoog
// Titel: Overboeking uitvoeren in vreemde valuta (bijv. USD).
// Beschrijving: Controleren of het selecteren van een vreemde valuta het bedrag omrekent
//               en de correcte tegenwaarde in euro's van het saldo afschrijft.
// Pre-conditie: Ingelogd als Melvin met voldoende saldo en op het overboek formulier.

describe('Valuta-1: Overboeking in vreemde valuta (USD)', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('.login__account').contains('Melvin').click();
        cy.visit('http://localhost:3000/transfer');
        cy.contains('h1', 'Overboeken').should('be.visible');
        cy.get('select[name="toaccount"] option').should('have.length.greaterThan', 1);
    });

    it('Overboeking in USD uitvoeren en wisselkoers controleren', () => {
        const amountUsd = 25;
        const usdRate = 1.10;                       // backend: 1 EUR = 1,10 USD
        const expectedEuro = amountUsd / usdRate;   // eis: 25 USD -> ~ € 22,73

        cy.window().then((win) => {
            const userId = JSON.parse(win.localStorage.getItem('userToken')).userId;

            // Saldo vóór de overboeking ophalen.
            cy.request({
                url: 'http://localhost:8080/api/v1/accounts',
                headers: { 'X-User-Id': userId },
            }).then((before) => {
                const balanceBefore = Number(before.body.accounts[0].balance);

                // Stap 1: Kies bij Naar rekening een ontvanger.
                cy.get('select[name="toaccount"]').select('Cem Fuijk');

                // Stap 2: Selecteer in het valuta-keuzemenu naast Bedrag de dollar ($).
                cy.get('select[name="currency"]').select('USD');
                cy.get('select[name="currency"]').should('have.value', 'USD');

                // Stap 3: Voer het gewenste bedrag in vreemde valuta in.
                cy.get('input[name="amount"]').clear().type(String(amountUsd));
                cy.get('textarea[name="description"]').type('Test overboeking');

                // Stap 4: Klik op Overboeken.
                cy.get('button[type="submit"]').click();

                // Overboeking slaagt.
                cy.contains('h1', 'Gelukt!').should('be.visible');
                cy.get('.alert').should('contain', '$');
                cy.get('.alert').should('contain', '25');

                // Saldo ná de overboeking ophalen en de afschrijving controleren.
                cy.request({
                    url: 'http://localhost:8080/api/v1/accounts',
                    headers: { 'X-User-Id': userId },
                }).then((after) => {
                    const balanceAfter = Number(after.body.accounts[0].balance);
                    const afgeschreven = balanceBefore - balanceAfter;

                    // Verwacht resultaat (eis): het euro-saldo is verminderd met de OMGEREKENDE
                    // tegenwaarde (25 USD / 1,10 = ~ € 22,73), dus de wisselkoers is toegepast.
                    // (Bij het huidige defect schrijft de app de ruwe 25 af en faalt deze check.)
                    expect(afgeschreven, 'afgeschreven euro-tegenwaarde').to.be.closeTo(expectedEuro, 0.05);
                });
            });
        });
    });
});
