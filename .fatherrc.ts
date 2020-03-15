import { IBundleOptions } from 'father';

const options: IBundleOptions = {
  umd: {
    name: 'chaosHooks',
    globals: {
      'react': 'React',
    }
  },
};

export default options;
