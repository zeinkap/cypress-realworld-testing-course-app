/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     *  Window object with additional properties used during test.
     */
    window(options?: Partial<Loggable & Timeoutable>): Chainable<CustomWindow>
    /**
     * Get a DOM element based on data-test attribute value
     * @param selector data-test value
     * @example
     * cy.getByData("email")
     * // will select the element 
     * <input data-test="email" />
     */
    getByData(selector: string): Chainable<Element>
    getBySelLike(
      dataTestPrefixAttribute: string,
      args?: any
    ): Chainable<Element>
  }
}
