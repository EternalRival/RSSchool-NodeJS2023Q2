import { resolve } from 'path';
import { rm } from 'fs/promises';
import { getDirname } from '../helpers/get-dirname.js';
import { handleError } from '../helpers/handle-error.js';

const remove = async () => {
  const TASK_OBJECTIVE = {
    source: {
      dirName: 'files',
      fileName: 'fileToRemove.txt',
    },
    errors: {
      doesNotExists: { code: 'ENOENT', message: 'FS operation failed' },
    },
  };

  const __dirname = getDirname(import.meta.url);

  const filePath = resolve(__dirname, TASK_OBJECTIVE.source.dirName, TASK_OBJECTIVE.source.fileName);
  return rm(filePath).catch((error) => {
    return handleError(error, TASK_OBJECTIVE.errors.doesNotExists);
  });
};

await remove();
