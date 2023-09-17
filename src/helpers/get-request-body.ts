import { IncomingMessage } from 'http';

export function getRequestBody(request: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const body: Buffer[] = [];
    request.on('data', (chunk: Buffer) => body.push(chunk));
    request.on('error', reject);
    request.on('end', () => {
      resolve(JSON.parse(Buffer.concat(body).toString()));
    });
  });
}
