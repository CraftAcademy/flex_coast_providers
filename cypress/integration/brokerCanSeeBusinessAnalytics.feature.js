describe('Broker can see business analytics', () => {
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
    beforeEach(() => {
      cy.intercept(
        'GET',
        'https://flex-coast-api-development.herokuapp.com/api/analytics',
        {
          fixture: 'analytics.json',
        }
      )
      cy.get('[data-cy=menu-analytics]').click()
    })
    it('is expected to take broker to analytics page', () => {
      cy.url().should('contain', '/analytics')
    })

    it('is expected to display a funnel chart', () => {
      cy.get('[data-cy=wizard-chart]').should('be.visible')
    })

    it('is expected to display a total visit stat card', () => {
      cy.get('[data-cy=stat-card]').should('contain', '110')
    })

    it('is expected to display a total inquiries stat card', () => {
      cy.get('[data-cy=stat-card]').should('contain', '30')
    })

    it('is expected to display a total call button clicks stat card', () => {
      cy.get('[data-cy=stat-card]').should('contain', '17')
    })
  })

  describe('Unsuccessfully', () => {
    beforeEach(() => {
      cy.intercept(
        'GET',
        'https://flex-coast-api-development.herokuapp.com/api/analytics',
        {
          statusCode: 500,
        }
      )
      cy.get('[data-cy=menu-analytics]').click()
    })

    it('is expected to show an error snackbar', () => {
      cy.get('[data-cy=error-snack]').should(
        'contain',
        'Something went wrong, please try again later'
      )
    })

    it('is expected to also show an error text', () => {
      cy.get('[data-cy=analytics-error-message]').should('contain', 'There were no analytics to be found. Let\'s hope we can dig them up later!')
    })
  })
})
