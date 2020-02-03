'use strict'
const config = require('../config')
const store = require('../store')

const getLists = function () {
  return $.ajax({
    url: config.apiUrl + '/lists',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const createList = function (data) {
  return $.ajax({
    url: config.apiUrl + '/lists',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const deleteList = (listId) => {
  return $.ajax({
    url: config.apiUrl + '/lists/' + listId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
module.exports = {
  getLists,
  createList,
  deleteList
}
