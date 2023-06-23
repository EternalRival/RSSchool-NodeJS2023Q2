import { readdir, stat } from 'fs/promises';
import { resolve } from 'path';
import { parsePathList } from '../utils/parse-path-list.js';

export class NavigationService {
  init(stateService) {
    this.stateService = stateService;
  }

  set cwd(path) {
    this.stateService.set('cwd', path);
  }
  get cwd() {
    return this.stateService.get('cwd');
  }

  upperDir() {
    return this.changeDir('..');
  }

  async changeDir(args) {
    const [relativePath] = parsePathList(args);
    const targetPath = resolve(this.cwd, relativePath);
    try {
      const stats = await stat(targetPath);
      if (stats.isDirectory()) this.cwd = targetPath;
      else throw new Error('Operation failed');
    } catch (error) {
      throw new Error('Operation failed');
    }
  }

  async list() {
    const dirents = await readdir(this.cwd, { withFileTypes: true });

    const list = dirents
      .map((dirent) => ({
        Name: dirent.name,
        Type: dirent.isFile()
          ? 'file'
          : dirent.isDirectory()
          ? 'directory'
          : dirent.isSymbolicLink()
          ? 'symbolic-link'
          : '',
      }))
      .sort((a, b) => a.Type.localeCompare(b.Type) || a.Name.localeCompare(b.Name));

    console.table(list);
  }
}
