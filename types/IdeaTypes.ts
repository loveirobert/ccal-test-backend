import { Types } from '../constants';
import type { BasicIdea } from '../entities/BasicIdea';
import type { ToDo } from '../entities/ToDo';
import type { Concept } from '../entities/Concept';

export type IdeaType<T extends Concept | ToDo | BasicIdea> = T extends Concept ? Concept : T extends ToDo ? ToDo : BasicIdea;

export type TypeNames = keyof typeof Types;

export type Ideas = Concept | ToDo | BasicIdea;
