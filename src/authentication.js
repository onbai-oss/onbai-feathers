const {
  AuthenticationService,
  JWTStrategy,
} = require('@feathersjs/authentication')
const { LocalStrategy } = require('@feathersjs/authentication-local')
const {
  expressOauth,
  OAuthStrategy,
} = require('@feathersjs/authentication-oauth')
const { default: axios } = require('axios')

class GoogleStrategy extends OAuthStrategy {
  async getEntityData(profile) {
    console.log(profile)
    // this will set 'googleId'
    const baseData = await super.getEntityData(profile)

    // this will grab the picture and email address of the Google profile
    return {
      ...baseData,
      strategy: 'google',
      image: profile.picture,
      email: profile.email,
      name: profile.name,
    }
  }
}

class FacebookStrategy extends OAuthStrategy {
  async getProfile(authResult) {
    // This is the OAuth access token that can be used
    // for Facebook API requests as the Bearer token
    const accessToken = authResult.access_token
    console.log(accessToken)

    const { data } = await axios.get('https://graph.facebook.com/me', {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      params: {
        fields: 'id,name,email,picture.width(96).height(96)',
      },
    })
    return data
  }

  async getEntityData(profile) {
    // `profile` is the data returned by getProfile
    const baseData = await super.getEntityData(profile)

    return {
      ...baseData,
      strategy: 'facebook',
      name: profile.name,
      email: profile.email,
      image: profile?.picture?.data?.url,
    }
  }
}

module.exports = (app) => {
  const authentication = new AuthenticationService(app)

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new LocalStrategy())
  authentication.register('google', new GoogleStrategy())
  authentication.register('facebook', new FacebookStrategy())

  app.use('/authentication', authentication)
  app.configure(expressOauth())
}
