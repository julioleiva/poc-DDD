export interface IApplication {
  id: string;
  title: string;
  description?: string;
  route?: string;
}

export class Application implements IApplication {
  id: string;
  title: string;
  description?: string;
  route: string;

  constructor(id: string, title: string, route: string, description?: string) {
    if (!id) {
      throw new Error("Application must have an id.");
    }

    if (!title) {
      throw new Error("Application must have a title.");
    }

    if (!route) {
      throw new Error("Application must have a route.");
    }

    this.id = id;
    this.title = title;
    this.route = Application.generateRoute(route);
    this.description = description;
  }

  static generateRoute(route: string): string {
    if (/[^a-zA-Z0-9-]/.test(route)) {
        throw new Error("The route contains invalid characters.");
    }

    return route.replace(/\s+/g, '-').toLowerCase();
}
}
