import { resolve } from 'path';
import { describe, it, expect } from 'vitest';
import { editRouterAst } from '../../utils/ast';
import { getDirname } from '../../utils/shared';
import { parse } from '@babel/parser';
import { readFileSync } from 'fs';

const fp = getDirname(import.meta.url);
const routeVDPath = resolve(fp, '../helper/route-variable-declaration.js');
const routeVDS = readFileSync(
  resolve(fp, '../helper/route-variable-declaration-result.js'),
  { encoding: 'utf-8' }
);
const routeOPS = readFileSync(
  resolve(fp, '../helper/route-object-property-result.js'),
  { encoding: 'utf-8' }
);
const routeOPPath = resolve(fp, '../helper/route-object-property.js');
const file = readFileSync(resolve(fp, '../helper/file.js'), {
  encoding: 'utf-8',
});
const routeItem = {
  name: 'shopping-cart',
  path: '/shopping-cart',
  component: '@/views/shopping-cart/index.vue',
};

describe('AST处理测试', () => {
  describe('传入routes文件内容和路由对象,输出新的routes文件内容', () => {
    it('变量声明的routes数组', () => {
      const routeAST = parse(readFileSync(routeVDPath, { encoding: 'utf-8' }), {
        errorRecovery: true,
        sourceType: 'module',
      });
      const result = editRouterAst(routeAST, routeItem);
      expect(result).toEqual(routeVDS);
    });
    it('属性声明的routes数组', () => {
      const routeAST = parse(readFileSync(routeOPPath, { encoding: 'utf-8' }), {
        errorRecovery: true,
        sourceType: 'module',
      });
      const result = editRouterAst(routeAST, routeItem);
      expect(result).toEqual(routeOPS);
    });
  });
  describe('输入错误的参数,抛出异常', () => {
    it('错误的AST', () => {
      expect(() => editRouterAst(parse(file), routeItem)).toThrowError();
    });
  });
});
