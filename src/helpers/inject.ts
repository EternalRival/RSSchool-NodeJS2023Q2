export function inject(obj: object, props: object) {
  Object.entries(props).forEach((prop) => {
    if (prop[1]) Object.assign(obj, prop);
  });
}
