const { authenticate } = require('@feathersjs/authentication').hooks
const { setUserId, limitToUser, createdAt, updatedAt } = require('../../hooks')
const { protect } = require('@feathersjs/authentication-local').hooks
const search = require('feathers-mongodb-fuzzy-search')

module.exports = {
  before: {
    all: [
      search(),
      search({
        fields: ['question'],
      }),
    ],
    find: [],
    get: [],
    create: [authenticate('jwt'), setUserId, createdAt],
    update: [authenticate('jwt'), limitToUser, updatedAt],
    patch: [authenticate('jwt'), limitToUser, updatedAt],
    remove: [authenticate('jwt'), limitToUser],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [protect('_id')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
}
