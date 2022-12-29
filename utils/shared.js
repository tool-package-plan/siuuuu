import conf from '../config.js';
import { existsSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createAutoRouteItem } from './actions.js';
export const CSS_PROCESSORS = [
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
export const getDirname = (metaUrl) => dirname(fileURLToPath(metaUrl));
export const getPlopFile = (metaUrl, filename = 'plopfile.js') => resolve(getDirname(metaUrl), filename);
export const validateRequiredString = (str, t) => {
    const flag = /^[\w\S.]+[\w\S]*$/.test(str);
    if (!flag) {
        return `${t},格式约束:非空格字符`;
    }
    return true;
};
export const isFileExist = (path) => existsSync(path);
export const joinPath = (targetPath) => join(conf.baseDir, targetPath);
export const getRoutesPath = () => joinPath(conf.routesFilePath);
export const componentAnswerToRouteAnswer = (componentAnswer) => {
    if (!componentAnswer || !componentAnswer.name) {
        throw new Error('error componentAnswer');
    }
    const { name } = componentAnswer;
    return { ...createAutoRouteItem(name), routeName: name };
};
