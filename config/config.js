import path from 'path';

export default {
  hash: true,
  title: 'chaos-hooks',
  // mode: 'site',
  resolve: {
    alias: {
      'chaos-hooks': path.resolve(__dirname, '../src'),
    },
  }
};
