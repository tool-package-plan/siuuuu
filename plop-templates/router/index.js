import chalk from 'chalk';
import nodePlop from 'node-plop';
import { getPlopFile } from '../../utils/shared.js';
const plopFilePath = getPlopFile(import.meta.url);
const plop = await nodePlop(plopFilePath);
const basicAdd = plop.getGenerator('router');
export default async function (answers) {
    if (!answers) {
        answers = await basicAdd.runPrompts();
    }
    const res = await basicAdd.runActions(answers);
    if (res.failures.length) {
        console.log(chalk.red('ERROR when', res.failures[0].type, answers.name, res.failures[0].error));
    }
}
