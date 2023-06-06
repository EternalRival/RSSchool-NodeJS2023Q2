import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';

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

  const helpers = {
    __dirname: dirname(fileURLToPath(import.meta.url)),
  };

  const { source, destination } = TASK_OBJECTIVE;
  const srcFilePath = resolve(helpers.__dirname, source.dirName, source.fileName);
  const destFilePath = resolve(helpers.__dirname, destination.dirName, destination.fileName);

  const gunzip = createGunzip();
  const readStream = createReadStream(srcFilePath);
  const writeStream = createWriteStream(destFilePath);

  readStream.pipe(gunzip).pipe(writeStream);
};

await decompress();
