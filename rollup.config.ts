import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
// import pkg from './package.json';

// const libraryName = pkg.name;

const input = `src/index.ts`;
const output = format => `dist/datamint.${format}.js`;
const common = target => ({
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    // Allow json resolution
    json(),
    // Resolve source maps to the original source
    sourceMaps(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true, tsconfigOverride: { compilerOptions: {
      target
    } } }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),
  ],
});

export default [
  {
    input,
    output: [
      { file: output('cjs'), format: 'cjs', sourcemap: true, exports: 'named' },
      { file: output('umd'), format: 'umd', sourcemap: true, name: 'datamint', exports: 'named' },
      { file: output('iife'), format: 'iife', sourcemap: true, name: 'datamint', exports: 'named' },
    ],
    ...common('es5')
  },
  {
    input,
    output: { file: 'dist/datamint.es.js', format: 'es', sourcemap: true },
    ...common('es6')
  }
];
