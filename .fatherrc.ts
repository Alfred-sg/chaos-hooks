import { IBundleOptions } from 'father';

const options: IBundleOptions = {
  umd: {
    name: 'chaosHooks',
    globals: {
      'react': 'React',
    },
  },
  esm: {
    type: "rollup",// rollup 模式将文件打包在一起，babel 单独打包
    importLibToEs: true,
  },
  cjs: {
    type: "rollup",
  },
  file: 'index',
};

export default options;
