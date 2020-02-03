'use strict'
const store = require('../store')
const showListsTemplate = require('../templates/showListsTemplate.handlebars')

// uses handlebars template to add dropdown items for each of the users lists
const getListsSuccess = function (response) {
  const showListsHtml = showListsTemplate({
    lists: response.lists
  })
  $('.dropdown-menu').html(showListsHtml)
}

const getListsFail = function (_error) {
  const msg = 'Failed to retrieve your list, please try again'
  store.showToast(msg)
}
//  finds the newest list by finding the ID with the highest value, and clicking on the parent div (needed to allow the changeDropdownName function to work consistently)
const showNewList = function () {
  const listNames = $('.list-name').toArray()
  let maxObj = $(listNames[0])
  listNames.forEach((list) => {
    if ($(list).data('id') > $(maxObj).data('id')) maxObj = list
  })

  $(maxObj).find('div').click()
}

const showFirstList = function () {
  const listNames = $('.list-name').toArray()
  let minObj = $(listNames[0])
  listNames.forEach((list) => {
    if ($(list).data('id') < $(minObj).data('id')) minObj = list
  })

  $(minObj).find('div').click()
}

module.exports = {
  getListsSuccess,
  getListsFail,
  showNewList,
  showFirstList
}
