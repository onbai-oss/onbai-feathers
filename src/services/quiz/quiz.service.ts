// Initializes the `quiz` service on path `/quiz`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Quiz } from './quiz.class';
import createModel from '../../models/quiz.model';
import hooks from './quiz.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    quiz: Quiz & ServiceAddons<any> & any;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/quiz', new Quiz(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('quiz');

  service.hooks(hooks);
}
