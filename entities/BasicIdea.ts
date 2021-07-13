export class BasicIdea {
  public id?: number;
  public title: string;
  public description: string;

  constructor ({ title, description }: { title: string, description: string }) {
    this.title = title;
    this.description = description;
  }
}
