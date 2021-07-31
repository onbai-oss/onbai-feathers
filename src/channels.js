module.exports = function (app) {
  if (typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return
  }

  app.on('connection', (connection) => {
    //
  })

  /**
   * Trigger when app auth call
   */
  app.on('login', (authResult, { connection }) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      // Obtain the logged in user from the connection
      // const user = connection.user;
      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection)
    }
  })

  app.on('logout', (payload, { connection }) => {
    // handle logout
    if (connection) {
      app.channel('authenticated').leave(connection)
    }
  })

  app.publish((data, hook) => {
    console.log(data, hook)
    // e.g. to publish all service events to all authenticated users use
    return app.channel('authenticated')
  })
} // end of file channel.js
