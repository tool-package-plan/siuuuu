import inquirer from 'inquirer';
import vueComponent from './plop-templates/vue-component/index.js';
import routerTemplate from './plop-templates/router/index.js';

const plopComponentMap: Record<string, Function> = {
  vue: vueComponent,
  route: routerTemplate,
};

const promptOptions = [
  {
    type: 'list',
    name: 'plop',
    message: '选择要生成的模板文件类型',
    choices: [
      {
        name: 'vue3组件-Component',
        value: 'vue',
        short: 'vue',
      },
      {
        name: 'Router Item',
        value: 'route',
        short: 'route',
      },
    ],
    validate(v: any[]) {
      if (!v.length) {
        return false;
      }
      return true;
    },
  },
];

class Siuuuu {
  vue: Function = vueComponent;
  route: Function = routerTemplate;
  promptOptions: Record<string, any>[];
  constructor() {
    this.promptOptions = promptOptions;
  }
  run() {
    inquirer.prompt(this.promptOptions).then((res) => {
      const plop: string = res.plop;
      this.generate(plop);
    });
  }
  generate(actionType: string, params?: Record<string, any>) {
    plopComponentMap[actionType](params);
  }
}

const siuuuu = new Siuuuu();

export default siuuuu;
