import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import fs, { access } from 'fs/promises';

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

  const helpers = {
    __dirname: dirname(fileURLToPath(import.meta.url)),
    handleError(error, objectiveError) {
      if (error.code === objectiveError?.code) Object.assign(error, objectiveError);
      throw error;
    },
  };

  const { source, destination, errors } = TASK_OBJECTIVE;
  const srcFilePath = resolve(helpers.__dirname, source.dirName, source.fileName);
  const destFilePath = resolve(helpers.__dirname, destination.dirName, destination.fileName);

  const isDestFileExists = await access(destFilePath)
    .then(() => true)
    .catch(() => false);

  if (isDestFileExists) {
    throw Object.assign(new Error(), errors.fileExists);
  }

  return fs.rename(srcFilePath, destFilePath).catch((error) => {
    return helpers.handleError(error, errors.doesNotExists);
  });
};

await rename();
