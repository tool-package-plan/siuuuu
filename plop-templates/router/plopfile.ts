import type { NodePlopAPI } from 'node-plop';
import { createInputPlop } from '../snippet.js';
import {
  addRouteItem,
  createAutoRouteItem,
  routeAnswerToRouteItem,
} from '../actions.js';

export default function (plop: NodePlopAPI) {
  plop.setActionType(
    'addRoute',
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
      const routerItem = data.autoMapping
        ? createAutoRouteItem(data.routeName)
        : routeAnswerToRouteItem(data);
      return [
        {
          type: 'addRoute',
          ...routerItem,
        },
      ];
    },
  });
}
