describe('Client displays list of notes on each Inquiry', () => {
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
    cy.get('[data-cy=inquiry]').first().click()
  })
  describe('Successfully', () => {
    it('is expected to display a list of 3', () => {
      cy.get('[data-cy=inquiry-collapsible-cell]').within(() => {
        cy.get('[data-cy=note]').should('have.length', '3')
      })
    })

    it('is expected to display the expected content', () => {
      cy.get('[data-cy=inquiry-collapsible-cell]').within(() => {
        cy.get('[data-cy=note]')
          .first()
          .should('contain', 'This inquiry was submitted 14 Jun 2021')
          .and('contain', 'by: System')
        cy.get('[data-cy=note]')
          .eq(1)
          .should('contain', 'This inquiry was started 14 Jun 2021')
          .and('contain', 'by: John Doe')
        cy.get('[data-cy=note]')
          .eq(2)
          .should('contain', 'This inquiry was finished 14 Jun 2021')
          .and('contain', 'by: John Doe')
      })
    })
  })
})
