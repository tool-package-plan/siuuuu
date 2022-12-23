import traverse from '@babel/traverse';
import type { ParseResult } from '@babel/parser';
import * as type from '@babel/types';
import generator from '@babel/generator';
import { IRouteItem } from 'plop-templates/actions.js';
import chalk from 'chalk';

const getRoutePathToAttribute = ({
  name,
  path: routePath,
  component,
}: IRouteItem): type.ObjectExpression => {
  return type.objectExpression([
    type.objectProperty(type.identifier('name'), type.stringLiteral(name)),
    type.objectProperty(type.identifier('path'), type.stringLiteral(routePath)),
    type.objectProperty(
      type.identifier('component'),
      type.arrowFunctionExpression(
        [],
        type.callExpression(type.import(), [type.stringLiteral(component)])
      )
    ),
  ]);
};

const isRoutesIdentifier = (path: any): boolean =>
  type.isIdentifier(path.node) && path.node.name === 'routes';

const isVariableDeclarationRoutes = (path: any): boolean =>
  isRoutesIdentifier(path) && type.isVariableDeclarator(path.parent);

const isValidPropertyRoutes = (path: any): boolean =>
  isRoutesIdentifier(path) &&
  type.isObjectProperty(path.parent) &&
  !type.isIdentifier(path.parent.value);

const dealRoutes = (path: any, insertNode: type.ObjectExpression) => {
  if (isVariableDeclarationRoutes(path)) {
    path.parent.init.elements.push(insertNode);
  }
  if (isValidPropertyRoutes(path)) {
    path.parent.value.elements.push(insertNode);
  }
};

// 这个函数会重写传入的routeAST对象内容
export const editRouterAst = (
  routeAST: ParseResult<type.File>,
  routeConfig: IRouteItem
): string => {
  traverse.default(routeAST, {
    enter(path: any) {
      const insertNode = getRoutePathToAttribute(routeConfig);
      try {
        dealRoutes(path, insertNode);
      } catch (e) {
        console.log(chalk.red('something wrong!', e));
      }
    },
  });
  return generator.default(routeAST).code;
};
