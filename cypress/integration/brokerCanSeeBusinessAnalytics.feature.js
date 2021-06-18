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
      cy.get('[data-cy=total-visit-card]').should('contain', '110')
    })

    it('is expected to display a total call button clicks stat card', () => {
      cy.get('[data-cy=phone-calls-card]').should('contain', '17')
    })
  })
})
