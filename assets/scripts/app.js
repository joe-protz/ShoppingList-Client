'use strict'
const authEvents = require('./auth/events')
const listItemEvents = require('./list_items/events')
const listEvents = require('./lists/events')
$(() => {
  $('.signed-in').hide()
  $('.pw-view').hide()
  $('.toast').toast()
  authEvents.addHandlers()
  listItemEvents.addHandlers()
  listEvents.addHandlers()
})
