import nodePlop from 'node-plop';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const plopfilePath = path.resolve(__dirname, './plopfile.js');

const plop = await nodePlop(plopfilePath);

const basicAdd = plop.getGenerator('v3-ts-component');

const answers = await basicAdd.runPrompts();

console.log(answers);

basicAdd.runActions(answers).then((res) => {
  if (res.failures.length) {
    console.log(
      chalk.red(
        'ERROR when',
        res.failures[0].type,
        answers.componentName,
        res.failures[0].error
      )
    );
  }
});
