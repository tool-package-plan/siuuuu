import nodePlop from 'node-plop';
import chalk from 'chalk';
import { getPlopFile } from '../shared.js';

const plopfilePath = getPlopFile(import.meta.url);

const plop = await nodePlop(plopfilePath);

const basicAdd = plop.getGenerator('v3-ts-component');

export default async function () {
  const answers = await basicAdd.runPrompts();

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
}
