// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: './src/app.ts',
    external: ['moment'], // <-- suppresses the warning
    output: {
      dir: 'dist',
      format: 'es',
    },
    plugins: [
      commonjs(),
      typescript()
    ]
  },
];