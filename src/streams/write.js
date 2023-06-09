import { resolve } from 'path';
import { createWriteStream } from 'fs';
import { getDirname } from '../helpers/get-dirname.js';

const write = async () => {
  const TASK_OBJECTIVE = {
    destination: {
      dirName: 'files',
      fileName: 'fileToWrite.txt',
    },
  };
  const __dirname = getDirname(import.meta.url);

  const filePath = resolve(__dirname, TASK_OBJECTIVE.destination.dirName, TASK_OBJECTIVE.destination.fileName);
  const writeStream = createWriteStream(filePath, { encoding: 'utf-8' });

  process.stdin.pipe(writeStream);
};

await write();
