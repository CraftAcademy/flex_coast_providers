describe('Brokers can create new notes', () => {
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
    beforeEach(() => {
      cy.intercept(
        'POST',
        'https://flex-coast-api-development.herokuapp.com/api/inquiries/**/notes',
        { message: 'Note successfully created' }
      )
    })
    it('is expected to display the new message on top of the notes list', () => {
      cy.get('[data-cy=note-input]').type(
        'Client has monthly budget of 50.000 sek'
      )
      cy.fixture('listOfInquiries.json').then((fixture) => {
        let newNote = {
          body: 'Client has monthly budget of 50.000 sek',
          id: 19,
          date: '17 Jun 2021',
          creator: {
            id: 4,
            email: 'johndoe@flexcoast.se',
            name: 'John Doe',
          },
        }
        fixture.inquiries[5].notes.unshift(newNote)
        cy.intercept(
          'GET',
          'https://flex-coast-api-development.herokuapp.com/api/inquiries',
          { body: fixture }
        )
      })
      cy.get('[data-cy=note-submit-btn]').click()
      cy.wait(1000)
      cy.get('[data-cy=note-meta]').first().should('contain', 'by: John Doe')
      cy.get('[data-cy=note]')
        .first()
        .should('contain', 'Client has monthly budget of 50.000 sek')

      context('and it clears the input field', () => {
        cy.get('[data-cy=note-input]').should('have.value', '')
      })
    })
  })

  describe('Unsuccessfully with an empty input field', () => {
    beforeEach(() => {
      cy.intercept(
        'POST',
        'https://flex-coast-api-development.herokuapp.com/api/inquiries/**/notes',
        {
          statusCode: 422,
          body: { error_message: 'param is missing or the value is empty' },
        }
      )
    })
    it('is expected to show an error message', () => {
      cy.get('[data-cy=note-submit-btn]').click()
      cy.get('[data-cy=error-snack]').should(
        'contain',
        "Let's not save an empty note!"
      )
    })
  })
})
