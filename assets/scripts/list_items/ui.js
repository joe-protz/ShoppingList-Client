'use strict'
const store = require('../store')
const showItemsTemplate = require('../templates/showListItems.handlebars')

const createItemSuccess = function (data) {

}
const createItemFail = function (_error) {
  const msg = 'Failed to create new item, please try again'
  store.showToast(msg)
}

const getItemsSuccess = function (data) {
  const showItemsHtml = showItemsTemplate({
    items: data.items
  })
  $('.items-list').html(showItemsHtml)
}
const getItemsFail = function (_error) {
  const msg = 'Failed to get your items, log out to try again'
  store.showToast(msg)
}

const removeItemFail = function (_error) {
  const msg = 'Failed to delete your item, please try again'
  store.showToast(msg)
}

// const updateItemSuccess = function (response) {

// }

const updateItemFail = function (_error) {
  const msg = 'Failed to update your item, please try again and ensure there is a name and the quantity is a number.'
  store.showToast(msg)
}
module.exports = {
  createItemSuccess,
  createItemFail,
  getItemsSuccess,
  getItemsFail,
  removeItemFail,
  updateItemFail
}
