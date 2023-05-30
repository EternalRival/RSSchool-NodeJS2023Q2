import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { rm } from 'fs/promises';

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

  const helpers = {
    __dirname: dirname(fileURLToPath(import.meta.url)),
    handleError(error, objectiveError) {
      if (error.code === objectiveError?.code) Object.assign(error, objectiveError);
      throw error;
    },
  };

  const filePath = resolve(helpers.__dirname, TASK_OBJECTIVE.source.dirName, TASK_OBJECTIVE.source.fileName);
  return rm(filePath).catch((error) => {
    return helpers.handleError(error, TASK_OBJECTIVE.errors.doesNotExists);
  });
};

await remove();
