const { Service } = require('feathers-mongodb');

exports.Room = class Room extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('room');
    });
  }
};
