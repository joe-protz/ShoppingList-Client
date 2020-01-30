'ust strict'
const config = require('../config')
const store = require('../store')
// creates an item with getformfields 
// TODO: get rid of ugly form and reuse list update logic to make creating more intuitive
const createItem = function (data) {
  return $.ajax({
    url: config.apiUrl + '/items',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}
// get all for authorized user
const getItems = function () {
  return $.ajax({
    url: config.apiUrl + '/items',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
// delete based on ID of button clicked for authorized user
const deleteItem = (itemId) => {
  return $.ajax({
    url: config.apiUrl + '/items/' + itemId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
// updates the item based on which LI ID was clicked, whether the quantity or name was focused on and uses the stored value of the other attribute to keep it consistent. Defaults undefined quantities to ''
const updateItem = function (text, typeOfUpdate, currentName, currentQuantity, id) {
  if (typeOfUpdate === 'quantity') {
    if (text === 'undefined') {
      text = ''
    }
    return $.ajax({
      url: config.apiUrl + '/items/' + id,
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + store.user.token
      },
      data: {
        'item': {
          'name': currentName,
          'quantity': text
        }
      }
    })
  } else {
    return $.ajax({
      url: config.apiUrl + '/items/' + id,
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + store.user.token
      },
      data: {
        'item': {
          'name': text,
          'quantity': currentQuantity
        }
      }
    })
  }
}

module.exports = {
  createItem,
  getItems,
  deleteItem,
  updateItem
}
