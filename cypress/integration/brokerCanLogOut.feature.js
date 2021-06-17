describe('Broker is able to logout after being logged in', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://flex-coast-api-development.herokuapp.com/api/inquiries',
      {
        fixture: 'listOfInquiries.json',
      }
    )
    cy.intercept(
      'DELETE',
      'https://flex-coast-api-development.herokuapp.com/api/auth/sign_out',
      {
        statusCode: 200,
      }
    )
    cy.visit('/')
    cy.window().its('store').invoke('dispatch', {
      type: 'AUTHENTICATE',
      payload: 'Johhny Cage',
    })
  })

  it('is expected to log the user out', () => {
    cy.get('[data-cy=logout-button]').click()
    cy.get('[data-cy=inquiry]').should('not.exist')
    cy.get('[data-cy=email-field]').should('be.visible')
  })
})
