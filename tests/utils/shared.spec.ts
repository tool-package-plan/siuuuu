import {
  componentAnswerToRouteAnswer,
  getDirname,
  isFileExist,
  joinPath,
  validateRequiredString,
} from '../../utils/shared';
import { describe, it, expect } from 'vitest';
import { resolve } from 'path';

describe('ValidateRequiredString方法测试', () => {
  it('正常字符串输入,返回true', () => {
    expect(validateRequiredString('teststring')).toBeTruthy();
    expect(validateRequiredString('TESTASD')).toBeTruthy();
    expect(validateRequiredString('ASDASD23123')).toBeTruthy();
    expect(validateRequiredString('asdString')).toBeTruthy();
    expect(validateRequiredString('shopping-cart')).toBeTruthy();
  });
  it('字符串不能包含空格', () => {
    const errorString = '格式错误,格式约束:非空格字符';
    expect(validateRequiredString(' asd ', '格式错误')).toBe(errorString);
    expect(validateRequiredString('', '格式错误')).toBe(errorString);
  });
  it('第二个参数缺失,校验失败输出undefined', () => {
    expect(validateRequiredString(' ')).toBe('undefined,格式约束:非空格字符');
  });
});

describe('isFileExist测试', () => {
  const testFile = resolve(getDirname(import.meta.url), '../helper/file.js');
  const testNotExistFile = resolve(
    getDirname(import.meta.url),
    '../helper/file1.js'
  );
  it('存在的文件', () => {
    expect(isFileExist(testFile)).toBeTruthy();
  });
  it('不存在的文件', () => {
    expect(isFileExist(testNotExistFile)).toBeFalsy();
  });
});

describe('joinPath', () => {
  it('url拼接测试', () => {
    expect(joinPath('./index.js')).toBe('index.js');
  });
});

describe('componentAnswerToRouteAnswer', () => {
  const componentAnswer = { name: '1234' };
  it('test input 1234', () => {
    expect(componentAnswerToRouteAnswer(componentAnswer)).toEqual({
      routeName: '1234',
      name: '1234',
      path: '/1234',
      component: '@/view/1234/index.vue',
    });
  });
  it('test error input', () => {
    const errorMsgReg = /^error componentAnswer/;
    expect(() => componentAnswerToRouteAnswer({})).toThrowError(errorMsgReg);
    expect(() => componentAnswerToRouteAnswer(123)).toThrowError(errorMsgReg);
    expect(() => componentAnswerToRouteAnswer('123')).toThrowError(errorMsgReg);
    expect(() => componentAnswerToRouteAnswer(null)).toThrowError(errorMsgReg);
    expect(() => componentAnswerToRouteAnswer(undefined)).toThrowError(
      errorMsgReg
    );
  });
});
