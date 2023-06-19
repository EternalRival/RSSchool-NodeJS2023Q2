import { resolve } from 'path';
import { writeFile } from 'fs/promises';
import { handleError } from '../helpers/handle-error.js';
import { getDirname } from '../helpers/get-dirname.js';

const create = async () => {
  const TASK_OBJECTIVE = {
    destination: {
      dirName: 'files',
      fileName: 'fresh.txt',
      fileContent: 'I am fresh and young',
    },
    errors: {
      fileExists: { code: 'EEXIST', message: 'FS operation failed' },
    },
  };

  const __dirname = getDirname(import.meta.url);

  return writeFile(
    resolve(__dirname, TASK_OBJECTIVE.destination.dirName, TASK_OBJECTIVE.destination.fileName),
    TASK_OBJECTIVE.destination.fileContent,
    { flag: 'wx' },
  ).catch((error) => {
    return handleError(error, TASK_OBJECTIVE.errors.fileExists);
  });
};

await create();
