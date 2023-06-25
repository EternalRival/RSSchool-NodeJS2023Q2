import { createReadStream, createWriteStream } from 'fs';
import { rename, rm, stat } from 'fs/promises';
import { basename, dirname, resolve } from 'path';
import { parsePathList } from '../utils/parse-path-list.js';

export class FilesService {
  init(stateService) {
    this.stateService = stateService;
  }

  get cwd() {
    return this.stateService.get('cwd');
  }

  concatenate(args) {
    return new Promise((res, rej) => {
      const [pathToFile] = parsePathList(args);
      const filePath = resolve(this.cwd, pathToFile);
      const readStream = createReadStream(filePath);
      readStream.on('end', res);
      readStream.on('error', () => rej(new Error('Operation failed')));
      readStream.pipe(process.stdout);
    });
  }

  addFile(args) {
    return new Promise((res, rej) => {
      const [newFileName] = parsePathList(args);
      const filePath = resolve(this.cwd, newFileName);
      const writeStream = createWriteStream(filePath, { flags: 'wx' });
      writeStream.on('close', res);
      writeStream.on('error', () => rej(new Error('Operation failed')));
      writeStream.close();
    });
  }

  async renameFile(args) {
    try {
      const [pathToFile, newFileName] = parsePathList(args);
      const srcFilePath = resolve(this.cwd, pathToFile);
      const srcFileStats = await stat(srcFilePath);
      const newFilePath = resolve(dirname(srcFilePath), newFileName);
      if (srcFileStats.isFile()) return await rename(srcFilePath, newFilePath);
      throw new Error('Operation failed');
    } catch {
      throw new Error('Operation failed');
    }
  }

  copyFile(args) {
    return new Promise(async (res, rej) => {
      try {
        const [pathToFile, pathToNewDirectory] = parsePathList(args);
        const srcFilePath = resolve(this.cwd, pathToFile);
        const destDirPath = resolve(this.cwd, pathToNewDirectory);
        const srcFileStats = await stat(srcFilePath);
        const destDirStats = await stat(destDirPath);
        if (!(srcFileStats.isFile() && destDirStats.isDirectory())) rej(new Error('Operation failed'));
        const readStream = createReadStream(srcFilePath);
        const writeStream = createWriteStream(resolve(destDirPath, basename(srcFilePath)), { flags: 'wx' });

        readStream.on('error', () => rej(new Error('Operation failed')));
        writeStream.on('error', () => rej(new Error('Operation failed')));
        writeStream.on('close', res);

        readStream.pipe(writeStream);
      } catch {
        rej(new Error('Operation failed'));
      }
    });
  }

  async moveFile(args) {
    try {
      await this.copyFile(args);
      await this.removeFile(args);
    } catch {
      throw new Error('Operation failed');
    }
  }

  async removeFile(args) {
    const [pathToFile] = parsePathList(args);
    const filePath = resolve(this.cwd, pathToFile);
    try {
      return await rm(filePath);
    } catch {
      throw new Error('Operation failed');
    }
  }
}
