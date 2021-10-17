# 西窗烛客户端

基于[西窗烛官网](http://lib.xcz.im/library)封装，增强了一些功能，主要是加入了一些快捷键，更改字体为宋体，顶部状态栏随机显示诗词名句，加入了mac触摸板的一些支持，移除了一些无用花里胡哨的东西等

## 先上图：

![](https://s3.bmp.ovh/imgs/2021/10/30d872586bb9814a.jpg)


![](https://s3.bmp.ovh/imgs/2021/10/29388ef3e2f784ab.jpg)


## 支持以下快捷键:

*  支持回车搜索

* `ctrl + k` 向上翻页

* `ctrl + j` 向下翻页

* `ctrl + h` 向左翻页

* `ctrl + l` 向右翻页

在诗词详情页:

* `ctrl + c` 复制诗词到粘贴板

* `ctrl + s` 朗诵或停止朗诵诗词


**注意，快捷键需要在安全性与隐私开启辅助功能**

## build

```
npm install

npm run release

```

如果发现robotjs报错，可以采取以下方式重新安装

```

1.rm -rf node-modules/robotjs

2.rm -rf packages-lock.json

3.npm i

4./node_modules/.bin/electron-rebuild

```
