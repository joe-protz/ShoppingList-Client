'use strict'
const authUi = require('../auth/ui')
const showItemsTemplate = require('../templates/showListItems.handlebars')

const createItemSuccess = function (data) {
 
}
const createItemFail = function (_error) {
  const msg = 'Failed to create new item, please try again'
  authUi.showToast(msg)
}

const getItemsSuccess = function (data) {
  console.log(data)
  const showItemsHtml = showItemsTemplate({
    items: data.items
  })
  $('.items-list').html(showItemsHtml)
}
const getItemsFail = function (_error) {
  const msg = 'Failed to get your items, log out to try again'
  authUi.showToast(msg)
}

module.exports = {
  createItemSuccess,
  createItemFail,
  getItemsSuccess,
  getItemsFail
}
