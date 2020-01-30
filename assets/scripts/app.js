'use strict'
const authEvents = require('./auth/events')

$(() => {
  $('.signed-in').hide()
  authEvents.addHandlers()
})
