'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')
// creates  new item for current authorized user and updates their view with current list

const createNewLI = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.createItem(data)
    .then(() => {
      api.getItems(store.listId)
        .then(ui.getItemsSuccess)
    })
    .catch(ui.createItemFail)
}
// use the target events data ID which matches the users item ID to delete it and update view
const onRemoveItem = function (event) {
  event.preventDefault()
  const itemId = $(event.target).data('id')
  const listId = $(event.target).data('listid')
  api.deleteItem(itemId, listId)
    .then(() => {
      api.getItems(listId)
        .then(ui.getItemsSuccess)
    })

    .catch(ui.removeItemFail)
}
// updates an item by using the helper function storevalue() which stores the values of a list item on focusin. This function then uses the event target ID , the text , and the class to pass what values are needed for the api to update the item. Triggered on focusout (enter button has been remapped to trigger focus out)
const onUpdateItem = function (event) {
  const itemId = $(event.target).data('id')
  const text = $(event.target).text()
  const typeOfUpdate = ($(event.target).attr('class'))
  api.updateItem(text.trim(), typeOfUpdate.trim(), tempName.trim(), tempQuantity.trim(), itemId)
    .then(() => {
      api.getItems(store.listId)
        .then(ui.getItemsSuccess)
    })
    .catch(() => {
      ui.updateItemFail()
      if (typeOfUpdate === 'quantity') {
        $(event.target).text(tempQuantity)
      } else {
        $(event.target).text(tempName)
      }
    })

    .catch(ui.getItemsFail)
}
// stores value of the list item focused on last. on focus out update item is called
let tempName = ''
let tempQuantity = 0
const storeValue = function (event) {
  const parent = $(event.target).closest('.list-group-item')
  tempQuantity = parent.find('.quantity').text()
  tempName = parent.find('.name').text()
}
const removeEditable = function (event) {
  const cell = event.target
  // select all text in contenteditable
  let range, selection
  if (document.body.createTextRange) {
    range = document.body.createTextRange()
    range.moveToElementText(cell)
    range.select()
  } else if (window.getSelection) {
    selection = window.getSelection()
    range = document.createRange()
    range.selectNodeContents(cell)
    selection.removeAllRanges()
    selection.addRange(range)
  }
  // once a editable span is selected, stop all quantity class divs from allowing non-numeric keypresses
  $('.quantity').keypress(function (e) {
    if (isNaN(String.fromCharCode(e.which))) e.preventDefault()
  })
  $(event.target).removeClass('edit')
  $('.edit').removeAttr('contenteditable')
}

const addHandlers = function () {
  $('.items-list').on('submit', '#create-new', createNewLI)
  $('.items-list').on('click', '.remove', onRemoveItem)
  $('.items-list').on('focusout', '.update', onUpdateItem)
  $('.items-list').on('focus', '.update', storeValue)
  $('.items-list').on('focus', '.update', removeEditable)
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
