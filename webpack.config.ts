import { resolve } from 'path';
import ESLintPlugin from 'eslint-webpack-plugin';

export default {
  mode: 'production',
  entry: resolve(__dirname, 'src', 'index'),
  output: { clean: true, filename: 'index.js', path: resolve(__dirname, 'dist', 'server') },
  module: { rules: [{ test: /\.ts$/i, loader: 'ts-loader' }] },
  resolve: { extensions: ['.ts', '.js'] },
  target: 'node',
  externals: { 'bufferutil': 'bufferutil', 'utf-8-validate': 'utf-8-validate' },
  plugins: [new ESLintPlugin({ extensions: ['ts'], fix: false })],
};
