export const validateMinLength = (str: string, length: number): boolean => {
  return str.length >= length;
};

export const validatePropertiesNotNull = (obj: Record<string, any>): boolean => {
  return Object.values(obj).every(value => value !== null && value !== undefined);
};

export const validateAppRoute = (route: string): boolean => {
  const routeRegex = /^[A-Za-z0-9_-]+$/;
  return routeRegex.test(route);
};

export const generateAppRouteFromTitle = (title: string): string => {
  return title
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-');
};
