describe("Newsletter Subscribe Form", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  const NEW_EMAIL = "zak@aol.com"
  const INVALID_EMAIL = "zak"
  const SUBSCRIBED_EMAIL = "john@example.com"

  context("happy paths", () => {
    it("email field contains the correct placeholder text", () => {
      cy.getByData("email-input")
        .invoke("attr", "placeholder")
        .should("eq", "Subscribe for Updates")
    })

    it("allows users to subscribe to the email list", () => {
      cy.intercept("POST", "/api/subscribe", {
        statusCode: 200,
        body: {
          message: `Success: ${NEW_EMAIL} has been successfully subscribed`,
        },
      }).as("emailSubscribe")
      cy.getByData("email-input").type(NEW_EMAIL).blur()
      cy.getByData("submit-button").click()
      cy.wait("@emailSubscribe").its("response.statusCode").should("eq", 200)
      cy.getByData("success-message").should("exist").contains(NEW_EMAIL)
    })
  })

  context("unhappy paths", () => {
    it("does NOT allow an invalid email address", () => {
      cy.getByData("email-input").type(INVALID_EMAIL)
      cy.getByData("submit-button").click()
      cy.getByData("success-message").should("not.exist")
    })

    it("does NOT allow already subscribed email addresses", () => {
      cy.intercept("POST", "/api/subscribe", {
        statusCode: 403,
        body: {
          message: `Error: ${SUBSCRIBED_EMAIL} already exists. Please use a different email address.`,
        },
      }).as("emailSubscribe")

      cy.getByData("email-input").type(SUBSCRIBED_EMAIL)
      cy.getByData("submit-button").click()
      cy.wait("@emailSubscribe").its("response.statusCode").should("eq", 403)
      cy.getByData("server-error-message")
        .should("exist")
        .contains(SUBSCRIBED_EMAIL)
    })

    it("does NOT allow an empty email address", () => {
      cy.getByData("submit-button").click()
      cy.getByData("success-message").should("not.exist")
      cy.getByData("error-message")
        .should("exist")
        .contains("Email is required")
    })
  })
})
