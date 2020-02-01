'use strict'
const listItemsApi = require('../list_items/api')
const listItemsUi = require('../list_items/ui')
const onGetItems = function (event) {
  console.log('click')
  const listId = $(event.target).data('id')
  console.log(listId)
  listItemsApi.getItems(listId)
  .then(listItemsUi.getItemsSuccess)
  .catch(listItemsUi.getItemsFail)
}


const addHandlers = function () {
  $('.list-list').on('click', '.list-name', onGetItems)
}

module.exports = {
  addHandlers
}