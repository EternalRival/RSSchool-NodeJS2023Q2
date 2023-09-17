const parseEnv = () => {
  const TASK_OBJECTIVE = {
    envPrefix: 'RSS_',
  };

  const output = Object.entries(process.env)
    .filter(([key]) => key.startsWith(TASK_OBJECTIVE.envPrefix))
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');

  console.log(output);
  return output;
};

parseEnv();
