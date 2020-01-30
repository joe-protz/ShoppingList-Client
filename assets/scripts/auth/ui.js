'use strict'
const store = require('../store')

let pwViewOpen = false

const signInSuccess = function (response) {
  store.user = response.user
  changeLoggedIn('signed in')
}

const signInFail = function (error) {
  console.log(error)
}

const signOutSuccess = function () {
  store.user = null
  changeLoggedIn()
}

const signOutFail = function (error) {
  console.log(error)
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
const changePasswordSuccess = function (response) {
  $('.pw-view').hide()
}

const changePasswordFailure = function (error) {
  console.error(error)
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

module.exports = {
  signInSuccess,
  signOutSuccess,
  signInFail,
  signOutFail,
  changePasswordSuccess,
  changePasswordFailure,
  changePasswordView
}
