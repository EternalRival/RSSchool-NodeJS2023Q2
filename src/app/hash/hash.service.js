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
    throw new Error('Not implemented');
  }
}
