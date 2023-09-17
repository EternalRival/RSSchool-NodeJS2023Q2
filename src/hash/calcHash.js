import { resolve } from 'path';
import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { getDirname } from '../helpers/get-dirname.js';

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
  const __dirname = getDirname(import.meta.url);

  const hash = createHash('sha256');
  const filePath = resolve(__dirname, TASK_OBJECTIVE.source.dirName, TASK_OBJECTIVE.source.fileName);
  const readStream = createReadStream(filePath);

  readStream.on('data', (chunk) => hash.update(chunk));
  readStream.on('end', () => console.log(hash.digest('hex')));
};

await calculateHash();
