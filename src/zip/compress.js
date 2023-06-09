import { resolve } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { getDirname } from '../helpers/get-dirname.js';

const compress = async () => {
  const TASK_OBJECTIVE = {
    source: {
      dirName: 'files',
      fileName: 'fileToCompress.txt',
    },
    destination: {
      dirName: 'files',
      fileName: 'archive.gz',
    },
  };

  const __dirname = getDirname(import.meta.url);

  const { source, destination } = TASK_OBJECTIVE;
  const srcFilePath = resolve(__dirname, source.dirName, source.fileName);
  const destFilePath = resolve(__dirname, destination.dirName, destination.fileName);

  const gzip = createGzip();
  const readStream = createReadStream(srcFilePath);
  const writeStream = createWriteStream(destFilePath);

  readStream.pipe(gzip).pipe(writeStream);
};

await compress();
