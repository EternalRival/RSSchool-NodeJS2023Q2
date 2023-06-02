import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream } from 'fs';

const write = async () => {
  const TASK_OBJECTIVE = {
    destination: {
      dirName: 'files',
      fileName: 'fileToWrite.txt',
    },
  };
  const helpers = {
    __dirname: dirname(fileURLToPath(import.meta.url)),
  };

  const filePath = resolve(helpers.__dirname, TASK_OBJECTIVE.destination.dirName, TASK_OBJECTIVE.destination.fileName);
  const writeStream = createWriteStream(filePath, { encoding: 'utf-8' });

  process.stdin.pipe(writeStream);
};

await write();
