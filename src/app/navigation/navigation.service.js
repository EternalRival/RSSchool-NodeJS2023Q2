import { statfs, stat } from 'fs/promises';
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
    } catch (error) {
      throw new Error('Operation failed');
    }
  }
}
