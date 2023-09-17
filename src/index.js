import { AppController } from './app/app.controller.js';
import { FilesService } from './app/files/files.service.js';
import { HashService } from './app/hash/hash.service.js';
import { NavigationService } from './app/navigation/navigation.service.js';
import { OSService } from './app/os/os.service.js';
import { ReplService } from './app/repl/repl.service.js';
import { StateService } from './app/state/state.service.js';
import { ZipService } from './app/zip/zip.service.js';

import { App } from './app/app.module.js';

const app = new App(process, AppController, {
  FilesService,
  HashService,
  NavigationService,
  OSService,
  ReplService,
  StateService,
  ZipService,
});
app.run();
