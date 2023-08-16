// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

import { nodeResolve } from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-polyfill-node';

import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: './src/app.ts',
    output:{
      file: 'dist/app.js',
      format: 'cjs',
    },
    plugins: [
      commonjs(),
      typescript()
    ],
    external: ["sfawd", "@sfawd/html", "path"]
  },
  {
    input: [
      './src/UIPainterImpl/views/pages/Home.ts',
    ],
    output: {
      dir: 'dist/views',
      format: 'es'
    },
    plugins: [
      typescript(),
      json(),
      commonjs(),
      nodePolyfills(),
      nodeResolve({
        preferBuiltins: false
      }),
      copy({
        targets: [
          { src: './src/UIPainterImpl/static/images/**/*', dest: 'dist/images' }
        ]
      }),
      terser()
    ]
  },
];