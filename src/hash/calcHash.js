import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';
import { createHash } from 'crypto';

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
  const helpers = {
    __dirname: dirname(fileURLToPath(import.meta.url)),
    handleError(error, objectiveError) {
      if (error.code === objectiveError?.code) Object.assign(error, objectiveError);
      throw error;
    },
  };

  const filePath = resolve(helpers.__dirname, TASK_OBJECTIVE.source.dirName, TASK_OBJECTIVE.source.fileName);
  const fileContent = await readFile(filePath, { encoding: 'utf-8' }).catch((error) => {
    return helpers.handleError(error, TASK_OBJECTIVE.errors.doesNotExists);
  });

  const hash = createHash('sha256').update(fileContent);
  const hex = hash.digest('hex');

  console.log(hex);
};

await calculateHash();
