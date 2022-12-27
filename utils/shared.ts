import conf from '../config.js';
import { existsSync, PathLike } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createAutoRouteItem } from './actions.js';

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

export const getDirname = (metaUrl: string): string =>
  dirname(fileURLToPath(metaUrl));

export const getPlopFile = (
  metaUrl: string,
  filename: string = 'plopfile.js'
): string => resolve(getDirname(metaUrl), filename);

export const validateRequiredString = (
  str: string,
  t?: string
): string | boolean => {
  const flag = /^[\w\S.]+[\w\S]*$/.test(str);
  if (!flag) {
    return `${t},格式约束:非空格字符`;
  }
  return true;
};

export const isFileExist = (path: PathLike): boolean => existsSync(path);

export const joinPath = (targetPath: string): string =>
  join(conf.baseDir, targetPath);

export const getRoutesPath = (): string => joinPath(conf.routesFilePath);

export const componentAnswerToRouteAnswer = (componentAnswer: any): any => {
  const { name } = componentAnswer;
  return { ...createAutoRouteItem(name), routeName: name };
};
