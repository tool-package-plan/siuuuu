import rc from 'rc';

interface ITemplateConfig extends Record<string, any> {
  baseDir: string;
  componentBasePath: string;
  viewBasePath: string;
  sroreBasePath: string;
  routesFilePath: string;
}

const defaultConfig: ITemplateConfig = {
  baseDir: './',
  componentBasePath: 'src/components',
  viewBasePath: 'src/views',
  sroreBasePath: 'src/stores',
  routesFilePath: 'src/router/index',
};

const conf: ITemplateConfig = rc('template', defaultConfig);

export default conf;
