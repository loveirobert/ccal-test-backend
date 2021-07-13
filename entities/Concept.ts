import { BasicIdea } from "./BasicIdea";

export class Concept extends BasicIdea {
  public references?: Array<string>;
  public done?: boolean;

  constructor ({ title, description, done, references }: { title: string, description: string, done?: boolean, references?: Array<string> }) {
    super({ title, description });
    this.references = references;
    this.done = done;
  }
}
