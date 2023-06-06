import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { writeFile } from 'fs/promises';

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

  const helpers = {
    __dirname: dirname(fileURLToPath(import.meta.url)),
    handleError(error, objectiveError) {
      if (error.code === objectiveError?.code) Object.assign(error, objectiveError);
      throw error;
    },
  };

  return writeFile(
    resolve(helpers.__dirname, TASK_OBJECTIVE.destination.dirName, TASK_OBJECTIVE.destination.fileName),
    TASK_OBJECTIVE.destination.fileContent,
    { flag: 'wx' },
  ).catch((error) => {
    return helpers.handleError(error, TASK_OBJECTIVE.errors.fileExists);
  });
};

await create();
