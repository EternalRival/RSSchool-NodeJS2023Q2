const parseArgs = () => {
  const TASK_OBJECTIVE = {
    argPrefix: '--',
  };

  const output = process.argv
    .slice(2)
    .reduce((acc, arg) => {
      if (arg.startsWith(TASK_OBJECTIVE.argPrefix)) {
        acc.push([arg.slice(TASK_OBJECTIVE.argPrefix.length)]);
      } else {
        acc.at(-1)?.push(arg);
      }
      return acc;
    }, [])
    .map(([key, value]) => `${key} is ${value}`)
    .join(', ');

  console.log(output);
  return output;
};

parseArgs();
