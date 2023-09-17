import { EOL, arch, cpus, homedir, userInfo } from 'os';
import { parseArgs } from '../utils/parse-args.js';

export class OSService {
  commands = new Map([
    ['--EOL', () => this.eol()],
    ['--cpus', () => this.cpus()],
    ['--homedir', () => this.homedir()],
    ['--username', () => this.username()],
    ['--architecture', () => this.architecture()],
  ]);

  os(args) {
    parseArgs(args).forEach((arg) => {
      const callback = this.commands.get(arg);
      if (callback) callback();
    });
  }

  eol() {
    console.log(`Default system EOL: ${JSON.stringify(EOL)}`);
  }

  cpus() {
    const cpuList = cpus().map((cpu) => ({
      'Model': cpu.model.trim(),
      'Clock rate (GHz)': cpu.speed / 1000,
    }));
    console.log(`Overall amount of CPUS: ${cpuList.length}`);
    console.table(cpuList);
  }

  homedir() {
    console.log(`Home directory: ${homedir()}`);
  }

  username() {
    console.log(`System User Name: ${userInfo().username}`);
  }

  architecture() {
    console.log(`CPU architecture: ${arch()}`);
  }
}
