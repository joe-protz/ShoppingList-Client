'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const createNewLI = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
 api.createItem(data)
 .then(api.getItems)
 .then(ui.getItemsSuccess)
 .catch(ui.createItemFail)
}

const addHandlers = function () {
 $('#create-new').on('submit', createNewLI)
}


// const addItem = function (event) {
//    $(event.target).focusout(() => {
//      const text = $(event.target).text()
//      api.createItem(text)
//      $(event.target).attr('contenteditable', 'true')
//    })
//   $(event.target).keypress(function (e) {
//     if (e.which == 13) {
//       e.preventDefault()
//       $(event.target).attr('contenteditable', 'false')
//     }
//   })
 
// }


// $('#new-editable').

// // on click, make content editable.
// click(function () {
//     $(this).html("").attr('contenteditable', 'true')
//     var div = document.getElementById('new-editable');
//     setTimeout(function () {
//       div.focus()
//     }, 0)
//   })

//   // on hit enter, 
//   .keyup(function (e) {
//     if (e.keyCode == 13) {
//       var val = $(this).text()
//       $(this)
//         // create a new li item
//         .before('<li class = "list-group-item">' + val + '</li>')
//         // set plus sign again
//         .html("+")
//         // make contenteditable to false, when clicked the process start again.
//         .attr('contenteditable', 'false')
//       e.preventDefault()
//     }
//   })

module.exports = {
  addHandlers
}
