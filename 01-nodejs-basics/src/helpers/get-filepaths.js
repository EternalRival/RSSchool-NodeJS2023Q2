import { resolve } from 'path';
import { readdir } from 'fs/promises';
import { getFulfilled } from './get-fulfilled.js';

export async function getFilePaths(dirPath) {
  const dirents = await readdir(dirPath, { withFileTypes: true });
  const promises = dirents.map(async (file) => {
    const filePath = resolve(dirPath, file.name);
    return file.isDirectory() ? [filePath, ...(await this.getFilePaths(filePath))] : filePath;
  });
  return (await getFulfilled(promises)).flat();
}
