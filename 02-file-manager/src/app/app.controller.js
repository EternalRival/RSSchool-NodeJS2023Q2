import { colorize } from './utils/colorize.js';
import { EOL } from 'os';

export class AppController {
  constructor(process, stateService, services) {
    const { replService, filesService, hashService, navigationService, osService, zipService } = services;

    [navigationService, filesService, hashService, zipService].forEach((service) => service.init(stateService));

    /** @type { Map<string, (args?: string) => void|Promise<void>> } */
    const commands = new Map([
      ['.exit', () => replService.close()],
      ['up', () => navigationService.upperDir()],
      ['cd', (args) => navigationService.changeDir(args)],
      ['ls', () => navigationService.list()],
      ['cat', (args) => filesService.concatenate(args)],
      ['add', (args) => filesService.addFile(args)],
      ['rn', (args) => filesService.renameFile(args)],
      ['cp', (args) => filesService.copyFile(args)],
      ['mv', (args) => filesService.moveFile(args)],
      ['rm', (args) => filesService.removeFile(args)],
      ['os', (args) => osService.os(args)],
      ['hash', (args) => hashService.hash(args)],
      ['compress', (args) => zipService.compress(args)],
      ['decompress', (args) => zipService.decompress(args)],
    ]);

    const username = stateService.get('username') ?? 'Username';
    const getCurrentCwd = () => this.buildMessage(`${EOL}You are currently in ${navigationService.cwd}`);
    const handleInput = async (input) => {
      const trimmedInput = input.trim();
      if (!trimmedInput) return;
      const [command, ...args] = trimmedInput.split(' ');
      const handler = commands.get(command);
      try {
        if (handler) await handler(args.join(' ').trim());
        else throw new Error('Invalid input');
      } catch (error) {
        console.error(colorize('red', error.message));
      }
      console.log(getCurrentCwd());
    };
    const exitMessage = this.buildMessage(`${EOL}Thank you for using File Manager, ${username}, goodbye!`, username);
    let helloMessage = this.buildMessage(`Welcome to the File Manager, ${username}!`, username);
    helloMessage += `${EOL}${getCurrentCwd()}`;
    replService.init({ process, handleInput, helloMessage, exitMessage });
  }

  buildMessage(message, username) {
    const [cyan, green] = [colorize('cyan'), colorize('green')];
    return message.split(username).map(cyan).join(green(username));
  }
}
