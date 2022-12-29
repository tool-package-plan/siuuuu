import inquirer from 'inquirer';
import vueComponent from './plop-templates/vue-component/index.js';
import routerTemplate from './plop-templates/router/index.js';
const plopComponentMap = {
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
        validate(v) {
            if (!v.length) {
                return false;
            }
            return true;
        },
    },
];
class Siuuuu {
    vue = vueComponent;
    route = routerTemplate;
    promptOptions;
    constructor() {
        this.promptOptions = promptOptions;
    }
    run() {
        inquirer.prompt(this.promptOptions).then((res) => {
            const plop = res.plop;
            this.generate(plop);
        });
    }
    generate(actionType, params) {
        plopComponentMap[actionType](params);
    }
}
const siuuuu = new Siuuuu();
export default siuuuu;
