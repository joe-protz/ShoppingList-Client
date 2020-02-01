'use strict'
const store = require('../store')
const getListsSuccess = function (response) {

  console.log(store.user)
  console.log(response)
}

const getListsFail = function (error) {
  console.error(error)

}
module.exports = {
  getListsSuccess,
  getListsFail
}