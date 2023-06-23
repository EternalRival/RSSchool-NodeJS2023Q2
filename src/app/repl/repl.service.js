import { createInterface } from 'readline';
import { colorize } from '../utils/colorize.js';

export class ReplService {
  #rl;

  init({ process, helloMessage, exitMessage, handleInput }) {
    const rl = createInterface({ input: process.stdin, output: process.stdout, prompt: colorize('purple', '> ') });
    rl.on('close', () => {
      console.log(exitMessage);
      process.exit();
    });
    rl.on('line', async (line) => {
      await handleInput(line);
      rl.prompt();
    });

    console.log(helloMessage);
    rl.prompt();

    this.#rl = rl;
  }

  close() {
    this.#rl.close();
  }
}
