import { dirname, relative, resolve } from 'path';
import { fileURLToPath } from 'url';
import { copyFile, mkdir, readdir, stat } from 'fs/promises';

const copy = async () => {
  const TASK_OBJECTIVE = {
    source: {
      dirName: 'files',
    },
    destination: {
      dirName: 'files_copy',
    },
    errors: {
      fileExists: { code: 'EEXIST', message: 'FS operation failed' },
      doesNotExists: { code: 'ENOENT', message: 'FS operation failed' },
    },
  };

  const helpers = {
    __dirname: dirname(fileURLToPath(import.meta.url)),
    handleError(error, objectiveError) {
      if (error.code === objectiveError?.code) Object.assign(error, objectiveError);
      throw error;
    },
    async getFullfilled(promises) {
      const settled = await Promise.allSettled(promises);
      const fulfilled = settled.filter(({ status }) => status === 'fulfilled');
      return fulfilled.map(({ value }) => value);
    },
    async getFilePaths(dirPath) {
      const dirents = await readdir(dirPath, { withFileTypes: true });
      const promises = dirents.map(async (file) => {
        const filePath = resolve(dirPath, file.name);
        return file.isDirectory() ? [filePath, ...(await this.getFilePaths(filePath))] : filePath;
      });
      return (await helpers.getFullfilled(promises)).flat();
    },
    async cloneFile(srcPath, destPath) {
      await mkdir(dirname(destPath), { recursive: true });
      const stats = await stat(srcPath);
      return (stats.isFile() ? copyFile(srcPath, destPath) : mkdir(destPath, { recursive: true }))
        .then(() => `new file: ${destPath}`)
        .catch((e) => console.error(e.message));
    },
  };

  const srcDirPath = resolve(helpers.__dirname, TASK_OBJECTIVE.source.dirName);
  const destDirPath = resolve(helpers.__dirname, TASK_OBJECTIVE.destination.dirName);

  const filePaths = await helpers.getFilePaths(srcDirPath).catch((error) => {
    return helpers.handleError(error, TASK_OBJECTIVE.errors.doesNotExists);
  });

  await mkdir(destDirPath).catch((error) => {
    return helpers.handleError(error, TASK_OBJECTIVE.errors.fileExists);
  });

  const copyPromises = filePaths.map((filePath) => {
    const relativePath = relative(srcDirPath, filePath);
    return helpers.cloneFile(filePath, resolve(destDirPath, relativePath));
  });

  return await helpers.getFullfilled(copyPromises);
};

await copy();
