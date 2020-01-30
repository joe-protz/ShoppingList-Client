'use strict'
const store = require('../store')
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
  signOutFail
}
