import { esbuildPlugin } from "@web/dev-server-esbuild";
import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';

export default {
  nodeResolve: true,
  appIndex: 'dist/index.html',
  plugins: [
    esbuildPlugin({ ts: true }),
    hmrPlugin({
      include: ['src/**/*'],
      presets: [presets.litElement],
    }),
  ],
};
