export function parseProcessArgs(process, prefix = '--') {
  const args = process.argv.slice(2);
  return args.reduce((acc, arg) => {
    if (!arg.startsWith(prefix)) return acc;
    const [key, value] = arg.slice(prefix.length).split('=');
    return acc.set(key, value);
  }, new Map());
}
