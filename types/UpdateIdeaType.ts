import type { BasicIdea } from '../entities/BasicIdea';
import type { ToDo } from '../entities/ToDo';
import type { Concept } from '../entities/Concept';

export type UpdateIdeaType = {
  keys<T extends Partial<Concept> | Partial<ToDo> | Partial<BasicIdea>>(object: T): (keyof T)[]
}
