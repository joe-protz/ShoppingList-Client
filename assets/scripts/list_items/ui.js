'use strict'
const store = require('../store')
const showItemsTemplate = require('../templates/showListItems.handlebars')

const createItemFail = function (_error) {
  const msg = 'Failed to create new item, please try again'
  store.showToast(msg)
}
// uses handlebars template to show all items of user. Used by most functions to keep current view up to date
// TODO: ORDER THE LIST
const getItemsSuccess = function (data) {
  const orderedItems = sortItems(data)
  const showItemsHtml = showItemsTemplate({
    items: orderedItems
  })
  $('.items-list').html(showItemsHtml)
}

const sortItems = function (data) {
  const orderedItems = data.items.sort((book1, book2) => {
    if (book1.id < book2.id) {
      return -1
    } else {
      return 1
    }
  })
  return orderedItems
}

const getItemsFail = function (_error) {
  const msg = 'Failed to get your items, log out to try again'
  store.showToast(msg)
}

const removeItemFail = function (_error) {
  const msg = 'Failed to delete your item, please try again'
  store.showToast(msg)
}

const updateItemFail = function (_error) {
  const msg = 'Failed to update your item, please try again and ensure there is a name and the quantity is a number.'
  store.showToast(msg)
}
module.exports = {
  createItemFail,
  getItemsSuccess,
  getItemsFail,
  removeItemFail,
  updateItemFail
}
