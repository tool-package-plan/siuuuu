import { readFileSync, writeFileSync } from 'fs';
import { getRoutesPath, isFileExist } from './shared.js';
import { parse } from '@babel/parser';
import { editRouterAst } from './utils/ast.js';

export declare interface IRouteConfig {
  name: string;
  path: string;
  component: string;
}

const generateRouteItem = (routerData: Record<string, any>): IRouteConfig => ({
  name: routerData.name,
  path: routerData.path,
  component: routerData.component,
});

const modifyRouteFile = (routeItem: IRouteConfig) => {
  const routePath = getRoutesPath();
  if (isFileExist(routePath)) {
    console.log('file loaded');
    const fileContent = readFileSync(routePath, { encoding: 'utf8' });
    const routeAST = parse(fileContent, {
      errorRecovery: true,
      sourceType: 'module',
    });

    writeFileSync(routePath, editRouterAst(routeAST, routeItem), {
      encoding: 'utf-8',
    });
  } else {
    console.log('file does not existed!');
  }
};

export const addRouteItem = (routerData: Record<string, any>) => {
  const routeItem = generateRouteItem(routerData);
  modifyRouteFile(routeItem);
};
