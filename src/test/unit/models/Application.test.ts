import { Application } from '../../../models/Application';

describe('Application Model', () => {
  it('should construct Application instance successfully', () => {
    const app = new Application('1', 'Test App', 'test-app');

    expect(app.id).toEqual('1');
    expect(app.title).toEqual('Test App');
    expect(app.route).toEqual('test-app');
  });

  it('should throw error if id is missing', () => {
    expect(() => {
      new Application('', 'Test App', 'test-app');
    }).toThrow('Application must have an id.');
  });

  it('should throw error if title is missing', () => {
    expect(() => {
      new Application('1', '', 'test-app');
    }).toThrow('Application must have a title.');
  });

  it('should throw error if route is missing', () => {
    expect(() => {
      new Application('1', 'Test App', '');
    }).toThrow('Application must have a route.');
  });

  it('should throw error if route contains invalid characters', () => {
    expect(() => {
      Application.generateRoute('test$app');
    }).toThrow('The route contains invalid characters.');
  });

  test('should generate correct route format', () => {
    const invalidRoute = "some invalid characters route";
    
    expect(() => {
      Application.generateRoute(invalidRoute);
    }).toThrow("The route contains invalid characters.");
  });
});
