import nodePlop from 'node-plop';
import chalk from 'chalk';
import { componentAnswerToRouteAnswer, getPlopFile, } from '../../utils/shared.js';
import siuuuu from '../../index.js';
import conf from '../../config.js';
const plopfilePath = getPlopFile(import.meta.url);
const plop = await nodePlop(plopfilePath);
const basicAdd = plop.getGenerator('vue-ts-component');
export default async function (answers) {
    if (process.env.NODE_ENV !== 'unit' && !answers) {
        answers = await basicAdd.runPrompts();
    }
    basicAdd.runActions(answers).then((res) => {
        if (res.failures.length) {
            console.log(chalk.red('ERROR when', res.failures[0].type, answers.name, res.failures[0].error));
            return;
        }
        console.log(chalk.green(`组件生成成功,请查看${conf.componentBasePath}`));
        if (answers.needRoute) {
            answers.autoRoute
                ? siuuuu.generate('route', componentAnswerToRouteAnswer(answers))
                : siuuuu.generate('route');
        }
    });
}
