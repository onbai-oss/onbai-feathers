const { authenticate } = require('@feathersjs/authentication').hooks
const { setField } = require('feathers-authentication-hooks')

const { hashPassword, protect } =
  require('@feathersjs/authentication-local').hooks

module.exports = {
  before: {
    all: [],
    find: [
      authenticate('jwt'),
      setField({
        from: 'params.user.id',
        as: 'params.query.id',
      }),
    ],
    get: [
      authenticate('jwt'),
      setField({
        from: 'params.user.id',
        as: 'params.query.id',
      }),
    ],
    create: [hashPassword('password')],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [hashPassword('password'), authenticate('jwt')],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),
      protect('_id'),
    ],
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
