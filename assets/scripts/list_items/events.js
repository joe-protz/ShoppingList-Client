'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const createNewLI = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.createItem(data)
    .then(api.getItems)
    .then(ui.getItemsSuccess)
    .catch(ui.createItemFail)
}
const onRemoveItem = function (event) {
  event.preventDefault()
  const itemId = $(event.target).data('id')
  api.deleteItem(itemId)
    .then(api.getItems)
    .then(ui.getItemsSuccess)
    .catch(ui.removeItemFail)
}

const onUpdateItemTrigger = function (event) {
  const itemId = $(event.target).data('id')
  const text = $(event.target).text()
  const typeOfUpdate = ($(event.target).attr('class'))
  api.updateItem(text.trim(), typeOfUpdate.trim(), tempName.trim(), tempQuantity.trim(), itemId)
    .then(api.getItems)
    .then(ui.getItemsSuccess)
    .catch(ui.updateItemFail)
}
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
  $('.items-list').on('focusout', '.update', onUpdateItemTrigger)
  $('.items-list').on('focusin', '.update', storeValue)

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
