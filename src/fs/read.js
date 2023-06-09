import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { getDirname } from '../helpers/get-dirname.js';
import { handleError } from '../helpers/handle-error.js';

const read = async () => {
  const TASK_OBJECTIVE = {
    source: {
      dirName: 'files',
      fileName: 'fileToRead.txt',
    },
    errors: {
      doesNotExists: { code: 'ENOENT', message: 'FS operation failed' },
    },
  };

  const __dirname = getDirname(import.meta.url);

  const filePath = resolve(__dirname, TASK_OBJECTIVE.source.dirName, TASK_OBJECTIVE.source.fileName);
  const fileContent = await readFile(filePath, { encoding: 'utf-8' }).catch((error) => {
    return handleError(error, TASK_OBJECTIVE.errors.doesNotExists);
  });

  console.log(fileContent);
  return fileContent;
};

await read();
