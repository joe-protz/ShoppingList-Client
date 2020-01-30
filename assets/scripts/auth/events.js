'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(response => {
      return api.signIn(data)
    })
    .then(ui.signInSuccess)
    .then(response => {
      $('form').trigger('reset')
    })
    .catch(ui.signUpFailure)
    .then(response => {
      $('form').trigger('reset')
    })
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
     .then(response => {
      $('form').trigger('reset')
    })
}
const onSignOut = function (event) {

  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  $('.loading').show()
  $('#messages').show().text('Attempting to change password ...')
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
    .then(response => {
      $('.loading').hide()
      $('#messages').text('')
    })
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('click', onSignOut)
}

module.exports = {
  addHandlers
}