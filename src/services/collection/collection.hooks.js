const { authenticate } = require('@feathersjs/authentication').hooks
const { setUserId, limitToUser, setUserEmail } = require('../../hooks')
const { protect } = require('@feathersjs/authentication-local').hooks
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), setUserId, setUserEmail],
    update: [authenticate('jwt'), limitToUser, setUserEmail],
    patch: [authenticate('jwt'), limitToUser],
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
