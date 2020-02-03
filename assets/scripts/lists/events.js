'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const listItemsApi = require('../list_items/api')
const listItemsUi = require('../list_items/ui')
const store = require('../store')
const api = require('./api')
const ui = require('./ui')

// Gets all items from the selected list by finding the closest ID and sending it to API
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

// Uses the text of the dropdown item to update the navbar text.
const changeDropDownName = function (event) {
  let listName
  if ($(event.target).hasClass('dropdown-item')) {
    listName = $(event.target).find('div').text() // needed for clicking edge of item where the text would include the button
  } else {
    listName = $(event.target).text()
  }
  $('.navbar-brand').text(listName)
}

// Creates a new list using the dropdown form
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

// creates a temporary event listener for the modal in which if "delete" is pressed, the list is deleted and if the list ID === current list view, the view is reset
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
  // removes event listeners on modal close to keep them from piling up even though it works fine without this, you get error messages
  $('#list-delete-modal').on('hidden.bs.modal', () => {
    $('#confirm-delete').off('click')
  })
}

module.exports = {
  addHandlers
}
