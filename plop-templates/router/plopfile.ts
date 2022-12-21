import type { NodePlopAPI } from 'node-plop';
import { createInputPlop } from '../snippet.js';
import { addRouteItem } from '../actions.js';

export default function (plop: NodePlopAPI) {
  plop.setActionType(
    'addRouter',
    (answers: Record<string, any>, config, plop) => {
      addRouteItem(config);
      return '123';
    }
  );

  plop.setGenerator('router', {
    description: '生成或修改路由文件',
    prompts: [
      createInputPlop('routeName', '请输入路由名', true),
      {
        type: 'confirm',
        message: '是否需要自动映射view和path?',
        name: 'autoMapping',
        default: false,
      },
      {
        ...createInputPlop('path', '请输入路由的path', true),
        when({ autoMapping }) {
          return !autoMapping;
        },
      },
      {
        ...createInputPlop('component', '请输入组件路经,支持alias', true),
        when({ autoMapping }) {
          return !autoMapping;
        },
      },
    ],
    actions: (data: any) => {
      console.log(data);
      return [
        {
          type: 'addRouter',
          name: data.routeName,
          path: data.path,
          component: data.component,
        },
      ];
    },
  });
}
