// Initializes the `question` service on path `/question`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Question } from './question.class'
import createModel from '../../models/question.model'
import hooks from './question.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    question: Question & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  }

  // Initialize our service with any options it requires
  app.use('/question', new Question(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('question')

  service.hooks(hooks)
}
