const firebase = require('firebase-admin')
const { OAuthStrategy } = require('@feathersjs/authentication-oauth')
const { NotAuthenticated } = require('@feathersjs/errors')

const logger = require('./logger')

function initialize() {
  const firebaseConfig = require('../firebase.json')

  try {
    firebase.initializeApp({
      credential: firebase.credential.cert(firebaseConfig),
    })
    console.log('Init firebase complete')
  } catch (e) {
    console.log('erorr initializing firebase', e)
  }
}

class FirebaseStrategy extends OAuthStrategy {
  constructor() {
    super()
    initialize()
  }
  async authenticate(authentication, params) {
    logger.debug('firebase:strategy:authenticate')
    console.log('firebase authenticate', authentication, params)
    return super.authenticate(authentication, params)
  }

  async getProfile(data, _params) {
    const firebase = require('firebase-admin')
    let user

    try {
      user = await firebase.auth().verifyIdToken(data.access_token)
      console.log('user', user)
    } catch (e) {
      logger.error(e)
      throw new NotAuthenticated()
    }

    logger.debug(`firebase:strategy:getProfile:successful ${user.user_id}`)

    return {
      email: user.email,
      id: user.user_id,
      name: user.name,
      image: user.picture,
      email_verified: user.email_verified,
    }
  }

  async getEntityData(profile) {
    const baseData = await super.getEntityData(profile)

    return {
      ...baseData,
      email: profile.email,
      name: profile.name,
      image: profile.image,
      email_verified: profile.email_verified,
    }
  }
}

module.exports = { FirebaseStrategy }
