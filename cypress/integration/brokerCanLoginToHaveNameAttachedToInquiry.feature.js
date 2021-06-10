describe('Brokers have their names attached to initiated inquiries', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://flex-coast-development.herokuapp.com/api/inquiries',
      {
        fixture: 'listOfInquiries.json',
      }
    )
    cy.intercept(
      'PUT',
      'https://flex-coast-development.herokuapp.com/api/inquiries/**',
      {
        message: 'The inquiry status has been updated',
      }
    )
    cy.visit('/')
  })

  describe('Successfully as an authenticated broker', () => {
    beforeEach(() => {
      cy.intercept(
        'POST',
        'https://flex-coast-development.herokuapp.com/api/auth/sign_in',
        { fixture: 'broker.json' }
      )
      cy.intercept(
        'GET',
        'https://flex-coast-development.herokuapp.com/api/auth/validate_token',
        { fixture: 'broker.json', headers: { uid: 'johnny@cage.com' } }
      )
      cy.get('[data-cy=email-field]').type('johnny@cage.com')
      cy.get('[data-cy=password-field]').type('password')
      cy.get('[data-cy=login-btn]').click()
    })

    it('is expected to take broker to dashboard', () => {
      cy.get('[data-cy=inquiry]').should('have.length', 6)
      cy.get('[data-cy=broker-name]').should('contain', 'Mr. Johnny')
    })

    it('is expected to attach brokers name to an inquiry if they changes status', () => {
      cy.get('[data-cy=inquiry]').first().click()
      cy.get('[data-cy=broker]').should('not.exist')

      cy.get('[data-cy=inquiry-collapsible-cell]').within(() => {
        cy.fixture('listOfInquiries.json').then((fixture) => {
          fixture.inquiries[0].inquiry_status = 'started'
          fixture.inquiries[0].broker = {name:'Mr. Johnny'}
          cy.intercept(
            'GET',
            'https://flex-coast-development.herokuapp.com/api/inquiries',
            { body: fixture }
          )
        })
        cy.get('[data-cy=status-btn-2]').click()
        cy.get('[data-cy=broker]').should('contain', 'Mr. Johnny')
      })
    })
  })

  describe('Unsuccessfully with wrong credentials', () => {
    beforeEach(() => {
      cy.intercept(
        'POST',
        'https://flex-coast-development.herokuapp.com/api/auth/sign_in',
        {
          statusCode: 422,
          body: { data: { errors: ['Wrong credentials, please try again'] } },
        }
      )
      cy.get('[data-cy=email-field]').type('johnny@cage.com')
      cy.get('[data-cy=password-field]').type('assword')
      cy.get('[data-cy=login-btn]').click()
    })

    it('is expected to show an error message', () => {
      cy.get('[data-cy=error-snack]').should(
        'contain',
        'Wrong credentials, please try again'
      )
    })
  })
})
