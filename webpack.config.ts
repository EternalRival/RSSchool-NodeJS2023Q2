import { resolve } from 'path';
import ESLintPlugin from 'eslint-webpack-plugin';

export default {
  mode: 'production',
  entry: resolve(__dirname, 'src', 'index'),
  output: { clean: true, filename: 'index.js' },
  module: { rules: [{ test: /\.ts$/i, loader: 'ts-loader' }] },
  resolve: { extensions: ['.ts', '.js'] },
  target: 'node',
  plugins: [new ESLintPlugin({ extensions: ['ts'], fix: false })],
};
