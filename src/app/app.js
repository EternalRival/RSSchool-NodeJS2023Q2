import { CommandService } from './command.service.js';
import { ReplService } from './repl.service.js';
import { StateService } from './state.service.js';
import { colorize } from './utils/colorize.js';
import { parseProcessArgs } from './utils/parse-process-args.js';
import { EOL, homedir } from 'os';

export class App {
  #args;

  constructor(process) {
    this.#args = parseProcessArgs(process);

    this.stateService = new StateService();
    this.stateService.set('cwd', homedir());
    this.stateService.show();

    const { exit, stdin, stdout } = process;
    this.replService = new ReplService({ exit, input: stdin, output: stdout, prompt: colorize('purple', '> ') });
    this.commandService = new CommandService();
  }

  run() {
    console.log('Program starged with arguments:', this.#args);

    const username = this.#args.get('username') ?? 'Username';

    this.initReplService(username, (input) => {
      try {
        this.commandService.handle(input.trim());
      } catch (error) {
        console.error(colorize('red', error.message));
        this.commandService.handle();
      }
    });
    this.initCommandService(() => this.replService.close());
  }

  initReplService(username, handleInput) {
    const helloMessage = this.buildMessage(`Welcome to the File Manager, ${username}!`, username);
    const exitMessage = this.buildMessage(`${EOL}Thank you for using File Manager, ${username}, goodbye!`, username);
    this.replService.init({ helloMessage, exitMessage, handleInput });
  }

  initCommandService(close) {
    this.commandService.init(close);
  }

  buildMessage(message, username) {
    const [cyan, green] = [colorize('cyan'), colorize('green')];
    return message.split(username).map(cyan).join(green(username));
  }
}
