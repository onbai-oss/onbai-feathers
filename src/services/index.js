const users = require('./users/users.service.js')
const collection = require('./collection/collection.service.js')
const question = require('./question/question.service.js')
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users)
  app.configure(collection)
  app.configure(question)
}
