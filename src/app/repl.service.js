import { createInterface } from 'readline';

export class ReplService {
  #rl;

  constructor({ exit, input, output, prompt }) {
    this.#rl = createInterface({ input, output, prompt });
    this.exit = exit;
  }

  init({ helloMessage, exitMessage, handleInput }) {
    this.#rl.on('close', () => {
      console.log(exitMessage);
      this.exit();
    });
    this.#rl.on('line', (line) => {
      handleInput(line);
      this.#rl.prompt();
    });

    console.log(helloMessage);
    this.#rl.prompt();
  }

  close() {
    this.#rl.close();
  }
}
