import { readFileSync, writeFileSync } from 'fs';
import { RouteRecordRaw } from 'vue-router';
import { getRoutesPath, isFileExist } from './shared.js';
import { parse } from '@babel/parser';
import * as type from '@babel/types';
import generator from '@babel/generator';
import traverse from '@babel/traverse';

const generateRouteItem = (
  routerData: Record<string, any>
): RouteRecordRaw => ({
  name: routerData.name,
  path: routerData.path,
  component: () => import(routerData.component),
});

const modifyRouteFile = (routeItem: RouteRecordRaw) => {
  console.log(getRoutesPath(), routeItem);
  const routePath = getRoutesPath();
  if (isFileExist(routePath)) {
    console.log('file loaded');
    const fileContent = readFileSync(routePath, { encoding: 'utf8' });
    const routeAST = parse(fileContent, {
      errorRecovery: true,
      sourceType: 'module',
    });
    // type.traverse(routeAST, (node) => {
    //   if (type.isIdentifier(node) && node.name === 'routes') {
    //     console.log(node);
    //   }
    // });
    traverse.default(routeAST, {
      enter(path: any) {
        if (type.isIdentifier(path.node) && path.node.name === 'routes') {
          // console.log(path.node, path);
          if (type.isObjectProperty(path.parent)) {
            // console.log(path.parent.value);
            const insertNode = type.objectExpression([
              type.objectProperty(
                type.identifier('name'),
                type.stringLiteral('route')
              ),
              type.objectProperty(
                type.identifier('path'),
                type.stringLiteral('/')
              ),
              type.objectProperty(
                type.identifier('component'),
                type.arrowFunctionExpression(
                  [],
                  type.callExpression(type.import(), [
                    type.stringLiteral('@/views/index'),
                  ])
                )
              ),
            ]);
            path.parent.value.elements.push(insertNode);
          }
        }
      },
    });
    writeFileSync(routePath, generator.default(routeAST).code, {
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
