// Initializes the `collection` service on path `/collection`
const { Collection } = require('./collection.class')
const hooks = require('./collection.hooks')

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate'),
    id: 'id',
    disableObjectify: true,
  }

  // Initialize our service with any options it requires
  app.use('/collection', new Collection(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('collection')

  service.hooks(hooks)
}
