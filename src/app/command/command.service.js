import { colorize } from '../utils/colorize.js';

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

export class CommandService {
  #exit = null;

  init(exit) {
    this.#exit = exit;
  }

  handle(input) {
    if (!input) return;
    const [command, ...args] = input.split(' ');
    const handler = this.#commands.get(command);
    if (handler) handler(...args);
    else throw new Error('Invalid input');
  }

  #commands = new Map([
    ['echo', (...args) => console.log(colorize('yellow', args.join(' ')))],
    ['kek', () => this.handle('echo someone keked!')],
    ['.exit', () => this.#exit()],
  ]);
}
