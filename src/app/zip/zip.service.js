import { resolve } from 'path';
import { parsePathList } from '../utils/parse-path-list.js';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';

export class ZipService {
  init(stateService) {
    this.stateService = stateService;
  }

  get cwd() {
    return this.stateService.get('cwd');
  }

  compress(args) {
    return new Promise(async (res, rej) => {
      try {
        const [pathToFile, pathToDestination] = parsePathList(args);
        const srcFilePath = resolve(this.cwd, pathToFile);
        const destFilePath = resolve(this.cwd, pathToDestination);
        const brotli = createBrotliCompress();
        const readStream = createReadStream(srcFilePath);
        const writeStream = createWriteStream(destFilePath, { flags: 'wx' });

        brotli.on('error', () => rej(new Error('Operation failed')));
        readStream.on('error', () => rej(new Error('Operation failed')));
        writeStream.on('error', () => rej(new Error('Operation failed')));
        writeStream.on('close', res);
        readStream.pipe(brotli).pipe(writeStream);
      } catch {
        rej(new Error('Operation failed'));
      }
    });
  }

  decompress(args) {
    return new Promise(async (res, rej) => {
      try {
        const [pathToFile, pathToDestination] = parsePathList(args);
        const srcFilePath = resolve(this.cwd, pathToFile);
        const destFilePath = resolve(this.cwd, pathToDestination);
        const brotli = createBrotliDecompress();
        const readStream = createReadStream(srcFilePath);
        const writeStream = createWriteStream(destFilePath, { flags: 'wx' });

        brotli.on('error', () => rej(new Error('Operation failed')));
        readStream.on('error', () => rej(new Error('Operation failed')));
        writeStream.on('error', () => rej(new Error('Operation failed')));
        writeStream.on('close', res);
        readStream.pipe(brotli).pipe(writeStream);
      } catch {
        throw new Error('Operation failed');
      }
    });
  }
}
