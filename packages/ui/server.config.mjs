import { esbuildPlugin } from "@web/dev-server-esbuild";
import { fromRollup } from '@web/dev-server-rollup';
import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';
import rollupCommonjs from '@rollup/plugin-commonjs';

const commonjs = fromRollup(rollupCommonjs);

export default {
  nodeResolve: true,
  appIndex: `packages/ui/src/index.html`,
  rootDir: '../../',
  debug: false,
  plugins: [
    esbuildPlugin({ ts: true }),
    hmrPlugin({
      include: ['packages/ui/src/**/*'],
      presets: [presets.litElement],
    }),
    commonjs({
      include: [
        '../../node_modules/fast-json-stable-stringify/index.js',
        '../../node_modules/zen-observable/**/*'
      ]
    }),
  ],
};
