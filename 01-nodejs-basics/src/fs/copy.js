import { relative, resolve } from 'path';
import { mkdir } from 'fs/promises';
import { getDirname } from '../helpers/get-dirname.js';
import { getFilePaths } from '../helpers/get-filepaths.js';
import { cloneFile } from '../helpers/clone-file.js';
import { getFulfilled } from '../helpers/get-fulfilled.js';
import { handleError } from '../helpers/handle-error.js';

const copy = async () => {
  const TASK_OBJECTIVE = {
    source: {
      dirName: 'files',
    },
    destination: {
      dirName: 'files_copy',
    },
    errors: {
      fileExists: { code: 'EEXIST', message: 'FS operation failed' },
      doesNotExists: { code: 'ENOENT', message: 'FS operation failed' },
    },
  };

  const __dirname = getDirname(import.meta.url);

  const srcDirPath = resolve(__dirname, TASK_OBJECTIVE.source.dirName);
  const destDirPath = resolve(__dirname, TASK_OBJECTIVE.destination.dirName);

  const filePaths = await getFilePaths(srcDirPath).catch((error) => {
    return handleError(error, TASK_OBJECTIVE.errors.doesNotExists);
  });

  await mkdir(destDirPath).catch((error) => {
    return handleError(error, TASK_OBJECTIVE.errors.fileExists);
  });

  const copyPromises = filePaths.map((filePath) => {
    const relativePath = relative(srcDirPath, filePath);
    return cloneFile(filePath, resolve(destDirPath, relativePath));
  });

  return await getFulfilled(copyPromises);
};

await copy();
