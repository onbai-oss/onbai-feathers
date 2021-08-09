const dayjs = require('dayjs')
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
  context.data.createdAt = new Date().getTime()
  return context
}

module.exports.updatedAt = async (context) => {
  context.data.updatedAt = new Date().getTime()
  return context
}

module.exports.addTimer = async (ctx) => {
  console.log(ctx.data)
  if (
    [1, 2].includes(ctx.data?.game?.rule?.mode) &&
    ctx.data?.status === 1 &&
    !ctx.data?.game?.startTime
  ) {
    console.log('Set timer')
    ctx.data.game.startTime = dayjs().format()
    ctx.data.game.endTime = dayjs()
      .add(+ctx.data?.game?.rule?.time, 'm')
      .format()
  }
  return ctx
}
