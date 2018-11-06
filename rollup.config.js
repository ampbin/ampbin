import compiler from '@ampproject/rollup-plugin-closure-compiler';

export default {
  input: 'dist/bundle.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
  },
  plugins: [
    compiler(),
  ],
}