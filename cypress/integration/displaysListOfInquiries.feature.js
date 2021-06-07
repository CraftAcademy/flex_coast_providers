describe('User can see the inquiries', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://flex-coast-development.herokuapp.com/api/inquiries',
      {
        fixture: 'listOfInquiries.json',
      }
    )
    cy.visit('/')
  })
  describe('Successfully', () => {
    it('is expected to show three inquiries ', () => {
      cy.get('[data-cy=inquiry]').should('have.length', 3)
    })
    it('is expected to show the content of the inquiries', () => {
      cy.get('[data-cy=inquiry]')
        .first()
        .within(() => {
          cy.get('[data-cy=email]').should('contain', 'lucy@example.com')
          cy.get('[data-cy=company]').should('contain', 'Flex Coast')
          cy.get('[data-cy=start-date]').should('contain', '21 Jun 2021')
          cy.get('[data-cy=inquiry-date]').should('contain', '06 Jun 2021')
        })
    })
    it('is expected to show additional content on click', () => {
      cy.get('[data-cy=inquiry]').first().click()
      cy.get('[data-cy=inquiry-collapsible-cell]').within(() => {
        cy.get('[data-cy=size]').should('contain', 'Amount of employees: 1')
        cy.get('[data-cy=office-type]').should('contain', 'Office type: office')
        cy.get('[data-cy=peers]').should(
          'contain',
          'Would like to sit with peers'
        )
        cy.get('[data-cy=flexible]').should(
          'contain',
          'Flexible or fulltime: flexible'
        )
        cy.get('[data-cy=locations]').should(
          'contain',
          'Locations: Gothenburg City, Southside'
        )
        cy.get('[data-cy=phone]').should('contain', 'Phone number: 0707123456')
      })
    })
  })
})
