export class ZipService {
  init(stateService) {
    this.stateService = stateService;
  }
  set cwd(path) {
    this.stateService.set('cwd', path);
  }
  get cwd() {
    return this.stateService.get('cwd');
  }
  compress(args) {
    throw new Error('Not implemented');
  }
  decompress(args) {
    throw new Error('Not implemented');
  }
}
