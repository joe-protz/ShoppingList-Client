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

const showNewList = function () {
  const listNames = $('.list-name').toArray()
  let maxObj = $(listNames[0])
  listNames.forEach((list) => {
    if ($(list).data('id') > $(maxObj).data('id')) maxObj = list
  })

  $(maxObj).click()
}

module.exports = {
  getListsSuccess,
  getListsFail,
  showNewList
}
