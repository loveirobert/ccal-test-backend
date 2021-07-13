import type { BasicIdea } from '../entities/BasicIdea';
import type { ToDo } from '../entities/ToDo';
import type { Concept } from '../entities/Concept';

export type BasicIdeaNotificationType = Omit<BasicIdea, 'id' | 'description'>;
export type ToDoNotificationType = Omit<ToDo, 'id' | 'description' | 'title'>;
export type ConceptNotificationType = Omit<Concept, 'id' | 'description' | 'title' | 'done'>;
