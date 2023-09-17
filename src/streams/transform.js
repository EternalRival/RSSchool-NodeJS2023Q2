import { Transform } from 'stream';
import { EOL } from 'os';

const transform = async () => {
  const transformStream = new Transform({
    transform: (chunk, _, callback) => callback(null, [...`${chunk}`.slice(0, -1)].reverse().join('') + EOL),
  });

  process.stdin.pipe(transformStream).pipe(process.stdout);
};

await transform();
