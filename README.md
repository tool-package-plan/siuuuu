<div align="center">
<h1>siuuuu</h1>
</div>

<div style="margin-bottom:20px">
<a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg"></a>
<img src="https://img.shields.io/github/package-json/v/tool-package-plan/siuuuu">
</div>

---


## 简介

[siuuuu](https://github.com/tool-package-plan/siuuuu)是一个基于plop和babel的根据预制的模板生成项目文件的小工具,目前仅适用于vue3项目.


## 使用

### 安装

可以在全局安装或在项目中安装siuuuu

```
pnpm add -g siuuuu

pnpm add -D siuuuu

```

### 配置文件

#### 默认配置

```json
  {
    "baseDir": "./",
    "componentBasePath": "src/components",
    "viewBasePath": "src/views",
    "sroreBasePath": "src/stores",
    "routesFilePath": "src/router/index"
  }
```

- `baseDir`: 指定项目的根路径
- `componentBasePath`: 项目components文件夹的路径
- `viewBasePath`: 项目view文件的路径,如:src/views;src/pages等
- `storeBasePath`: 项目store文件的路径
- `routeFilePath`: 路由文件的路径,需要指定到文件,如果是ts项目,需要添加`.ts`后缀

#### 自订配置

如果默认配置与项目配置不同,需要在项目`根目录`下新建一个`.templaterc`的文件,手动替换需要修改的配置项:

```json
// .templaterc
{
  "baseDir": "./",
  "componentBasePath": "src/common/components",
  "viewBasePath": "src/pages",
  "sroreBasePath": "src/stores",
  "routesFilePath": "src/router/index.ts"
}
```

### 使用

如果是全局安装了`siuuuu`,可以直接在项目根目录执行:

```
> siuuuu
> ? 选择要生成的模板文件类型 (Use arrow keys)
❯ vue3组件-Component
  Router Item
```

根据控制台显示的操作进行选择即可


## TODO List

- [ ] 添加view后可选是否自动生成route
- [ ] 增加自动生成rc文件的命令
- [ ] 增加对vue2的支持
- [ ] 增加对store的支持
- [ ] 判断store文件,选择新增或插入
- [ ] 重复route override的开关(或以交互的形式选择)
- [ ] 是否覆盖重复组件的开关
