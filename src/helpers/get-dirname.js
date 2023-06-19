import { dirname } from 'path';
import { fileURLToPath } from 'url';

export function getDirname(url) {
  return dirname(fileURLToPath(url));
}
