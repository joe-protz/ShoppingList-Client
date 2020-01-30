'use strict'
const authEvents = require('./auth/events')
const listItemEvents = require('./list_items/events')
$(() => {
  $('.signed-in').hide()
  $('.pw-view').hide()
  authEvents.addHandlers()
 // listItemEvents.addHandlers()
})
