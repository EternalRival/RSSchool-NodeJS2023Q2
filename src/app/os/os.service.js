export class OSService {
  init(stateService) {
    this.stateService = stateService;
  }
  set cwd(path) {
    this.stateService.set('cwd', path);
  }
  get cwd() {
    return this.stateService.get('cwd');
  }
  eol() {
    throw new Error('Not implemented');
  }
  cpus() {
    throw new Error('Not implemented');
  }
  homedir() {
    throw new Error('Not implemented');
  }
  username() {
    throw new Error('Not implemented');
  }
  architecture() {
    throw new Error('Not implemented');
  }
}
