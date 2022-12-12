/*
  Note: These tests rely upon local storage state from previous tests,
  so make sure to run all of them at once and in order
*/

const { _ } = Cypress
import coursesJson from "../../data/courses.json"
const courseSlug = "testing-your-first-application"
const lessons = coursesJson[courseSlug].lessons

describe("Progress State & Local Storage", () => {
  beforeEach(() => {
    // @ts-ignore
    cy.restoreLocalStorage()
  })

  afterEach(() => {
    // @ts-ignore
    cy.saveLocalStorage()
  })

  it("the progress state on the lesson page is preserved upon refresh", () => {
    cy.visit(`/${courseSlug}/${lessons[0].slug}`)
    cy.get("#answer-0").click()
    cy.getByData("next-lesson-button").should("be.visible")
    cy.getByData("lesson-complete-0").should("have.class", "bg-blue-600")
    cy.reload()
    cy.getByData("next-lesson-button").should("be.visible")
    cy.getByData("lesson-complete-0").should("have.class", "bg-blue-600")
  })

  it("the next lesson button says 'Complete Course' when all course lessons are completed", () => {
    cy.visit(`/${courseSlug}/${coursesJson[courseSlug].lessons[0].slug}`)

    _.each(lessons, (lesson, index) => {
      cy.location("pathname").should(
        "eq",
        `/${courseSlug}/${coursesJson[courseSlug].lessons[index].slug}`
      )
      cy.getByData(
        `"challenge-answer-${lesson["challenges"][0]["correctAnswerIndex"]}"`
      ).click()
      cy.getByData("lesson-complete-0").should("have.class", "bg-blue-600")

      if (index + 1 === lessons.length) {
        cy.getByData("next-lesson-button").contains("Complete Course")
      }

      cy.getByData("next-lesson-button").click()
    })

    cy.location("pathname").should("eq", "/")
  })

  it("all of the lesson steps, on the homepage, for the first completed course are filled and completed", () => {
    cy.visit("/")

    cy.getByData("course-0").within(() => {
      _.each(lessons, (lesson, index) => {
        cy.getByData(`lesson-complete-${index}`).should("exist")
      })
    })
  })

  it("all of the lesson cards on the course page have a status of 'Completed'", () => {
    cy.visit(`/${courseSlug}`)

    cy.getByData("course-steps").within(() => {
      _.each(lessons, (lesson, index) => {
        cy.getByData(`lesson-complete-${index}`).should("exist")
      })
    })
  })
})

export {}
