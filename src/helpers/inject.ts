export function inject(obj: object, props: object): void {
  Object.entries(props).forEach((prop) => {
    if (prop[1]) {
      Object.assign(obj, prop);
    }
  });
}
