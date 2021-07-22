const { Service } = require('feathers-mongodb')

exports.Collection = class Collection extends Service {
  constructor(options, app) {
    super(options)

    app.get('mongoClient').then((db) => {
      this.Model = db.collection('collection')
    })
  }
}
