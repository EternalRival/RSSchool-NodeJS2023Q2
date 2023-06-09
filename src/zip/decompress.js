import { resolve } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { getDirname } from '../helpers/get-dirname.js';

const decompress = async () => {
  const TASK_OBJECTIVE = {
    source: {
      dirName: 'files',
      fileName: 'archive.gz',
    },
    destination: {
      dirName: 'files',
      fileName: 'fileToCompress.txt',
    },
  };

  const __dirname = getDirname(import.meta.url);

  const { source, destination } = TASK_OBJECTIVE;
  const srcFilePath = resolve(__dirname, source.dirName, source.fileName);
  const destFilePath = resolve(__dirname, destination.dirName, destination.fileName);

  const gunzip = createGunzip();
  const readStream = createReadStream(srcFilePath);
  const writeStream = createWriteStream(destFilePath);

  readStream.pipe(gunzip).pipe(writeStream);
};

await decompress();
