/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     *  Window object with additional properties used during test.
     */
    window(options?: Partial<Loggable & Timeoutable>): Chainable<CustomWindow>

    getByData(dataTestAttribute: string, args?: any): Chainable<Element>
    getBySelLike(
      dataTestPrefixAttribute: string,
      args?: any
    ): Chainable<Element>
  }
}
