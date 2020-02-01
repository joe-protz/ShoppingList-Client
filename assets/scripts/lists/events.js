'use strict'
const listItemsApi = require('../list_items/api')
const listItemsUi = require('../list_items/ui')
const store = require('../store')

const onGetItems = function (event) {
  const listId = $(event.target).data('id')
  store.listId = listId
  listItemsApi.getItems(listId)
    .then(listItemsUi.getItemsSuccess)
    .catch(listItemsUi.getItemsFail)
}

const changeDropDownName = function (event) {
  const listName = $(event.target).text()
  $('.navbar-brand').text(listName)
}

const addHandlers = function () {
  $('.list-list').on('click', '.list-name', onGetItems)
  $('.list-list').on('click', '.list-name', changeDropDownName)
}

module.exports = {
  addHandlers
}
