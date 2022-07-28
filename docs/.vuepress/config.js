module.exports = {
  title: '鹿先生的笔记库',
  description: '学习使你快乐！！',
  //PWA支持
  plugins: [
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true
      }
    ],
    // [
    // 辅助导航栏的自动识别显示侧边栏文档 —— （以链接的形式）
    // ('vuepress-plugin-auto-sidebar', {})
    // ]
    // 公告栏弹窗
    [
      '@vuepress-reco/vuepress-plugin-bulletin-popover',
      {
        width: '255px', // 默认 260px
        title: '消息提示',
        body: [
          {
            type: 'title',
            content: '今天天气不错，欢迎你的来到',
            style: 'text-aligin: center;'
          },
          {
            type: 'text',
            content:
              '🎉🎉本网站为个人的前端笔记网站。内容会随着自己的复习、学习脚步逐步完善，更多内容敬请期待！！😂'
          },
          {
            type: 'text',
            content: '🎉🎉本网站项目已经开源，欢迎大家积极提出issues！'
          },
          {
            type: 'text',
            content:
              '<li><a href="https://github.com/Lencamo/note-taking/issues" target="_blank">Issues</a></li>'
          },
          {
            type: 'text',
            content:
              '<li><a href="https://github.com/Lencamo/note-taking" target="_blank">Star</a></li>'
          }
        ]
      }
    ]
  ],
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: 'https://deer-sir.oss-cn-chengdu.aliyuncs.com/lencamo/favicon.ico'
      }
    ],
    //增加manifest.json
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    // 图片放大效果
    // ['script', { src: 'scripts/view-image.js' }],
    //移动端优化
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no'
      }
    ]
  ],
  // 搜索设置
  search: true,
  searchMaxSuggestions: 10,

  theme: 'reco',
  //头部导航栏
  themeConfig: {
    author: 'lencamo',
    logo: '/head.jpg',
    codeTheme: 'funky',
    // mode: "dark",
    // 备案
    record: '蜀ICP备2022012538号-2',
    recordLink: 'https://beian.miit.gov.cn',
    // 项目开始时间，只填写年份
    startYear: '2022',
    nav: [
      {
        text: '个人笔记',
        icon: 'reco-menu',
        items: [
          {
            text: '计算机基础知识',
            link: '/guide/computer_Basics/'
          },
          {
            text: '数据可视化',
            link: '/guide/data-visual_Note/'
          },
          {
            text: 'vue2.0笔记',
            link: '/guide/vue_Note/'
          },
          {
            text: 'Node笔记',
            link: '/guide/node_Note/'
          }
        ]
      },
      {
        text: 'Home',
        link: '/',
        icon: 'reco-home'
      },
      {
        text: '鹿先生',
        link: 'https://deer-sir.cn/',
        icon: 'reco-blog'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/Lencamo/note-taking',
        icon: 'reco-github'
      },
      {
        text: '博客园',
        link: 'https://www.cnblogs.com/Lencamo/',
        icon: 'reco-bokeyuan'
      }
    ],
    //左侧边栏
    sidebarDepth: 6, // 可选的, 默认值是 1
    collapsable: false,
    sidebar: {
      '/guide/computer_Basics/': [
        {
          title: '基础必备',
          collapsable: false,
          children: [
            ['git命令.md', 'git命令'],
            ['Linux基础.md', 'Linux命令'],
            ['正则表达式.md', '正则表达式']
          ]
        },
        {
          title: 'CSS预处理器',
          collapsable: false,
          children: [
            ['Less语法.md', 'Less语法'],
            ['Sass语法.md', 'Sass语法']
          ]
        }
      ],
      '/guide/data-visual_Note/': [
        {
          title: 'ECharts学习',
          collapsable: false,
          children: [
            ['ECharts入门（上）.md', 'ECharts入门（上）'],
            ['ECharts入门（下）.md', 'ECharts入门（下）'],
            ['ECharts高级（上）.md', 'ECharts高级（上）'],
            ['ECharts高级（下）.md', 'ECharts高级（下）']
          ]
        }
      ],
      '/guide/vue_Note/': [
        {
          title: '前端工程化与webpack',
          collapsable: false,
          children: [
            // {
            //   title: 'webpack配置、打包和发布',
            //   collapsable: false,
            //   children: [
            // '1、前端工程化与webpack/1.webpack配置、打包和发布/',
            // '1、前端工程化与webpack/1.webpack配置、打包和发布/REVIEW.md'
            //   ]
            // },
            // {
            //   title: 'vue-cli自动部署',
            //   collapsable: false,
            //   children: [
            // '1、前端工程化与webpack/2.vue-cli自动部署/',
            // '1、前端工程化与webpack/2.vue-cli自动部署/eslintrc.js语法规范.md'
            //   ]
            // },
            // {
            //   title: '前端工程化总结',
            //   collapsable: false,
            //   children: [
            // '1、前端工程化与webpack/',
            // '1、前端工程化与webpack/REVIEW.md'
            //   ]
            // }
            [
              '1、前端工程化与webpack/1.webpack配置、打包和发布/webpack.md',
              'webpack'
            ],
            ['1、前端工程化与webpack/2.vue-cli自动部署/vue-cli.md', 'vue-cli'],
            [
              '1、前端工程化与webpack/2.vue-cli自动部署/eslintrc.js语法规范.md',
              'ESLint语法规范'
            ],
            ['1、前端工程化与webpack/REVIEW.md', '前端工程化总结'],
            [
              '1、前端工程化与webpack/1.webpack配置、打包和发布/REVIEW.md',
              '回顾'
            ]
          ]
        },
        {
          title: 'vue指令与过滤器',
          collapsable: false,
          children: [
            // {
            //   title: 'vue指令与过滤器',
            //   collapsable: false,
            //   children: ['2、vue指令与过滤器/', '2、vue指令与过滤器/REVIEW.md']
            // },
            // {
            //   title: '品牌案例',
            //   collapsable: false,
            //   children: [
            // '2、vue指令与过滤器/品牌案例/前端布局设计.md',
            // '2、vue指令与过滤器/品牌案例/Bootstrap3.md',
            // '2、vue指令与过滤器/品牌案例/Bootstrap4.md',
            // '2、vue指令与过滤器/品牌案例/REVIEW.md'
            //   ]
            // }
            ['2、vue指令与过滤器/vue指令与过滤器.md', 'vue指令与过滤器'],
            ['2、vue指令与过滤器/REVIEW.md', '回顾'],
            ['2、vue指令与过滤器/品牌案例/前端布局设计.md', '【前端布局设计】'],
            ['2、vue指令与过滤器/品牌案例/Bootstrap3.md', '【Bootstrap3】'],
            ['2、vue指令与过滤器/品牌案例/Bootstrap4.md', '【Bootstrap4】'],
            ['2、vue指令与过滤器/品牌案例/REVIEW.md', '【知识回顾】']
          ]
        },
        {
          title: '计算机属性与监听器',
          collapsable: false,
          children: [
            [
              '3、计算机属性与监听器/计算机属性与监听器.md',
              '计算机属性与监听器'
            ],
            ['3、计算机属性与监听器/Axios.md', '【Axios使用】']
          ]
        },
        {
          title: 'vue组件——基础',
          collapsable: false,
          children: [
            ['4、vue组件 —— 基础/1.vue组件基础.md', 'vue组件基础'],
            ['4、vue组件 —— 基础/2.vue的生命周期.md', 'vue的生命周期'],
            ['4、vue组件 —— 基础/3.数据共享与ref引用.md', '数据共享与ref引用'],
            ['4、vue组件 —— 基础/REVIEW.md', '回顾']
          ]
        },
        {
          title: 'vue组件——高级',
          collapsable: false,
          children: [
            ['5、vue组件 —— 高级/0.Prop和自定义事件.md', 'Prop和自定义事件'],
            ['5、vue组件 —— 高级/1.动态组件.md', '动态组件'],
            ['5、vue组件 —— 高级/2.插槽.md', '插槽'],
            ['5、vue组件 —— 高级/3.自定义指令.md', '自定义指令']
          ]
        },
        {
          title: 'Vue Router插件',
          collapsable: false,
          children: [
            ['6、vue路由/vue路由（上）.md', 'vue路由（上）'],
            ['6、vue路由/vue路由（下）.md', 'vue路由（下）'],
            ['6、vue路由/vue路由进阶.md', 'vue路由进阶']
          ]
        },
        {
          title: 'Vuex插件',
          collapsable: false,
          children: [
            ['7、Vuex学习/Vuex.md', 'vuex'],
            ['7、Vuex学习/Vuex进阶.md', 'vuex进阶']
          ]
        },
        {
          title: 'Vue服务端渲染插件',
          collapsable: false,
          children: [['8、Vue服务端渲染/SSR.md', 'SSR']]
        }
      ],
      '/guide/node_Note/': [
        {
          title: 'Node.js入门',
          collapsable: false,
          children: [
            ['1、Node.js入门/1.Node基础与模块化.md', 'Node基础与模块化'],
            ['1、Node.js入门/2.包开发.md', '包开发'],
            ['1、Node.js入门/REVIEW.md', '回顾'],
            ['1、Node.js入门/正则表达式.md', '【正则表达式】']
          ]
        },
        {
          title: '模块',
          collapsable: false,
          children: [
            ['2、模块/1.内置API模块（上）.md', '内置模块（上）'],
            ['2、模块/2.内置API模块（下）.md', '内置模块（下）'],
            ['2、模块/3.第三方模块（包）.md', '包应用'],
            ['2、模块/REVIEW.md', '回顾'],
            ['2、模块/ES6-promise.md', '【ES6-promise】'],
            ['2、模块/数据请求.md', '【数据请求】'],
            ['2、模块/跨域.md', '【请求跨域】']
          ]
        },
        {
          title: '路由',
          collapsable: false,
          children: [
            ['3、路由/1.Node路由（上）.md', 'Node路由（上）'],
            ['3、路由/2.Node路由（下）.md', 'Node路由（下）'],
            ['3、路由/REVIEW.md', '回顾'],
            ['3、路由/API文档工具.md', '【API文档工具】'],
            ['3、路由/ES6-深浅拷贝.md', '【ES6-深浅拷贝】']
          ]
        },
        {
          title: 'Express学习',
          collapsable: false,
          children: [
            ['4、Express学习/1.Express路由.md', 'Express路由'],
            ['4、Express学习/2.MongoDB数据库.md', 'MongoDB数据库'],
            ['4、Express学习/3.登录鉴权.md', '登录鉴权'],
            ['4、Express学习/4.文件上传.md', '文件上传'],
            ['4、Express学习/MVC业务分层.md', '【MVC业务分层】'],
            ['4、Express学习/web开发模式.md', '【web开发模式】'],
            ['4、Express学习/接口开发规范.md', '【接口开发规范】']
          ]
        },
        {
          title: 'Koa学习',
          collapsable: false,
          children: [
            ['5、Koa学习/1.koa学习（上）.md', 'koa学习（上）'],
            ['5、Koa学习/2.koa学习（下）.md', 'koa学习（下）'],
            ['5、Koa学习/3.MySQL数据库.md', 'MySQL数据库']
          ]
        },
        {
          title: 'WebSocket学习',
          collapsable: false,
          children: [['6、WebSocket学习/websocket入门.md', 'websocket']]
        }
      ]
      // fallback 侧边栏被最后定义
      // '/': [''] //不能放在数组第一个，否则会导致右侧栏无法使用
    },

    //右侧边栏
    subSidebar: 'auto', //在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容

    markdown: {
      lineNumbers: true // 代码块显示行号
    }
  }
}
