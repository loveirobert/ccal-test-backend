import type {
  BasicIdeaNotificationType,
  ToDoNotificationType,
  ConceptNotificationType,
} from './types/NotificationTypes';

export const Types = {
  BasicIdea: 'BasicIdea',
  ToDo: 'ToDo',
  Concept: 'Concept',
};

export const NotificationMap: { BasicIdea: BasicIdeaNotificationType, ToDo: ToDoNotificationType, Concept: ConceptNotificationType } = {
  BasicIdea: {
    title: 'title',
  },
  ToDo: {
    done: true,
  },
  Concept: {
    references: [''],
  },
};

export const Actions = {
  create: 'create',
  update: 'update',
};
