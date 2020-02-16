class PageObjects {
    get checkThisBoxes() {
        return cy.get('[data-value="Check this"]').click({ multiple: true });   //get checkbboxes with data-value and click on all of them
    }

    get dateInput() {
        return cy.get('input[type="date"]');    //get date input field
    }

    get monthInput() {
        return cy.get('.quantumWizTextinputPaperinputInput').last();    //get month input
    }

    get nextButton() {
        return cy.get('.appsMaterialWizButtonPaperbuttonLabel');    //get Next button
    }

    get backButton() {
        return cy.get('.appsMaterialWizButtonPaperbuttonLabel').first().should('have.text', 'Back');    //get Back button
    }

    get submitButton() {
        return cy.get('.freebirdThemedFilledButtonM2').should('have.text', 'Submit');   //get Submit button
    }

    get moviesInput() {
        return cy.get('textarea');  //get textarea for list of movies
    }

    get colorDropdown() {
        return cy.get('div.quantumWizMenuPaperselectEl[role=listbox]'); //get dropdown of colors
    }

    get colorDropdownSelected() {
        return cy.get('div.quantumWizMenuPaperselectOption.isSelected');    //get selected color
    }
    get radioButtons() {
        return cy.get('.docssharedWizToggleLabeledLabelText');  //get radio buttons
    }
}

export default new PageObjects();
