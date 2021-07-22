const { Service } = require('feathers-mongodb')

exports.Question = class Question extends Service {
  constructor(options, app) {
    super(options)

    app.get('mongoClient').then((db) => {
      this.Model = db.collection('question')
    })
  }
}
