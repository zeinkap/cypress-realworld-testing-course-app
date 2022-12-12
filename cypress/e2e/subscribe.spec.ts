describe("Newsletter Subscribe Form", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  const NEW_EMAIL = "zak@aol.com"
  const INVALID_EMAIL = "zak"
  const SUBSCRIBED_EMAIL = "john@example.com"

  context("happy paths", () => {
    it("the email input field contains the correct placeholder text", () => {
      cy.getByData("email-input")
        .invoke("attr", "placeholder")
        .should("eq", "Subscribe for Updates")
    })

    it("allows users to subscribe to the email list", () => {
      cy.getByData("email-input").type(NEW_EMAIL)
      cy.getByData("submit-button").click()
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
      cy.getByData("email-input").type(SUBSCRIBED_EMAIL)
      cy.getByData("submit-button").click()
      cy.getByData("server-error-message")
        .should("exist")
        .contains(SUBSCRIBED_EMAIL)
    })

    it("does NOT allow an empty email address", () => {
      cy.getByData("submit-button").click()
      cy.getByData("error-message")
        .should("exist")
        .contains("Email is required")
    })
  })
})
