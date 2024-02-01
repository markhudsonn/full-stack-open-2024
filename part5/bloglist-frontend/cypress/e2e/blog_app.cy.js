describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')

    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testpassword'
    }

    const anotherUser = {
      name: 'Another User',
      username: 'anotheruser',
      password: 'anotherpassword'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', anotherUser)
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()

      cy.contains('Login Successful')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.contains('Error wrong credentials')
    })

    it ('fail notification is red', function() {
      cy.contains('login').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('http://www.testurl.com')
      cy.get('#create-blog-button').click()

      cy.contains('Test Blog')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.contains('new blog').click()
        cy.get('#title').type('Test Blog')
        cy.get('#author').type('Test Author')
        cy.get('#url').type('http://www.testurl.com')
        cy.get('#create-blog-button').click()
      })

      it('A blog can be liked', function() {
        cy.contains('view').click()
        cy.get('#like-button').click()
        cy.get('#likes-counter').contains('1')
      })

      it('A blog can be deleted by the creator', function() {
        cy.contains('view').click()
        cy.contains('Remove').click()
        cy.contains('Test Blog').should('not.exist')
      })

      it('A blog cannot be deleted by another user', function() {
        cy.contains('Logout').click()
        cy.get('#username').type('anotheruser')
        cy.get('#password').type('anotherpassword')
        cy.get('#login-button').click()

        cy.contains('view').click()
        cy.contains('Remove').should('not.exist')
      })
    })
  })
})
