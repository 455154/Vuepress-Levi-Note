module.exports = {
  title: "Levi的个人文档", // 设置网站标题
  description: "lwf-note", // 网页描述
  themeConfig: {
    // 配置所有文档生成侧边栏
    //sidebar: 'auto',
    // 项目只显示一个侧边栏
    // sidebar: ['/', '/home1', ['/home2', 'home2自定义标题'], '/home3'],
    // 侧边栏 分组
    sidebar: [
      ['/page/Sass/sass', 'Sass'],
      ['/page/Mock/Mockjs', 'Mock'],
      ['/page/Maczip/mac-zip', 'Mac压缩命令'],
      // ['/page/Lodashlodash', 'Lodash'],
      {
        title: "Electron",
        children: [["/page/Electron/electron", "Electron"]]
      },
      {
        title: "Lodash",
        children: [["/page/Lodash/lodash", "lodash"]]
      },
      {
        title: "Css",
        children: [["/page/Css/css", "css"]]
      },
      {
        title: "Js",
        children: [["/page/Js/js", "js"]]
      },
      {
        title: "Vue",
        children: [["/page/Vue/vue", "vue"]]
      },
      {
        title: "React",
        children: [["/page/React/react", "react"]]
      },
      {
        title: "uni-app",
        children: [["/page/uni-app/uni-app", "uni-app"]]
      },
      {
        title: "Wepy",
        children: [
          ["/page/Wepy/基本使用", "基本使用"],
          ["/page/Wepy/page相关方法", "page相关方法"],
          ["/page/Wepy/生命周期", "生命周期"],
          ["/page/Wepy/小程序配置-全局", "小程序配置-全局"],
          ["/page/Wepy/小程序配置-页面", "小程序配置-页面"],
          ["/page/Wepy/sitemap配置", "sitemap配置"]
        ]
      },
      {
        title: "请求",
        children: [
          ["/page/Request/axios", "axios"],
          ["/page/Request/wepy", "wepy"]
        ]
      },
    ],
    // 配置侧边栏标题显示层数
    sidebarDepth: 2, // 0 禁用 1 只显示h2标题 2 可设置的最大值 同时提取h2 h3标题
    // 导航栏配置
    nav: [
      { text: "Home", link: "/" }, // 根路径
      { text: "Guide", link: "/guide/" },
      { text: "External", link: "https://google.com" }, // 外部链接
      // 显示下拉列表
      {
        text: "Languages",
        items: [
          { text: "Chinese", link: "/language/chinese" },
          { text: "Japanese", link: "/language/japanese" }
        ]
      },
      // 下拉列表显示分组
      {
        text: "高级",
        items: [
          {
            text: "算法",
            items: [
              { text: "冒泡", link: "/language/chinese" },
              { text: "快速", link: "/language/japanese" }
            ]
          },
          {
            text: "设计模式",
            items: [
              { text: "工厂", link: "/language/chinese" },
              { text: "单例", link: "/language/chinese" }
            ]
          }
        ]
      }
    ]
  }
};
