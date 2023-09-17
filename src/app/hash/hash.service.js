import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { resolve } from 'path';
import { parsePathList } from '../utils/parse-path-list.js';

export class HashService {
  init(stateService) {
    this.stateService = stateService;
  }

  get cwd() {
    return this.stateService.get('cwd');
  }

  hash(args) {
    return new Promise((res, rej) => {
      const hash = createHash('sha256');
      const [pathToFile] = parsePathList(args);
      const filePath = resolve(this.cwd, pathToFile);
      const readStream = createReadStream(filePath);

      readStream.on('error', () => rej(new Error('Operation failed')));
      readStream.on('data', (chunk) => hash.update(chunk));
      readStream.on('end', () => {
        console.log(hash.digest('hex'));
        res();
      });
    });
  }
}
