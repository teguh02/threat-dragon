import v2ThreatModelJson from './data/v2-threat-model.js';
import v2NewModelJson from './data/v2-new-model.js';

describe('import', () => {
    const setup = () => {
        cy.setupTest();
        cy.get('#local-login-btn').click();
        cy.get('a[href="#/local/threatmodel/import"]').click();
        cy.url().should('contain', '/local/threatmodel/import');
    };

    describe('using a valid V2 model with diagram', () => {
        before(() => {
            setup();
        });

        it('has the title', () => {
            cy.contains('Import a threat model via JSON');
        });

        it('tells the user to paste the json', () => {
            cy.contains('Paste the JSON of your threat model here:');
        });

        it('allows a user to manually enter the model JSON', () => {
            cy.get('#json-input').paste(v2ThreatModelJson);
            cy.get('#td-import-btn').click();
            cy.url().should('contain', '/local/Demo%20Threat%20Model');
            cy.contains('Demo Threat Model');
            cy.contains('Main Request Data Flow');
            cy.get('#tm-edit-btn').should('be.visible');
            cy.get('#tm-report-btn').should('be.visible');
            cy.get('#tm-delete-btn').should('be.visible');
        });
    });

    describe('using a valid V2 model without diagram', () => {
        before(() => {
            setup();
        });

        it('allows a user to manually enter the model JSON', () => {
            cy.get('#json-input').paste(v2NewModelJson);
            cy.get('#td-import-btn').click();
            cy.url().should('contain', '/local/New%20threat%20model');
            cy.contains('New threat model');
            cy.get('#tm-edit-btn').should('be.visible');
        });
    });

    describe('using invalid JSON', () => {
        before(() => {
            setup();
        });

        it('shows an error when there is invalid JSON', () => {
            cy.get('#json-input').type('some bad stuff');
            cy.get('#td-import-btn').click();
            cy.contains('Invalid JSON');
        });
    });
});