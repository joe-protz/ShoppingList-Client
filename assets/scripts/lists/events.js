'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const listItemsApi = require('../list_items/api')
const listItemsUi = require('../list_items/ui')
const store = require('../store')
const api = require('./api')
const ui = require('./ui')

const onGetItems = function (event) {
  const listId = $(event.target).closest('.dropdown-item').data('id')
  store.listId = listId
  listItemsApi.getItems(listId)
    .then(listItemsUi.getItemsSuccess)
    .catch(listItemsUi.getItemsFail)
}

const changeDropDownName = function (event) {
  const listName = $(event.target).text()
  $('.navbar-brand').text(listName)
}
const onCreateList = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  const name = data.list.name
  
  api.createList(data)
    .then(response => {
     api.getLists()
     .then(ui.getListsSuccess)
     .then(ui.showNewList)
    })
    
}

const addHandlers = function () {
  $('.list-list').on('click', '.list-name', onGetItems)
  $('.list-list').on('click', '.list-name', changeDropDownName)
  $('.list-list').on('submit', '#create-list-form', onCreateList)
}

module.exports = {
  addHandlers
}
