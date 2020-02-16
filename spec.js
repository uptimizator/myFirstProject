//https://docs.google.com/forms/d/e/1FAIpQLSeY_W-zSf2_JxR4drhbgIxdEwdbUbE4wXhxHZLgxZGiMcNl7g/viewform
const Pg = require('./page').default;
const futureDate = Cypress.moment().add(5, "days");         //date now + 5 days
const currentMonth = futureDate.format('MMMM');             //fetch month from the date
const successText = 'Your response has been recorded.';     //success message

describe("Google form test", function() {
    it("", function() {
        cy.visit('https://docs.google.com/forms/d/e/1FAIpQLSeY_W-zSf2_JxR4drhbgIxdEwdbUbE4wXhxHZLgxZGiMcNl7g/viewform');
        //use within method to avoid any wrong selections
        cy.get('form').within(() => {
            //click to checkboxes with attributes "check this"
            Pg.checkThisBoxes;
            //input date which is N days from now
            Pg.dateInput.type(futureDate.format("YYYY-MM-DD"));
            //check input for required parameter
            Pg.monthInput.should('have.attr', 'required');
            //type in to input current month
            Pg.monthInput.type(currentMonth);
            //go to next page
            Pg.nextButton.first().should('have.text', 'Next').click();
        });
        
        //array of 5 favorit movies
        let myFavMovies = ['home alone', 'spider man', 'friends', 'avengers', 'superman'];
        //randomly pick 3 movies
        let myFavMoviesThreeRand = myFavMovies.sort(() => Math.random() - Math.random()).slice(0, 3).toString();
        //type movies in to input
        Pg.moviesInput.type(myFavMoviesThreeRand);
        //dropdown
        Pg.colorDropdown.click().type('{downarrow}{enter}');
        //doesn't save selected item without wait. Probably its to fast. Wait for 0.1sec
        cy.wait(100);
        //return to 1st page
        Pg.backButton.click({force: true});
        //function to reverse month
        function reverseMonth(currentMonth) {
            let currentMonthReversed = "";
            for (let i = currentMonth.length - 1; i >= 0; i--) {
                currentMonthReversed += currentMonth[i];
            };
            return currentMonthReversed;
        };
        //store reversed month in to variable
        let currentMonthReversed = reverseMonth(currentMonth);
        //type reversed month in to input
        Pg.monthInput.clear().type(currentMonthReversed);
        //return to 2nd page
        Pg.nextButton.should('have.text', 'Next').click();
        //Check that both questions are still filed
        Pg.moviesInput.should('have.attr', 'data-initial-value', myFavMoviesThreeRand);
        //assert that input still has value and its equal to 'Red'
        Pg.colorDropdownSelected.should('have.attr', 'data-value', 'Red');
        //go to last page
        Pg.nextButton.last().should('have.text', 'Next').click();
        //check radioButton Yes
        Pg.radioButtons.first().should('have.text', 'Yes').click();
        //submit form
        Pg.submitButton.click();
        //look for succes message
        cy.contains(successText).should('be.visible');
    });
});
