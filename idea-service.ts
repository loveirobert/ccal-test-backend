import { NotificationService } from './notification-service';
import type { UpdateIdeaType } from './types/UpdateIdeaType';
import { Ideas, TypeNames } from './types/IdeaTypes';
import { getInstanceType, shouldNotify } from './utils';
import { Actions } from './constants';

/* 
  Task 1. Define types for:
      - `BasicIdea`: Base type, contains `description` and `title` fields.
      - `ToDo`: Similar to `BasicIdea`, contains also `done` field.
      - `Concept`: Similar to `ToDo`, contains optional `done` and `references` fields, `references` is an array of URLs (strings).

  Use these types in other tasks, don't forget about `repository`. Please think of a way how we can easily distinguish idea types.
*/

export class IdeaService {
  // **** This can hold BasicIdea, ToDo and Concept
  private readonly repository: Array<Ideas> = []; // This should hold all types of ideas.

  constructor(private readonly notificationService: NotificationService) {}

  /*
    Task 2. Implement `create` method, it should accept all idea types and return the corresponding, concrete type. Use `repository` to store the input.
  */
 // **** Accepts BasicIdea, ToDo and Concept and can return the appropriate type
  async create<T extends Ideas>(idea: T): Promise<T> {
    // Using array index as id (delete could break it, but we don't implement that method in this test)
    idea.id = this.repository.length;
    this.repository.push(idea);
    this.notificationService.notify({
      action: Actions.create,
      idea,
    });
    return idea;
  }

  /* 
    Task 3. Implement `update` method, it should accept update for all idea types. Bonus points if it accepts partial update.
    
    Additionally, we must ensure that if `title` in `BasicIdea`, `done` in `ToDo` or `references` in `Concept` are changed we call the Notification service.
    
    Please bear in mind that in the future we may need to notify about other fields update as well.
    We need to ensure that we won't forget about any new fields added in the future.
    
    Use `repository` to store the update and `notificationService` to notify about the update.
  */
  // **** Accepts BasicIdea, ToDo and Concept and can return the appropriate type
  // **** Accepts also partial properties to update an entity
  async update<T extends Ideas>(update: Partial<T>): Promise<T> {
    // Using array index as id (delete could break it, but we don't implement that method in the test)
    const { id } = update;
    if (!Number.isInteger(id))
      throw new Error('Missing id. Can\'t perform update.');

    const propertiesToUpdate = (Object as UpdateIdeaType).keys(update);
    const ideaIndex = this.repository.findIndex(e => e.id === id);
    const toUpdate = this.repository[ideaIndex] as Partial<T>;

    if (!toUpdate)
      throw new Error(`Missing entity with id ${id}`);
      
    for (let propertyName of propertiesToUpdate) {   
      toUpdate[propertyName] = update[propertyName];
    }

    const instanceType = getInstanceType(toUpdate);
    const shouldFireNotification = shouldNotify(propertiesToUpdate, instanceType);

    if (shouldFireNotification)
      this.notificationService.notify({
        action: Actions.update,
        idea: toUpdate,
      });

    return toUpdate as T;
  }

  /*
    Task 4. Implement `getAllByType` method, it accepts idea type and returns an array of the corresponding, concrete types.

    Use `repository` to fetch ideas.
  */
  // **** Accepts multiple types and returns an array with a specific type
  getAllByType<T extends Ideas>(type: TypeNames): Array<T> {
    return this.repository.filter(instance => instance.constructor.name === type) as Array<T>;
  }
}

/*
  Task 5. Write unit tests for `IdeaService` class. For simplicity don't bother with `repository`.
*/

// **** Unit tests are in test.ts (use npm run test)