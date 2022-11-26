describe("Multiple Choice Challenge", () => {
  beforeEach(() => {
    cy.visit("/testing-foundations/testing-is-a-mindset")
  })

  it("gray's out and strikes through an incorrect answer", () => {
    cy.get("#answer-0").click()
    cy.get("label[for='answer-0']").should(
      "have.class",
      "line-through text-gray-300"
    )
  })

  it("it displays the next lesson button when an answer is correct and updates the progress sidebar", () => {
    cy.get("#answer-1").click()
    cy.getByData("next-lesson-button").should("be.visible")
    cy.getByData("lesson-complete-0").should("have.class", "bg-indigo-600")
  })

  context("Disable Challenges Functionality", () => {
    beforeEach(() => {
      // @ts-ignore
      cy.restoreLocalStorage()
    })

    afterEach(() => {
      // @ts-ignore
      cy.saveLocalStorage()
    })

    it("toggles the display of the question if checked or not", () => {
      cy.getByData("multiple-choice-challenge").should("be.visible")
      cy.getByData("skip-challenge-input").click()
      cy.getByData("multiple-choice-challenge").should("not.exist")

      cy.getByData("skip-challenge-input").click()
      cy.getByData("multiple-choice-challenge").should("exist")
      cy.getByData("multiple-choice-challenge").should("be.visible")
    })

    it.only("displays the complete lesson button when checked", () => {
      cy.getByData("skip-challenge-input").click()
      cy.getByData("complete-lesson-button").should("be.visible")
      cy.getByData("next-lesson-button").should("not.exist")
    })

    it("remains checked after page refresh", () => {
      cy.getByData("skip-challenge-input").click()
      cy.reload()
      cy.getByData("multiple-choice-challenge").should("not.exist")
    })
  })
})

export {}
