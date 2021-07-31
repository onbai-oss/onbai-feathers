const { setField } = require('feathers-authentication-hooks')

module.exports.setUserId = setField({
  from: 'params.user.id',
  as: 'data.userId',
})
module.exports.limitToUser = setField({
  from: 'params.user.id',
  as: 'params.query.userId',
})

module.exports.setUserEmail = setField({
  from: 'params.user.email',
  as: 'data.userEmail',
})

module.exports.createdAt = async (context) => {
  context.data.createdAt = new Date()
  return context
}

module.exports.updatedAt = async (context) => {
  context.data.updatedAt = new Date()
  return context
}
