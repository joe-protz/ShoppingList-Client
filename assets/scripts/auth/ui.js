'use strict'
const store = require('../store')
const listItemUi = require('../list_items/ui')
const listItemApi = require('../list_items/api')

let pwViewOpen = false

const signInSuccess = function (response) {
  store.user = response.user
  changeLoggedIn('signed in')
  $('form').trigger('reset')
  listItemApi.getItems()
    .then(listItemUi.getItemsSuccess)
    .catch(listItemUi.getItemsFail)
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
  $('form').trigger('reset')
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
  $('.toast-header').text('Success!')
  const msg = 'Successfully changed password.'
  showToast(msg)
  setTimeout(() => $('.toast-header').text('Error!'), 3000)
  
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
    $('.pw-view').hide()
    $('.signed-out').show()
    $('.signed-in').hide()
  }
}
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
