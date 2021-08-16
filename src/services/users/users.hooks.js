const { authenticate } = require('@feathersjs/authentication').hooks
const { setField } = require('feathers-authentication-hooks')
const { hashPassword, protect } =
  require('@feathersjs/authentication-local').hooks
const search = require('feathers-mongodb-fuzzy-search')
const { customAlphabet } = require('nanoid')
const { updatedAt, createdAt } = require('../../hooks')

const addBasicInfo = async (context) => {
  if (context.data.strategy === 'local') {
    const id = customAlphabet('1234567890', 9)()
    context.data.image = `https://robohash.org/${id}.png?set=set4`
    context.data.name = `${context.data.email.split('@')[0]}`
  }
  return context
}

// TODO
const addSampleQuiz = async (context) => {
  return context
}

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
    create: [hashPassword('password'), addBasicInfo, addSampleQuiz, createdAt],
    update: [hashPassword('password'), authenticate('jwt'), updatedAt],
    patch: [hashPassword('password'), authenticate('jwt'), updatedAt],
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
