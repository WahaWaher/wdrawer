import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';

const config = require('./config');
const pkg = require('./package.json');

export default [
  {
    input: `${config.src}/index.js`,
    output: [
      {
        file: `${config.dev}/js/${pkg.lib.file}.umd.es5.js`,
        format: 'umd',
        name: config.globals.core,
        plugins: [],
        compact: false,
        strict: false,
      },
    ],
    plugins: [
      resolve(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
      json({ compact: false }),
      replace({
        __labraryTitle__: pkg.lib.title,
        __labraryFile__: pkg.lib.file,
        __labraryGlobal__: pkg.lib.global,
      })
    ],
    cache: true,
    watch: {
      chokidar: true,
      include: 'src/**/*',
    },
  },
];
