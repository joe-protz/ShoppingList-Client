'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const listItemsApi = require('../list_items/api')
const listItemsUi = require('../list_items/ui')
const store = require('../store')
const api = require('./api')
const ui = require('./ui')

const onGetItems = function (event) {
  if (!$(event.target).hasClass('delete-list')) {
    changeDropDownName(event)
    const listId = $(event.target).closest('.dropdown-item').data('id')
    store.listId = listId
    listItemsApi.getItems(listId)
      .then(listItemsUi.getItemsSuccess)
      .catch(listItemsUi.getItemsFail)
  }
}

const changeDropDownName = function (event) {
  const listName = $(event.target).find('div').text()
  $('.navbar-brand').text(listName)
}
const onCreateList = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.createList(data)
    .then(response => {
      api.getLists()
        .then(ui.getListsSuccess)
        .then(ui.showNewList)
    })
}

const onDeleteList = function (event) {
  const listId = $(event.target).data('id')
  $('#confirm-delete').one('click', () => {
    api.deleteList(listId)
      .then(response => {
        api.getLists()
          .then(ui.getListsSuccess)
      })
  })
  if (listId === store.listId) {
    $('.items-list').html('')
    $('.navbar-brand').text('My List App')
  }
}

const addHandlers = function () {
  $('.list-list').on('click', '.list-name', onGetItems)
  $('.list-list').on('submit', '#create-list-form', onCreateList)
  $('.list-list').on('click', '.delete-list', onDeleteList)
  $('#list-delete-modal').on('hidden.bs.modal', () => {
    $('#confirm-delete').off('click')
  })
}

module.exports = {
  addHandlers
}
