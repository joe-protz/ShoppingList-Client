'use strict'
const store = require('../store')

let pwViewOpen = false

const signInSuccess = function (response) {
  store.user = response.user
  changeLoggedIn('signed in')
  $('form').trigger('reset')
}

const signInFail = function (_error) {
  const msg = 'Failed to sign in, please try again'  
  showToast(msg)
  $('.passwords').val('')
}

const signUpFail = function (_error) {
  const msg = 'Failed to sign up, please try again'  
  showToast(msg)
  $('.passwords').val('')
}
const signOutSuccess = function () {
  store.user = null
  changeLoggedIn()
}

const signOutFail = function (_error) {
  const msg = 'Failed to sign out, please try again'  
  showToast(msg)
}
const changePasswordView = function (show) {
  if (show && !pwViewOpen) {
    $('.pw-view').show()
    pwViewOpen = true
  } else {
    pwViewOpen = false
    $('.pw-view').hide()
  }
}
const changePasswordSuccess = function (_response) {
  $('.pw-view').hide()
  $('form').trigger('reset')
}

const changePasswordFailure = function (_error) {
  const msg = 'Failed to change password, please try again'  
  showToast(msg)
  $('form').trigger('reset')
}
const changeLoggedIn = function (state) {
  if (state === 'signed in') {
    $('.signed-out').hide()
    $('.signed-in').show()
  } else {
    $('.signed-out').show()
    $('.signed-in').hide()
  }
}
const showToast = function (msg) {
  $('.toast').toast('show')
  $('.toast-body').text(msg)
}
module.exports = {
  signUpFail,
  signInSuccess,
  signOutSuccess,
  signInFail,
  signOutFail,
  changePasswordSuccess,
  changePasswordFailure,
  changePasswordView
}
