import { resolve } from 'path';
import { writeFile } from 'fs/promises';
import { createInterface } from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = createInterface({ input, output });

enum Design {
  default = 0,
  bold = 1,
  faint = 2,
  black = 30,
  red = 31,
  green = 32,
  yellow = 33,
  cyan = 36,
}

function getFramedLine(line: string): string {
  const width = line.length + 2;
  const top = `┌${'─'.repeat(width)}┐`;
  const mid = `│ ${line.trim()} │`;
  const bot = `└${'─'.repeat(width)}┘`;
  return `${top}\n${mid}\n${bot}`;
}

function colorize(str: string, ...params: (keyof typeof Design)[]): string {
  const designParams = params ?? [Design.default];
  const head = `\x1b[${designParams.map((param) => Design[param]).join(';')}m`;
  const tail = `\x1b[${Design.default}m`;
  return `${head}${str}${tail}`;
}

async function getString(
  question: string,
  defaultValue: string = '',
): Promise<string> {
  const coloredQuestion = colorize(question, 'cyan');
  const coloredDefaultValue = colorize(`(${defaultValue})`, 'black');
  const coloredPrompt = `${coloredQuestion}${coloredDefaultValue} = `;
  const answer = await rl.question(coloredPrompt);
  return answer || defaultValue;
}

async function getPort(
  question: string,
  defaultValue: string = '',
): Promise<number> {
  const answer: string = await getString(question, defaultValue);
  const int: number = parseInt(answer);

  if (int >= 0 && int <= 65535) {
    return int;
  }

  console.log(colorize('Invalid data', 'red'));
  return getPort(question);
}

async function getConfirm(): Promise<boolean> {
  const question =
    'This action will overwrite the current .env file if it exists. Confirm?';
  const defaults = '(y/N)';
  const answer = await rl.question(`${question} ${defaults}\n> `);
  const lowerCasedAnswer = answer.toLowerCase();
  const isPositive = ['yes', 'y'].includes(lowerCasedAnswer);
  const isNegative = ['', 'no', 'n'].includes(lowerCasedAnswer);

  if (isPositive || isNegative) {
    return isPositive;
  }

  console.log(colorize('Invalid answer', 'red'));
  return getConfirm();
}

async function saveDotEnv(data: Map<string, unknown>) {
  let envData = '';

  data.forEach((v, k) => {
    envData += `${k}=${v}\n`;
  });

  try {
    const envPath = resolve(__dirname, '.env');
    await writeFile(envPath, envData);
    console.log(colorize(`File saved: ${envPath}`, 'green'));
    console.log(colorize(`Good bye!\n`, 'cyan', 'bold'));
  } catch (error) {
    console.error(error.message);
  }
}

async function generateDotEnv(): Promise<void> {
  console.log(colorize(getFramedLine('Enter ENV variables'), 'green', 'bold'));

  const envVariables: Map<string, unknown> = new Map();
  envVariables.set('PORT', await getPort('PORT', '4000'));
  envVariables.set('PGHOST', await getString('PGHOST', 'localhost'));
  envVariables.set('PGPORT', await getPort('PGPORT', '5432'));
  envVariables.set('PGDATABASE', await getString('PGDATABASE', 'hls-db'));
  envVariables.set('PGUSER', await getString('PGUSER', 'hls-user'));
  envVariables.set('PGPASSWORD', await getString('PGPASSWORD', 'hls-password'));
  envVariables.set('NETWORK', await getString('NETWORK', 'hls-network'));

  console.log(colorize(getFramedLine('ATTENTION!'), 'yellow'));
  const confirmAnswer = await getConfirm();

  rl.close();

  if (!confirmAnswer) {
    console.log(colorize(`Operation successfully aborted!`, 'yellow', 'faint'));
    return;
  }

  await saveDotEnv(envVariables);
}

generateDotEnv();
