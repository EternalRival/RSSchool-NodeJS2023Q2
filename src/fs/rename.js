import { resolve } from 'path';
import fs, { access } from 'fs/promises';
import { getDirname } from '../helpers/get-dirname.js';
import { handleError } from '../helpers/handle-error.js';

const rename = async () => {
  const TASK_OBJECTIVE = {
    source: {
      dirName: 'files',
      fileName: 'wrongFilename.txt',
    },
    destination: {
      dirName: 'files',
      fileName: 'properFilename.md',
    },
    errors: {
      fileExists: { code: 'EEXIST', message: 'FS operation failed' },
      doesNotExists: { code: 'ENOENT', message: 'FS operation failed' },
    },
  };

  const __dirname = getDirname(import.meta.url);

  const { source, destination, errors } = TASK_OBJECTIVE;
  const srcFilePath = resolve(__dirname, source.dirName, source.fileName);
  const destFilePath = resolve(__dirname, destination.dirName, destination.fileName);

  const isDestFileExists = await access(destFilePath)
    .then(() => true)
    .catch(() => false);

  if (isDestFileExists) {
    throw Object.assign(new Error(), errors.fileExists);
  }

  return fs.rename(srcFilePath, destFilePath).catch((error) => {
    return handleError(error, errors.doesNotExists);
  });
};

await rename();
