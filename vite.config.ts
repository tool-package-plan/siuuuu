import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    deps: {
      interopDefault: false,
    },
    coverage: {
      lines: 75,
      statements: 80,
    },
  },
});
