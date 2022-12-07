describe("Newsletter Subscribe Form", () => {
    beforeEach(() => {
        cy.visit("/")
    })

    context("happy paths", () => {
        it("the email input field contains the correct placeholder text", () => {
            cy.getByData("email-input")
                .invoke("attr", "placeholder")
                .should("eq", "Subscribe for Updates")
        })

        it("allows users to subscribe to the email list", () => {
            const email = "zak@aol.com"
            cy.getByData("email-input").type(email)
            cy.getByData("submit-button").click()
            cy.getByData("success-message").should("exist").contains(email)
        })
    })

    context("unhappy paths", () => {
        it("does NOT allow an invalid email address", () => {
            cy.getByData("email-input").type("zak")
            cy.getByData("submit-button").click()
            cy.getByData("success-message").should("not.exist")
        })

        it("does NOT allow already subscribed email addresses", () => {
            const email = "john@example.com"
            cy.getByData("email-input").type(email)
            cy.getByData("submit-button").click()
            cy.getByData("server-error-message")
                .should("exist")
                .contains(email)
        })

        it("does NOT allow an empty email address", () => {
            cy.getByData("submit-button").click()
            cy.getByData("error-message")
                .should("exist")
                .contains("Email is required")
        })

    })
    
})