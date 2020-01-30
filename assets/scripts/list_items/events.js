'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
// creates  new item for current authorized user and updates their view with current list
// TODO: create a function that orders the list items by ID so that they do not randomly swap.
const createNewLI = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.createItem(data)
    .then(api.getItems)
    .then(ui.getItemsSuccess)
    .catch(ui.createItemFail)
}
// use the target events data ID which matches the users item ID to delete it and update view
const onRemoveItem = function (event) {
  event.preventDefault()
  const itemId = $(event.target).data('id')
  api.deleteItem(itemId)
    .then(api.getItems)
    .then(ui.getItemsSuccess)
    .catch(ui.removeItemFail)
}
// updates an item by using the helper function storevalue() which stores the values of a list item on focusin. This function then uses the event target ID , the text , and the class to pass what values are needed for the api to update the item. Triggered on focusout (enter button has been remapped to trigger focus out)
const onUpdateItem = function (event) {
  const itemId = $(event.target).data('id')
  const text = $(event.target).text()
  const typeOfUpdate = ($(event.target).attr('class'))
  api.updateItem(text.trim(), typeOfUpdate.trim(), tempName.trim(), tempQuantity.trim(), itemId)
    .then(api.getItems)
    .then(ui.getItemsSuccess)
    .catch(() => {
      ui.updateItemFail()
      $(event.target).text(tempQuantity)
    })
}
// stores value of the list item focused on last. on focus out update item is called
let tempName = ''
let tempQuantity = 0
const storeValue = function (event) {
  const parent = $(event.target).closest('.list-group-item')
  tempQuantity = parent.find('.quantity').text()
  tempName = parent.find('.name').text()
}

const addHandlers = function () {
  $('#create-new').on('submit', createNewLI)
  $('.items-list').on('click', '.remove', onRemoveItem)
  $('.items-list').on('focusout', '.update', onUpdateItem)
  $('.items-list').on('focusin', '.update', storeValue)
  // maps return keypress while inside of items list to cause focus out instead of return
  $('.items-list').keypress(function (e) {
    if (e.which === 13) {
      e.preventDefault()
      $(event.target).focusout()
    }
  })
}

module.exports = {
  addHandlers
}
