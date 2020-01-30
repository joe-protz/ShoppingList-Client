'ust strict'
const config = require('../config')
const store = require('../store')
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

const getItems = function () {
  return $.ajax({
    url: config.apiUrl + '/items',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteItem = (itemId) => {
  return $.ajax({
    url: config.apiUrl + '/items/' + itemId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

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
