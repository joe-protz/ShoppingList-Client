'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
// sign up and use data to sign in
const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(() => {
      api.signIn(data)
        .then(ui.signInSuccess)
    })

    .catch(ui.signUpFail)
}
// sign in and change view on success or show notification on error
// TODO: Figure out how to tell user WHY their errors happen
const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFail)
}
// Sign out and change view on success, notify on error
const onSignOut = function (event) {
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFail)
}
// Change password with current and new, notify of result
const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}
//  used by app.js to add handlers for auth events
const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('click', onSignOut)
  $('#change-password-form').on('submit', onChangePassword)
  $('#open-pw-view').on('click', () => ui.changePasswordView(true))
  $('#cancel').on('click', () => ui.changePasswordView(false))
}

module.exports = {
  addHandlers
}
