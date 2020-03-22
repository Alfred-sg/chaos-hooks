import { ApplyPluginsType } from '/Users/alfred/Desktop/dvp/chaos-hooks/node_modules/_@umijs_runtime@3.0.12@@umijs/runtime/dist/index.js';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/",
    "component": (props) => require('react').createElement(require('/Users/alfred/Desktop/dvp/chaos-hooks/node_modules/_@umijs_preset-dumi@1.0.10@@umijs/preset-dumi/lib/themes/default/layout.js').default, {
      ...{"menus":{"*":{"*":[{"path":"/","title":"首页","meta":{"order":1}},{"title":"guide","path":"/guide","meta":{},"children":[{"path":"/guide/use-form","title":"useForm","meta":{}},{"path":"/guide/use-fetch","title":"useFetch","meta":{}},{"path":"/guide/use-modal","title":"useModal","meta":{}},{"path":"/guide/use-table","title":"useTable","meta":{}}]}]}},"locales":[],"navs":{},"title":"chaos-hooks","mode":"doc","repoUrl":"https://github.com/Alfred-sg/chaos-hooks"},
      ...props,
    }),
    "routes": [
      {
        "path": "/",
        "component": require('../../../docs/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": null,
          "title": "首页",
          "order": 1,
          "hero": {
            "title": "chaos-hooks",
            "desc": "简易的 react-hooks 封装库",
            "actions": [
              {
                "text": "快速上手",
                "link": "/guide/getting-started"
              }
            ]
          },
          "slugs": [
            {
              "depth": 2,
              "value": "轻松上手",
              "heading": "轻松上手"
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
          "updatedTime": null,
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
            }
          ],
          "title": "useFetch"
        },
        "title": "useFetch"
      },
      {
        "path": "/guide/use-form",
        "component": require('../../../docs/guide/use-form.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/guide/use-form.md",
          "updatedTime": null,
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
            }
          ],
          "title": "useForm"
        },
        "title": "useForm"
      },
      {
        "path": "/guide/use-modal",
        "component": require('../../../docs/guide/use-modal.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/guide/use-modal.md",
          "updatedTime": null,
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
            }
          ],
          "title": "useModal"
        },
        "title": "useModal"
      },
      {
        "path": "/guide/use-table",
        "component": require('../../../docs/guide/use-table.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/guide/use-table.md",
          "updatedTime": null,
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
          "title": "useTable"
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
