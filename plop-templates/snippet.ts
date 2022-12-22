import type { PromptQuestion } from 'node-plop';
import { validateRequiredString } from './utils/shared.js';

export const createInputPlop = (
  name: string,
  message: string,
  required?: boolean,
  validateMsg?: string
): PromptQuestion => {
  const baseResult: PromptQuestion = { name, message };
  if (required) {
    baseResult.validate = (str: string) =>
      validateRequiredString(str, validateMsg || `请输入正确的${name}`);
  }
  return baseResult;
};
