/// <reference path="../global.d.ts" />
// @ts-nocheck
Cypress.Commands.add("getByData", (selector: string) => {

  Cypress.log({
    displayName: 'getByData',
    message: selector,
    consoleProps() {
      return {
        selector: selector
      }
    }
  })

  return cy.get(`[data-test=${selector}]`, { log: false })
})

Cypress.Commands.add("getBySelLike", (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args)
})

let LOCAL_STORAGE_MEMORY = {}

Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key]
  })
})

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key])
  })
})

export {}
