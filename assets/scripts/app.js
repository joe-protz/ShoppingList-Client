'use strict'
const authEvents = require('./auth/events')

$(() => {
  $('.signed-in').hide()
  $('.pw-view').hide()
  authEvents.addHandlers()
})
