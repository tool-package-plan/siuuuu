import rc from 'rc';

const conf = rc('template', {
  baseDir: './',
  componentBasePath: 'src/components',
  viewBasePath: 'src/views',
  sroreBasePath: 'src/stores',
});

export default conf;
