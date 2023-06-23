import { colorize } from './utils/colorize.js';
import { EOL } from 'os';

/*
* Navigation & working directory (nwd)
up
cd path_to_directory
ls

* Basic operation with files
cat
add
rn
cp
mv
rm

* Operating system info
os --EOL
os --cpus
os --homedir
os --username
os --archutecture

* Hash calculation
hash

* Compress and decompress operations
compress
decompress
*/

export class AppController {
  constructor(process, stateService, services) {
    const { replService, filesService, hashService, navigationService, osService, zipService } = services;

    navigationService.init(stateService);

    /** @type { (args: string[]) => void } */
    const echo = (args) => console.log(colorize('yellow', args.join(' ')));

    /** @type { Map<string, (args?: string[]) => void|Promise<void>> } */
    const commands = new Map([
      ['.exit', () => replService.close()],
      ['echo', echo],
      ['kek', () => echo(['someone keked!'])],
      ['cwd', () => echo(navigationService.cwd)],
      ['up', () => navigationService.upperDir()],
      ['cd', (args) => navigationService.changeDir(args.join(' '))],
      ['ls', () => echo('executed ls!')],
      ['cat', () => echo('executed cat!')],
      ['add', () => echo('executed add!')],
      ['rn', () => echo('executed rn!')],
      ['cp', () => echo('executed cp!')],
      ['mv', () => echo('executed mv!')],
      ['rm', () => echo('executed rm!')],
      ['os', () => echo('executed os!')],
      ['hash', () => echo('executed hash!')],
      ['compress', () => echo('executed compress!')],
      ['decompress', () => echo('executed decompress!')],
    ]);

    const username = stateService.get('username') ?? 'Username';
    const getCurrentCwd = () => this.buildMessage(`You are currently in ${navigationService.cwd}`);
    const handleInput = async (input) => {
      if (!input) return;
      const [command, ...args] = input.split(/\s+/);
      const handler = commands.get(command);
      try {
        if (handler) await handler(args);
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
