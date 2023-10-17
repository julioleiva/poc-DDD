
export const serviceFactory = {
    createAppService: (ServiceClass: new () => any) => {
      return new ServiceClass();
    },
  };