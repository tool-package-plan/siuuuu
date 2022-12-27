import rc from 'rc';
const defaultConfig = {
    baseDir: './',
    componentBasePath: 'src/components',
    viewBasePath: 'src/views',
    sroreBasePath: 'src/stores',
    routesFilePath: 'src/router/index',
};
const conf = rc('template', defaultConfig);
export default conf;
