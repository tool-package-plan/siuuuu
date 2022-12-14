import inquirer from 'inquirer';
import v3TsComponent from './plop-templates/v3-ts-component/index.js';

const plopComponentMap: Record<string, Function> = {
  v3: v3TsComponent,
};

export default function () {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'plop',
        message: '选择要生成的模板文件类型',
        choices: [
          {
            name: 'vue3组件-Component',
            value: 'v3',
            short: 'v3',
          },
        ],
        validate(v: any[]) {
          if (!v.length) {
            return false;
          }
          return true;
        },
      },
    ])
    .then((res) => {
      const plop: string = res.plop;
      plopComponentMap[plop]();
    });
}
