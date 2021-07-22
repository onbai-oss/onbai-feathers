// Initializes the `question` service on path `/question`
const { Question } = require('./question.class')
const hooks = require('./question.hooks')

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate'),
  }

  // Initialize our service with any options it requires
  app.use('/question', new Question(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('question')

  service.hooks(hooks)
}
