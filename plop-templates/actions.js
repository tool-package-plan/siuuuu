import { readFileSync, writeFileSync } from 'fs';
import { getRoutesPath, isFileExist } from './utils/shared.js';
import { parse } from '@babel/parser';
import { editRouterAst } from './utils/ast.js';
const generateRouteItem = (routerData) => ({
  name: routerData.name,
  path: routerData.path,
  component: routerData.component,
});
const modifyRouteFile = (routeItem) => {
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
/**
 * @description 通过babel将route文件转为AST并将传入的router信息插入到路由文件中
 * @param routerData
 */
export const addRouteItem = (routerData) => {
  const routeItem = generateRouteItem(routerData);
  modifyRouteFile(routeItem);
};
/**
 * @description 通过传入的name自动生成一个简单的route对象信息
 * @returns {IRouteItem}
 */
export const createAutoRouteItem = (routeName) => ({
  name: routeName,
  path: `/${routeName}`,
  component: `@/view/${routeName}.vue`,
});
/**
 *
 * @param routeAnswer
 * @description 将plop中关于route的answer转化为IRouteItem
 * @returns {IRouteItem}
 */
export const routeAnswerToRouteItem = (routeAnswer) => ({
  name: routeAnswer.routeName,
  path: routeAnswer.path,
  component: routeAnswer.component,
});
