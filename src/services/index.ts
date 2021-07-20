import { Application } from '../declarations'
import users from './users/users.service'
import collection from './collection/collection.service';
import question from './question/question.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users)
  app.configure(collection);
  app.configure(question);
}
