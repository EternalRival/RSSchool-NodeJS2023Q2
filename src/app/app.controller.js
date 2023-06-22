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
    const username = stateService.get('username') ?? 'Username';

    const echo = (...args) => console.log(colorize('yellow', args.join(' ')));
    const commands = new Map([
      ['.exit', () => replService.close()],
      ['echo', echo],
      ['kek', () => echo('someone keked!')],
      ['cwd', () => echo(stateService.get('cwd'))],
    ]);

    const handleInput = (input) => {
      if (!input) return;
      const [command, ...args] = input.split(' ');
      const handler = commands.get(command);
      if (handler) handler(...args);
      else console.error(colorize('red', 'Invalid input'));
    };
    const helloMessage = this.buildMessage(`Welcome to the File Manager, ${username}!`, username);
    const exitMessage = this.buildMessage(`${EOL}Thank you for using File Manager, ${username}, goodbye!`, username);
    replService.init({ process, handleInput, helloMessage, exitMessage });
  }

  buildMessage(message, username) {
    const [cyan, green] = [colorize('cyan'), colorize('green')];
    return message.split(username).map(cyan).join(green(username));
  }
}
