describe("User Journey", () => {
  it("a user can find a course on the home page and complete the courses lessons", () => {
    cy.visit("/")
    cy.getByData("course-0").find("a").eq(3).click()
    cy.location("pathname").should("eq", "/testing-your-first-application")
    cy.getByData("next-lesson-button").click()
    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/app-install-and-overview"
    )
    cy.getByData("challenge-answer-0")
      .if("not.checked")
      .click()
      .else()
      .log("Checkbox is already checked")
    cy.getByData("next-lesson-button").should("exist").click()
    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/installing-cypress-and-writing-our-first-test"
    )
  })
})
