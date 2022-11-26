import coursesJson from "../../data/courses.json"
const { _ } = Cypress

describe("home page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("renders all of the course titles, descriptions & lessons", () => {
    const courses = Object.keys(coursesJson)

    _.each(courses, (course, index) => {
      const title = coursesJson[course].title
      const description = coursesJson[course].description
      const lessons = coursesJson[course].lessons

      cy.getByData(`course-${index}`).within(($course) => {
        cy.getByData("course-title").contains(title)
        cy.getByData("course-description").contains(description)

        _.each(lessons, (lesson, index) => {
          const lessonTitle = lessons[index].title
          cy.getByData(`lesson-${index}`).contains(lessonTitle)
        })
      })
    })
  })

  it("the h1 contains the correct text", () => {
    cy.getByData("hero-heading").contains(
      "Testing Next.js Applications with Cypress"
    )
  })

  it("the features on the homepage are correct", () => {
    cy.get("dt").eq(0).contains("4 Courses")
    cy.get("dt").eq(1).contains("25+ Lessons")
    cy.get("dt").eq(2).contains("Free and Open Source")
  })

})

export {}
