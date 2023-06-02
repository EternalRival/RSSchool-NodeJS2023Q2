import { Transform } from 'stream';
import { EOL } from 'os';

const transform = async () => {
  const transformStream = new Transform({
    transform: (chunk, _, callback) => callback(null, `${chunk.reverse().slice(1)}${EOL}`),
  });

  process.stdin.pipe(transformStream).pipe(process.stdout);
};

await transform();
