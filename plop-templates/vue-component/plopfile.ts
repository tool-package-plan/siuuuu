import type { NodePlopAPI } from 'node-plop';
import path from 'path';
import { createInputPlop } from '../../utils/snippet.js';
import { cwd } from 'process';
import { CSS_PROCESSORS } from '../../utils/shared.js';
import conf from '../../config.js';

export default function (plop: NodePlopAPI) {
  plop.setGenerator('vue-ts-component', {
    description: 'generate vue3 component with typescript',
    prompts: [
      createInputPlop('name', '请输入组件名', true),
      {
        type: 'list',
        name: 'type',
        message: '请选择要插入的.vue文件类型',
        choices: [
          {
            name: 'view',
            value: 'view',
          },
          {
            name: 'component',
            value: 'component',
          },
        ],
      },
      {
        type: 'checkbox',
        name: 'blocks',
        message: '请选择组件中要包含的模块',
        choices: [
          {
            name: '<template>',
            value: 'template',
            checked: true,
          },
          {
            name: '<script>',
            value: 'script',
            checked: true,
          },
          {
            name: '<style>',
            value: 'style',
            checked: false,
          },
        ],
        validate(value: any[]) {
          if (
            value.indexOf('script') === -1 &&
            value.indexOf('template') === -1
          ) {
            return 'Component require at least a <script> or <template> tag';
          }
          return true;
        },
      },
      {
        type: 'confirm',
        name: 'typescript',
        message: '是否为ts组件',
        default: false,
        when({ blocks }: any) {
          return blocks.includes('script');
        },
      },
      {
        type: 'list',
        name: 'processor',
        message: '请选择CSS预处理器',
        choices: CSS_PROCESSORS,
        when({ blocks }: any) {
          return blocks.includes('style');
        },
      },
      {
        type: 'confirm',
        name: 'isGlobal',
        message: '是否为全局组件?',
        default: false,
        when({ type }) {
          return type === 'component';
        },
      },
      {
        type: 'confirm',
        name: 'needRoute',
        message: '是否要生成route配置',
        default: true,
        when({ type }) {
          return type === 'view';
        },
      },
      {
        type: 'confirm',
        name: 'autoRoute',
        message: '是否自动生成route配置',
        default: true,
        when({ needRoute }) {
          return needRoute;
        },
      },
    ],
    actions: (data: any) => {
      const name = data.name;
      const formattedName = '{{dashCase name}}';
      const isView = data.type === 'view';
      const currentCwd = cwd();
      const relativeViewPath = `${conf.viewBasePath}/${name}/index.vue`;
      const relativeComponentPath = data.isGlobal
        ? `${conf.componentBasePath}/global/${name}/index.vue`
        : `${conf.componentBasePath}/${name}/index.vue`;
      return [
        {
          type: 'add',
          path: path.resolve(
            currentCwd,
            isView ? relativeViewPath : relativeComponentPath
          ),
          templateFile: './template.hbs',
          data: {
            name: formattedName,
            template: data.blocks.includes('template'),
            script: data.blocks.includes('script'),
            style: data.blocks.includes('style'),
            lang: data.processor,
            typescript: data.blocks.includes('typescripts') || '',
          },
        },
      ];
    },
  });
}
