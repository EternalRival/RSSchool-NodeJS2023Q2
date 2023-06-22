import { parseProcessArgs } from './utils/parse-process-args.js';
import { homedir } from 'os';

export class App {
  constructor(
    process,
    AppController,
    { FilesService, HashService, NavigationService, OSService, ReplService, StateService, ZipService },
  ) {
    const args = parseProcessArgs(process);
    const username = args.get('username') ?? 'Username';

    this.stateService = new StateService();
    this.stateService.set('cwd', homedir());
    this.stateService.set('username', username);

    this.appController = new AppController(process, this.stateService, {
      replService: new ReplService(),
      filesService: new FilesService(),
      hashService: new HashService(),
      navigationService: new NavigationService(),
      osService: new OSService(),
      zipService: new ZipService(),
    });
  }

  run() {}
}
