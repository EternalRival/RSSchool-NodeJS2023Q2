import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const spawnChildProcess = async (args) => {
  const TASK_OBJECTIVE = {
    source: {
      dirName: 'files',
      fileName: 'script.js',
    },
  };

  const helpers = {
    __dirname: dirname(fileURLToPath(import.meta.url)),
  };

  const filePath = resolve(helpers.__dirname, TASK_OBJECTIVE.source.dirName, TASK_OBJECTIVE.source.fileName);

  spawn(process.execPath, [filePath, ...(args ?? [])], { stdio: 'inherit' });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(/* [someArgument1, someArgument2, ...] */);
