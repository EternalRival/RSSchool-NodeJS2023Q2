import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { resolve } from 'path';

export class HashService {
  init(stateService) {
    this.stateService = stateService;
  }
  set cwd(path) {
    this.stateService.set('cwd', path);
  }
  get cwd() {
    return this.stateService.get('cwd');
  }

  hash(args) {
    return new Promise((res, rej) => {
      const hash = createHash('sha256');
      const filePath = resolve(this.cwd, args);
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
