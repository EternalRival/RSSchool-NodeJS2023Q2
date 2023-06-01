import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createReadStream } from 'fs';

const read = async () => {
  const TASK_OBJECTIVE = {
    source: {
      dirName: 'files',
      fileName: 'fileToRead.txt',
    },
  };
  const helpers = {
    __dirname: dirname(fileURLToPath(import.meta.url)),
  };

  const filePath = resolve(helpers.__dirname, TASK_OBJECTIVE.source.dirName, TASK_OBJECTIVE.source.fileName);
  const readStream = createReadStream(filePath, { encoding: 'utf-8' });

  readStream.pipe(process.stdout);
};

await read();
