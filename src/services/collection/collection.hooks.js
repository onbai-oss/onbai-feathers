const { authenticate } = require('@feathersjs/authentication').hooks
const { setUserId, limitToUser, updatedAt, createdAt } = require('../../hooks')
const { protect } = require('@feathersjs/authentication-local').hooks
const search = require('feathers-mongodb-fuzzy-search')

module.exports = {
  before: {
    all: [
      search(),
      search({
        fields: ['title'],
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
    all: [protect('_id')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
}
