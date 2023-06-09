import { resolve } from 'path';
import { readdir } from 'fs/promises';
import { handleError } from '../helpers/handle-error.js';
import { getDirname } from '../helpers/get-dirname.js';

const list = async () => {
  const TASK_OBJECTIVE = {
    source: {
      dirName: 'files',
    },
    errors: {
      doesNotExists: { code: 'ENOENT', message: 'FS operation failed' },
    },
  };

  const __dirname = getDirname(import.meta.url);

  const dirPath = resolve(__dirname, TASK_OBJECTIVE.source.dirName);
  const dirents = await readdir(dirPath, { withFileTypes: true }).catch((error) => {
    return handleError(error, TASK_OBJECTIVE.errors.doesNotExists);
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
