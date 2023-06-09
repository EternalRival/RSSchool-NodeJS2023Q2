import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { createHash } from 'crypto';
import { getDirname } from '../helpers/get-dirname.js';
import { handleError } from '../helpers/handle-error.js';

const calculateHash = async () => {
  const TASK_OBJECTIVE = {
    source: {
      dirName: 'files',
      fileName: 'fileToCalculateHashFor.txt',
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

  const hash = createHash('sha256').update(fileContent);
  const hex = hash.digest('hex');

  console.log(hex);
};

await calculateHash();
