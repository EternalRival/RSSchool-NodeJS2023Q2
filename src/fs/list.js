import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { readdir } from 'fs/promises';

const list = async () => {
  const TASK_OBJECTIVE = {
    source: {
      dirName: 'files',
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

  const dirPath = resolve(helpers.__dirname, TASK_OBJECTIVE.source.dirName);
  const dirents = await readdir(dirPath, { withFileTypes: true }).catch((error) => {
    return helpers.handleError(error, TASK_OBJECTIVE.errors.doesNotExists);
  });

  const getFileNames = (fileList, { filter = 'all', print = true } = { filter: 'all', print: true }) => {
    const dict = {
      all: () => fileList,
      directories: () => fileList.filter((file) => file.isDirectory()),
      files: () => fileList.filter((file) => file.isFile()),
    };
    const result = (dict[filter] ?? dict.all)().map(({ name }) => name);
    if (print) console.log(result);
    return result;
  };

  return getFileNames(dirents, { filter: 'all', print: true });
};

await list();
