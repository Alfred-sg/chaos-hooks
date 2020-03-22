import { ApplyPluginsType } from '/Users/alfred/Desktop/dvp/chaos-hooks/node_modules/_@umijs_runtime@3.0.12@@umijs/runtime/dist/index.js';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/",
    "component": (props) => require('react').createElement(require('/Users/alfred/Desktop/dvp/chaos-hooks/node_modules/_@umijs_preset-dumi@1.0.10@@umijs/preset-dumi/lib/themes/default/layout.js').default, {
      ...{"menus":{"*":{"*":[{"path":"/","title":"首页","meta":{"order":1}}],"/guide":[{"title":"guide","path":"/guide","meta":{},"children":[{"path":"/guide/use-form","title":"useForm","meta":{}},{"path":"/guide/use-fetch","title":"useFetch","meta":{}},{"path":"/guide/use-modal","title":"useModal","meta":{}},{"path":"/guide/use-table","title":"useTable","meta":{}}]}]}},"locales":[],"navs":{"*":[{"path":"/guide","title":"Guide"}]},"title":"chaos-hooks","mode":"site","repoUrl":"https://github.com/Alfred-sg/chaos-hooks"},
      ...props,
    }),
    "routes": [
      {
        "path": "/",
        "component": require('../../../docs/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1584871898000,
          "title": "首页",
          "order": 1,
          "hero": {
            "title": "chaos-hooks",
            "desc": "简易的 react-hooks 封装库",
            "actions": [
              {
                "text": "指南",
                "link": "/guide/use-form"
              }
            ]
          },
          "slugs": [
            {
              "depth": 2,
              "value": "✨ Features",
              "heading": "-features"
            },
            {
              "depth": 2,
              "value": "📦 Install",
              "heading": "-install"
            },
            {
              "depth": 2,
              "value": "🔨 Usage",
              "heading": "-usage"
            },
            {
              "depth": 2,
              "value": "🖥 Development",
              "heading": "-development"
            }
          ]
        },
        "title": "首页"
      },
      {
        "path": "/guide/use-fetch",
        "component": require('../../../docs/guide/use-fetch.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/guide/use-fetch.md",
          "updatedTime": 1584871898000,
          "group": {
            "title": "guide",
            "path": "/guide"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useFetch",
              "heading": "usefetch"
            },
            {
              "depth": 2,
              "value": "features",
              "heading": "features"
            },
            {
              "depth": 2,
              "value": "demos",
              "heading": "demos"
            },
            {
              "depth": 3,
              "value": "demo 1: fetch basic",
              "heading": "demo-1-fetch-basic"
            },
            {
              "depth": 3,
              "value": "demo 2: fetch manual",
              "heading": "demo-2-fetch-manual"
            },
            {
              "depth": 2,
              "value": "usage",
              "heading": "usage"
            },
            {
              "depth": 2,
              "value": "properties",
              "heading": "properties"
            }
          ],
          "title": "useFetch",
          "nav": {
            "path": "/guide",
            "title": "Guide"
          }
        },
        "title": "useFetch"
      },
      {
        "path": "/guide/use-form",
        "component": require('../../../docs/guide/use-form.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/guide/use-form.md",
          "updatedTime": 1584871898000,
          "group": {
            "title": "guide",
            "path": "/guide"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useForm",
              "heading": "useform"
            },
            {
              "depth": 2,
              "value": "features",
              "heading": "features"
            },
            {
              "depth": 2,
              "value": "demos",
              "heading": "demos"
            },
            {
              "depth": 3,
              "value": "demo 1: getFieldDecorator",
              "heading": "demo-1-getfielddecorator"
            },
            {
              "depth": 3,
              "value": "demo 2: registerField",
              "heading": "demo-2-registerfield"
            },
            {
              "depth": 2,
              "value": "usage",
              "heading": "usage"
            },
            {
              "depth": 2,
              "value": "properties",
              "heading": "properties"
            },
            {
              "depth": 2,
              "value": "apis",
              "heading": "apis"
            }
          ],
          "title": "useForm",
          "nav": {
            "path": "/guide",
            "title": "Guide"
          }
        },
        "title": "useForm"
      },
      {
        "path": "/guide/use-modal",
        "component": require('../../../docs/guide/use-modal.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/guide/use-modal.md",
          "updatedTime": 1584871898000,
          "group": {
            "title": "guide",
            "path": "/guide"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useModal",
              "heading": "usemodal"
            },
            {
              "depth": 2,
              "value": "features",
              "heading": "features"
            },
            {
              "depth": 2,
              "value": "demos",
              "heading": "demos"
            },
            {
              "depth": 3,
              "value": "demo 1: modal basic",
              "heading": "demo-1-modal-basic"
            },
            {
              "depth": 3,
              "value": "demo 2: modal with form",
              "heading": "demo-2-modal-with-form"
            },
            {
              "depth": 2,
              "value": "properties",
              "heading": "properties"
            }
          ],
          "title": "useModal",
          "nav": {
            "path": "/guide",
            "title": "Guide"
          }
        },
        "title": "useModal"
      },
      {
        "path": "/guide/use-table",
        "component": require('../../../docs/guide/use-table.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/guide/use-table.md",
          "updatedTime": 1584871898000,
          "group": {
            "title": "guide",
            "path": "/guide"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useTable",
              "heading": "usetable"
            },
            {
              "depth": 2,
              "value": "features",
              "heading": "features"
            }
          ],
          "title": "useTable",
          "nav": {
            "path": "/guide",
            "title": "Guide"
          }
        },
        "title": "useTable"
      },
      {
        "path": "/guide",
        "meta": {},
        "exact": true,
        "redirect": "/guide/use-form"
      }
    ],
    "title": "chaos-hooks"
  }
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };
