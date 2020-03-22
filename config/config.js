import path from 'path';

export default {
  hash: true,
  title: 'chaos-hooks',
  // mode: 'site',
  includes: [path.resolve(__dirname, '../mds')],
  resolve: {
    alias: {
      'chaos-hooks': path.resolve(__dirname, '../src'),
    },
  }
};
