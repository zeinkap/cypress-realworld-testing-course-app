import coursesJson from "../../data/courses.json"
const { _ } = Cypress

describe("RWT Home", function () {
  beforeEach(function () {
    cy.visit("/")
  })

  it("renders all of the course titles, descriptions & lessons", function () {
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
})

export {}
