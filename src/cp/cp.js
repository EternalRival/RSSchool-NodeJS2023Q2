import { resolve } from 'path';
import { spawn } from 'child_process';
import { getDirname } from '../helpers/get-dirname.js';

const spawnChildProcess = async (args) => {
  const TASK_OBJECTIVE = {
    source: {
      dirName: 'files',
      fileName: 'script.js',
    },
  };

  const __dirname = getDirname(import.meta.url);

  const filePath = resolve(__dirname, TASK_OBJECTIVE.source.dirName, TASK_OBJECTIVE.source.fileName);

  spawn(process.execPath, [filePath, ...(args ?? [])], { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(/* [someArgument1, someArgument2, ...] */);
