describe('Broker is able to update status of inquiry', () => {
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
    cy.get('[data-cy=inquiry]').eq(5).click()
  })
  describe('Successfully', () => {
    beforeEach(() => {
      cy.intercept(
        'PUT',
        'https://flex-coast-api-development.herokuapp.com/api/inquiries/**',
        {
          message: 'The inquiry status has been updated',
        }
      )
    })
    it('is expected to update the status to started', () => {
      cy.get('[data-cy=inquiry-collapsible-cell]').within(() => {
        cy.fixture('listOfInquiries.json').then((fixture) => {
          fixture.inquiries[0].inquiry_status = 'started'
          cy.intercept(
            'GET',
            'https://flex-coast-api-development.herokuapp.com/api/inquiries',
            { body: fixture }
          )
        })
        cy.get('[data-cy=status-btn-2]').click()
        cy.get('[data-cy=inquiry-status]').should('contain', 'started')
      })
    })

    it('is expected to not to be able to change from pending to done', () => {
      cy.get('[data-cy=inquiry-collapsible-cell]').within(() => {
        cy.get('[data-cy=status-btn-3]').should('not.class', 'disabled')
      })
    })
  })

  describe('Unsuccessfully with the servers down', () => {
    beforeEach(() => {
      cy.intercept(
        'PUT',
        'https://flex-coast-api-development.herokuapp.com/api/inquiries/**',
        {
          statusCode: 500,
        }
      )
      cy.get('[data-cy=inquiry-collapsible-cell]').within(() => {
        cy.get('[data-cy=status-btn-2]').click()
      })
    })

    it('is expected to not change the value', () => {
      cy.get('[data-cy=inquiry-status]').should('contain', 'pending')
      cy.get('[data-cy=status-btn-1]').find('input').should('be.checked')
      cy.get('[data-cy=status-btn-2]').find('input').should('not.be.checked')
    })

    it('is expected to display an error message', () => {
      cy.get('[data-cy=error-snack]').should(
        'contain',
        'Something went wrong, Please try again later'
      )
    })

    it('is expected to hide error message after 5 seconds', () => {
      cy.wait(5000)
      cy.get('[data-cy=error-snack]').should('not.exist')
    })
  })
})
