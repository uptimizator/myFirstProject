//https://docs.google.com/forms/d/e/1FAIpQLSeY_W-zSf2_JxR4drhbgIxdEwdbUbE4wXhxHZLgxZGiMcNl7g/viewform

const currentMonth = Cypress.moment().format('MMMM');

describe("", function() {
    it("First page", function() {
        cy.visit('https://docs.google.com/forms/d/e/1FAIpQLSeY_W-zSf2_JxR4drhbgIxdEwdbUbE4wXhxHZLgxZGiMcNl7g/viewform')
        cy.get('form').within(() => {
            cy.get('[data-value="Check this"]').first().click();
            cy.get('[data-value="Check this"]').last().click();

            //let futureDateUnix = Cypress.moment().unix() + 6*24*60*60; //date 6 days from now UNIX timestamp
            //const futureDate = Cypress.moment().unix(futureDateUnix).format("YYYY-MM-DD");   //format unix - to acceptable date
            let futureDate = Cypress.moment().add(5, "days").format("YYYY-MM-DD");
            cy.get('input[type="date"]').type(futureDate);

            cy.get('.quantumWizTextinputPaperinputInput').last().as('thirdInput').should('have.attr', 'required');
            cy.get('@thirdInput').type(currentMonth);
            //cy.root().submit();
            cy.get('.appsMaterialWizButtonPaperbuttonLabel').should('have.text', 'Next').click();
        });
        
        //1st input
        let myFavMovies = ['home alone', 'spider man', 'friends', 'avengers', 'superman'];
        let myFavMoviesThreeRand = myFavMovies.sort(() => Math.random() - Math.random()).slice(0, 3).toString();
        cy.get('textarea').type(myFavMoviesThreeRand);
        //dropdown
        cy.get('div.quantumWizMenuPaperselectEl[role=listbox]').click().type('{downarrow}{enter}');
        cy.wait(1000);
        //go back to 1st page
        cy.get('.appsMaterialWizButtonPaperbuttonLabel').first().should('have.text', 'Back').click({force: true});
        
        //1st page 3d input. Reverse month
        function reverseMonth(currentMonth) {
            let currentMonthReversed = ""
            for (let i = currentMonth.length - 1; i >= 0; i--) {
                currentMonthReversed += currentMonth[i];
            }
            return currentMonthReversed;
        }
        let currentMonthReversed = reverseMonth(currentMonth);
        cy.get('input.quantumWizTextinputPaperinputInput').last().as('thirdInput').clear();
        cy.get('@thirdInput').type(currentMonthReversed);
        //return to 2nd page
        cy.get('.appsMaterialWizButtonPaperbuttonLabel').should('have.text', 'Next').click();
        //Check that both questions are still filed
        cy.get('textarea').should('have.attr', 'data-initial-value', myFavMoviesThreeRand);
        cy.get('div.quantumWizMenuPaperselectOption.isSelected').should('have.attr', 'data-value', 'Red');
        //go to last page
        cy.get('.appsMaterialWizButtonPaperbuttonLabel').last().should('have.text', 'Next').click();
        //check radioButton Yes
        cy.get('.docssharedWizToggleLabeledLabelText').first().should('have.text', 'Yes').click();
        //submit form
        cy.get('.appsMaterialWizButtonPaperbuttonLabel').last().should('have.text', 'Submit').click();
    });
});
