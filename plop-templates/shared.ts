type CssProcessor = 'less' | 'scss' | 'css' | 'sass';

interface IChoice {
  name: CssProcessor;
  value: string;
}

export const CSS_PROCESSORS: IChoice[] = [
  {
    name: 'less',
    value: 'less',
  },
  {
    name: 'scss',
    value: 'scss',
  },
  {
    name: 'sass',
    value: 'sass',
  },
  {
    name: 'css',
    value: 'css',
  },
];
