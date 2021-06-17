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
      'GET',
      'https://flex-coast-api-development.herokuapp.com/api/auth/validate_token**',
      { fixture: 'broker.json', headers: { uid: 'johnny@cage.com' } }
    )
    cy.intercept(
      'POST',
      'https://flex-coast-api-development.herokuapp.com/api/auth/sign_in',
      { fixture: 'broker.json' }
    )
    cy.intercept(
      'DELETE',
      'https://flex-coast-api-development.herokuapp.com/api/auth/sign_out',
      {
        statusCode: 200,
      }
    )
    cy.visit('/')
    cy.get('[data-cy=email-field]').type('johnny@cage.com')
    cy.get('[data-cy=password-field]').type('password')
    cy.get('[data-cy=login-btn]').click()
  })

  it('is expected to log the user out', () => {
    cy.get('[data-cy=logout-button]').click()
    cy.get('[data-cy=inquiry]').should('not.exist')
    cy.get('[data-cy=email-field]').should('be.visible')
  })
})
