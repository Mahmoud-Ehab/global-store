// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    input: './src/app.ts',
    output: [
      {
        file: 'dist/app.js',
        format: 'cjs'
      },
      {
        file: 'dist/app.es.js',
        format: 'es'
      }
    ],
    plugins: [
      json(),
      commonjs(),
      typescript(),
      nodeResolve({
        preferBuiltins: true  
      })
    ]
  }
];