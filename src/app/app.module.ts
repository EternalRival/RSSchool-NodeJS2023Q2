import { AppProperties } from './app-properties.interface';
import { AppController } from './app.controller';

export class App {
  appController: AppController;

  constructor(props: AppProperties) {
    this.appController = new AppController(props);
  }

  run(): void {
    this.appController.createServer();
  }
}
