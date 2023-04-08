// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';

export default [
  {
    input: './src/app.ts',
    output: {
      dir: 'dist',
      format: 'cjs'
    },
    plugins: [
      json(),
      commonjs(),
      typescript(),
      nodeResolve({
        preferBuiltins: true  
      })
    ]
  },
  {
    input: [
      './src/UIPainterImpl/pages/HomePage.ts'
    ],
    output: {
      dir: 'dist/pages',
      format: 'es'
    },
    plugins: [
      typescript(),
      nodeResolve()
    ]
  }
];