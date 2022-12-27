import { createInputPlop } from '../../utils/snippet.js';
import { addRouteItem, createAutoRouteItem, routeAnswerToRouteItem, } from '../../utils/actions.js';
export default function (plop) {
    plop.setActionType('addRoute', (answers, config, plop) => {
        addRouteItem(config);
        return '123';
    });
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
                ...createInputPlop('component', '请输入组件完整路经,支持alias,(eg. "@/views/account.vue")', true),
                when({ autoMapping }) {
                    return !autoMapping;
                },
            },
        ],
        actions: (data) => {
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
