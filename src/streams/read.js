import { resolve } from 'path';
import { createReadStream } from 'fs';
import { getDirname } from '../helpers/get-dirname.js';

const read = async () => {
  const TASK_OBJECTIVE = {
    source: {
      dirName: 'files',
      fileName: 'fileToRead.txt',
    },
  };

  const __dirname = getDirname(import.meta.url);

  const filePath = resolve(__dirname, TASK_OBJECTIVE.source.dirName, TASK_OBJECTIVE.source.fileName);
  const readStream = createReadStream(filePath, { encoding: 'utf-8' });

  readStream.pipe(process.stdout);
};

await read();
