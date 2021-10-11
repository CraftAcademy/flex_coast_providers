describe('User can see the inquiries', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://flex-coast-api-development.herokuapp.com/api/inquiries',
      {
        fixture: 'listOfInquiries.json',
      }
    )
    cy.visit('/')
    cy.window().its('store').invoke('dispatch', {
      type: 'AUTHENTICATE',
      payload: 'Johhny Cage',
    })
  })
  describe('Successfully', () => {
    it('is expected to show three inquiries ', () => {
      cy.get('[data-cy=inquiry]').should('have.length', 6)
    })
    it('is expected to show the content of the inquiries', () => {
      cy.get('[data-cy=inquiry]')
        .eq(5)
        .within(() => {
          cy.get('[data-cy=email]').should('contain', 'lucy@example.com')
          cy.get('[data-cy=broker]').should('not.exist')
          cy.get('[data-cy=inquiry-date]').should('contain', '06 Jun 2021')
        })
    })
    it('is expected to show additional content on click', () => {
      cy.get('[data-cy=inquiry]').eq(5).click()
      cy.get('[data-cy=inquiry-collapsible-cell]').within(() => {
        cy.get('[data-cy=size]').find('span').should('contain', '1')
        cy.get('[data-cy=office-type]').find('span').should('contain', 'office')
        cy.get('[data-cy=peers]').find('span').should('contain', 'yes')
        cy.get('[data-cy=locations]')
          .find('span')
          .first()
          .should('contain', 'Gothenburg City')
        cy.get('[data-cy=phone]').find('span').should('contain', '0707123456')

        context('with additional info on a phone', () => {
          cy.viewport(450, 750)
          cy.get('[data-cy=email]')
            .find('span')
            .should('contain', 'lucy@example.com')
          cy.get('[data-cy=start-date]')
            .find('span')
            .should('contain', '21 Jun 2021')
        })
      })
    })
  })
})
