import * as type from '@babel/types';
import generator from '@babel/generator';
import traverse from '@babel/traverse';
import chalk from 'chalk';
const getRoutePathToAttribute = ({ name, path: routePath, component, }) => {
    return type.objectExpression([
        type.objectProperty(type.identifier('name'), type.stringLiteral(name)),
        type.objectProperty(type.identifier('path'), type.stringLiteral(routePath)),
        type.objectProperty(type.identifier('component'), type.arrowFunctionExpression([], type.callExpression(type.import(), [type.stringLiteral(component)]))),
    ]);
};
const isRoutesIdentifier = (path) => type.isIdentifier(path.node) && path.node.name === 'routes';
const isVariableDeclarationRoutes = (path) => isRoutesIdentifier(path) && type.isVariableDeclarator(path.parent);
const isValidPropertyRoutes = (path) => isRoutesIdentifier(path) &&
    type.isObjectProperty(path.parent) &&
    !type.isIdentifier(path.parent.value);
const dealRoutes = (path, insertNode) => {
    if (isVariableDeclarationRoutes(path)) {
        path.parent.init.elements.push(insertNode);
    }
    if (isValidPropertyRoutes(path)) {
        path.parent.value.elements.push(insertNode);
    }
};
// 这个函数会重写传入的routeAST对象内容
export const editRouterAst = (routeAST, routeConfig) => {
    traverse.default(routeAST, {
        enter(path) {
            const insertNode = getRoutePathToAttribute(routeConfig);
            try {
                dealRoutes(path, insertNode);
            }
            catch (e) {
                console.log(chalk.red('something wrong!', e));
            }
        },
    });
    return generator.default(routeAST).code;
};
