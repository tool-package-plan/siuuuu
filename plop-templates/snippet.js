import { validateRequiredString } from './utils/shared.js';
export const createInputPlop = (name, message, required, validateMsg) => {
  const baseResult = { name, message };
  if (required) {
    baseResult.validate = (str) =>
      validateRequiredString(str, validateMsg || `请输入正确的${name}`);
  }
  return baseResult;
};
