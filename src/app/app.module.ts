import { AppProperties } from './interfaces/app-properties.interface';
import { AppController } from './app.controller';

export class App {
  private appController: AppController;

  constructor(props: AppProperties) {
    this.appController = new AppController(props);
  }

  public run(): void {
    this.appController.createServer();
  }
}
