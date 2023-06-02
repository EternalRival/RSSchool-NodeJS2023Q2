import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';

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

  const helpers = {
    __dirname: dirname(fileURLToPath(import.meta.url)),
  };

  const { source, destination } = TASK_OBJECTIVE;
  const srcFilePath = resolve(helpers.__dirname, source.dirName, source.fileName);
  const destFilePath = resolve(helpers.__dirname, destination.dirName, destination.fileName);

  const gzip = createGzip();
  const readStream = createReadStream(srcFilePath);
  const writeStream = createWriteStream(destFilePath);

  readStream.pipe(gzip).pipe(writeStream);
};

await compress();
