'use strict'
const store = require('../store')
const listApi = require('../lists/api')
const listUi = require('../lists/ui')

let pwViewOpen = false

// store the users token for use then get all list items
const signInSuccess = function (response) {
  store.user = response.user
  changeLoggedIn('signed in')
  $('form').trigger('reset')
  listApi.getLists()
    .then(listUi.getListsSuccess)
    .catch(listUi.getListsFail)
}
// alert of fail
const signInFail = function (_error) {
  const msg = 'Failed to sign in, please try again'
  showToast(msg)
  $('.passwords').val('')
}
// alert of fail
const signUpFail = function (_error) {
  const msg = 'Failed to sign up, please try again'
  showToast(msg)
  $('.passwords').val('')
}
// just change views and reset store
const signOutSuccess = function () {
  store.user = null
  changeLoggedIn()
  $('.items-list').html('')
  $('form').trigger('reset')
}
// alert of fail
const signOutFail = function (_error) {
  const msg = 'Failed to sign out, please try again'
  showToast(msg)
}
// either open or close PW View based on current state. Accepts an argument because cancel button only ever closes while change PW button toggles.
const changePasswordView = function (show) {
  if (show && !pwViewOpen) {
    $('.pw-view').show()
    $('.items-list').hide()
    $('body').css('background-image', ' none')
    pwViewOpen = true
  } else {
    pwViewOpen = false
    $('.pw-view').hide()
    $('.items-list').show()
    $('body').css('background-image', ' url("public/cork.png")')
  }
}
// close pw view and show success message , but set header of toast back to error after 3 sec (amt of time toast stays up)
const changePasswordSuccess = function (_response) {
  changePasswordView()
  $('form').trigger('reset')
  $('.toast-header').text('Success!')
  const msg = 'Successfully changed password.'
  showToast(msg)
  setTimeout(() => $('.toast-header').text('Error!'), 3750) // must edit to match toast autohide delay
}
// show error msg
const changePasswordFailure = function (_error) {
  const msg = 'Failed to change password, please try again'
  showToast(msg)
  $('form').trigger('reset')
}
// toggle view from logged in to logged out
const changeLoggedIn = function (state) {
  if (state === 'signed in') {
    $('.signed-out').hide()
    $('.signed-in').show()
    $('body').css('background-image', ' url("public/cork.png")')
  } else {
    changePasswordView()
    $('.signed-out').show()
    $('.signed-in').hide()
    $('body').css('background-image', 'none')
  }
}
// shows an error toast with a custom msg
const showToast = function (msg) {
  $('.toast').toast('show')
  $('.toast-body').text(msg)
}
store.showToast = showToast

module.exports = {
  signUpFail,
  signInSuccess,
  signOutSuccess,
  signInFail,
  signOutFail,
  changePasswordSuccess,
  changePasswordFailure,
  changePasswordView,
  showToast
}
