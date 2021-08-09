const { authenticate } = require('@feathersjs/authentication').hooks
const {
  setUserId,
  limitToUser,
  updatedAt,
  createdAt,
  addTimer,
} = require('../../hooks')
const { protect } = require('@feathersjs/authentication-local').hooks
const search = require('feathers-mongodb-fuzzy-search')

module.exports = {
  before: {
    all: [
      search(),
      search({
        fields: ['name'],
      }),
    ],
    find: [],
    get: [],
    create: [authenticate('jwt'), setUserId, createdAt],
    update: [authenticate('jwt'), updatedAt],
    patch: [authenticate('jwt'), updatedAt, addTimer],
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
