import { dirname } from 'path';
import { copyFile, mkdir, stat } from 'fs/promises';

export async function cloneFile(srcPath, destPath) {
  await mkdir(dirname(destPath), { recursive: true });
  const stats = await stat(srcPath);
  return (stats.isFile() ? copyFile(srcPath, destPath) : mkdir(destPath, { recursive: true }))
    .then(() => `new file: ${destPath}`)
    .catch((e) => console.error(e.message));
}
