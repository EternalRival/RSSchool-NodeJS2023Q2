export function getFormattedDate(date: Date, options = { uncluttered: false }) {
  const sliced = date.toISOString().slice(2, 19);
  return options.uncluttered
    ? sliced.replace(/\D/g, '')
    : sliced.replace('T', ' ');
}
