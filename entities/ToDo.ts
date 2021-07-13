import { BasicIdea } from './BasicIdea';

export class ToDo extends BasicIdea {
  public done: boolean;

  constructor ({ title, description, done }: { title: string, description: string, done: boolean }) {
    super({ title, description });
    this.done = done;
  }
}