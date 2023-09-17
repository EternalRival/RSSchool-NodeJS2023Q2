export async function getFulfilled(promises) {
  const settled = await Promise.allSettled(promises);
  const fulfilled = settled.filter(({ status }) => status === 'fulfilled');
  return fulfilled.map(({ value }) => value);
}
