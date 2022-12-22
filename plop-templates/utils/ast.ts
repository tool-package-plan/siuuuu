import traverse from '@babel/traverse';
import type { ParseResult } from '@babel/parser';
import * as type from '@babel/types';
import generator from '@babel/generator';
import { IRouteConfig } from 'plop-templates/actions.js';

// 这个函数会重写传入的routeAST对象内容
export const editRouterAst = (
  routeAST: ParseResult<type.File>,
  routeConfig: IRouteConfig
): string => {
  const { name, path: routePath, component } = routeConfig;
  console.log(routeConfig);
  traverse.default(routeAST, {
    enter(path: any) {
      if (type.isIdentifier(path.node) && path.node.name === 'routes') {
        if (type.isObjectProperty(path.parent)) {
          const insertNode = type.objectExpression([
            type.objectProperty(
              type.identifier('name'),
              type.stringLiteral(name)
            ),
            type.objectProperty(
              type.identifier('path'),
              type.stringLiteral(routePath)
            ),
            type.objectProperty(
              type.identifier('component'),
              type.arrowFunctionExpression(
                [],
                type.callExpression(type.import(), [
                  type.stringLiteral(component),
                ])
              )
            ),
          ]);
          path.parent.value.elements.push(insertNode);
        }
      }
    },
  });
  return generator.default(routeAST).code;
};
