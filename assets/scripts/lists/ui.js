'use strict'
// const store = require('../store')
const showListsTemplate = require('../templates/showListsTemplate.handlebars')

const getListsSuccess = function (response) {
  const showListsHtml = showListsTemplate({
    lists: response.lists
  })
  $('.dropdown-menu').html(showListsHtml)
}

const getListsFail = function (error) {
  console.error(error)
}
module.exports = {
  getListsSuccess,
  getListsFail
}
