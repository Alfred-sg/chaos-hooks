import { IBundleOptions } from 'father';

const options: IBundleOptions = {
  umd: {
    name: 'chaosHooks',
    globals: {
      'react': 'React',
    },
  },
  esm: {
    type: "rollup",
    importLibToEs: true,
  },
  cjs: {
    type: "rollup",
  },
};

export default options;
