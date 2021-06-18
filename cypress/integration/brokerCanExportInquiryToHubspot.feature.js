describe('broker is able to export inquiry to ', () => {
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

  describe('sucessfully export inquiry to Hubspot', () => {
    beforeEach(() => {
      cy.intercept(
        'POST',
        `https://flex-coast-api-development.herokuapp.com/api/inquiries/**`,
        { message: 'Successfully added to HubSpot' }
      )
    })
    it('is expected to export data to Hubspot CRM', () => {
      cy.get('[data-cy=inquiry]').eq(4).click()
      cy.get('[data-cy=inquiry-collapsible-cell]').within(() => {
        cy.fixture('listOfInquiries.json').then((fixture) => {
          fixture.inquiries[0].inquiry_status = 'started'
          cy.intercept(
            'GET',
            'https://flex-coast-api-development.herokuapp.com/api/inquiries',
            { body: fixture }
          )
        })
      })
      cy.get('[data-cy=export-button]').click()

      cy.get('[data-cy=snack-content]').should(
        'contain',
        'Successfully added to HubSpot'
      )
    })
  })
  describe('Unsuccesfully export to HubSpot', () => {
    beforeEach(() => {
      cy.intercept(
        'POST',
        `https://flex-coast-api-development.herokuapp.com/api/inquiries/**`,
        {
          statusCode: 409,
          body: {
            data: {
              error_message: [
                'A contact with email lucy@example.com already exists',
              ],
            },
          },
        }
      )
      cy.get('[data-cy=inquiry]').eq(4).click()
      cy.get('[data-cy=inquiry-collapsible-cell]').within(() => {
        cy.fixture('listOfInquiries.json').then((fixture) => {
          fixture.inquiries[0].inquiry_status = 'started'
          cy.intercept(
            'GET',
            'https://flex-coast-api-development.herokuapp.com/api/inquiries',
            { body: fixture }
          )
        })
      })
    })
    it('is expected to respond with an error message on export', () => {
      cy.get('[data-cy=export-button]').click()
      cy.get('[data-cy=error-snack]').should(
        'contain',
        'A contact with email lucy@example.com already exists'
      )
    })
  })
})
