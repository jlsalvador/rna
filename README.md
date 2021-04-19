<p align="center">
    <a href="https://www.chialab.io/p/rna">
        <img alt="RNA logo" width="144" height="144" src="https://raw.githack.com/chialab/rna/main/logo.svg" />
    </a>
</p>

<p align="center">
    <strong>RNA</strong> • A bundler, a server and a test runner for modern modules and applications.
</p>

---

## Quick usage

```sh
$ npm i @chialab/rna -D
$ yarn add @chialab/rna -D
```

**package.json**
```json
{
    "scripts": {
        "start": "rna serve src --port 3000",
        "build": "rna build src/index.html --output public",
        "test": "rna test 'test/**/*.spec'"
    }
}
```

See more [here]((./packages/rna)).

---

## Packages

| **Package** | **Description** | **Version** |
| ----------- | --------------- | --------------- |
| [@chialab/esbuild-plugin-any-file](./packages/esbuild-plugin-any-file) | A loader plugin for esbuild for files with unknown loader. | [<img src="https://img.shields.io/npm/v/@chialab/esbuild-plugin-any-file" alt="npm" />](https://www.npmjs.com/package/@chialab/esbuild-plugin-any-file) |
| [@chialab/esbuild-plugin-env](./packages/esbuild-plugin-env) | Define all environement variables for esbuild. | [<img src="https://img.shields.io/npm/v/@chialab/esbuild-plugin-env" alt="npm" />](https://www.npmjs.com/package/@chialab/esbuild-plugin-env) |
| [@chialab/esbuild-plugin-html](./packages/esbuild-plugin-html) | A HTML loader plugin for esbuild. | [<img src="https://img.shields.io/npm/v/@chialab/esbuild-plugin-html" alt="npm" />](https://www.npmjs.com/package/@chialab/esbuild-plugin-html) |
| [@chialab/esbuild-plugin-meta-url](./packages/esbuild-plugin-meta-url) | A file loader plugin for esbuild for constructed URLs using import metadata. | [<img src="https://img.shields.io/npm/v/@chialab/esbuild-plugin-meta-url" alt="npm" />](https://www.npmjs.com/package/@chialab/esbuild-plugin-meta-url) |
| [@chialab/esbuild-plugin-postcss](./packages/esbuild-plugin-postcss) | A CSS loader plugin for esbuild that uses postcss as preprocessor. | [<img src="https://img.shields.io/npm/v/@chialab/esbuild-plugin-postcss" alt="npm" />](https://www.npmjs.com/package/@chialab/esbuild-plugin-postcss) |
| [@chialab/esbuild-plugin-webpack-include](./packages/esbuild-plugin-webpack-include) | A plugin for esbuild that converts the webpackInclude syntax. | [<img src="https://img.shields.io/npm/v/@chialab/esbuild-plugin-webpack-include" alt="npm" />](https://www.npmjs.com/package/@chialab/esbuild-plugin-webpack-include) |
| [@chialab/postcss-preset-chialab](./packages/postcss-preset-chialab) | The postcss preset used by Chialab. | [<img src="https://img.shields.io/npm/v/@chialab/postcss-preset-chialab" alt="npm" />](https://www.npmjs.com/package/@chialab/postcss-preset-chialab) |
| [@chialab/rna](./packages/rna) | A bundler, a server and a test runner for modern modules and applications. | [<img src="https://img.shields.io/npm/v/@chialab/rna" alt="npm" />](https://www.npmjs.com/package/@chialab/rna) |
| [@chialab/rna-browser-test-runner](./packages/rna-browser-test-runner) | A test runner for browsers on Web Test Runner. | [<img src="https://img.shields.io/npm/v/@chialab/rna-browser-test-runner" alt="npm" />](https://www.npmjs.com/package/@chialab/rna-browser-test-runner) |
| [@chialab/rna-bundler](./packages/rna-bundler) | A JavaScript, CSS and HTML bundler based on esbuild. | [<img src="https://img.shields.io/npm/v/@chialab/rna-bundler" alt="npm" />](https://www.npmjs.com/package/@chialab/rna-bundler) |
| [@chialab/rna-web-server](./packages/rna-web-server) | A webapp server based on Web Dev Server. | [<img src="https://img.shields.io/npm/v/@chialab/rna-web-server" alt="npm" />](https://www.npmjs.com/package/@chialab/rna-web-server) |
| [@chialab/wds-plugin-hmr-css](./packages/wds-plugin-hmr-css) | Enable CSS hmr for the web dev server. | [<img src="https://img.shields.io/npm/v/@chialab/wds-plugin-hmr-css" alt="npm" />](https://www.npmjs.com/package/@chialab/wds-plugin-hmr-css) |
| [@chialab/wds-plugin-postcss](./packages/wds-plugin-postcss) | A CSS loader plugin for the Web Dev Server that uses postcss as preprocessor. | [<img src="https://img.shields.io/npm/v/@chialab/wds-plugin-postcss" alt="npm" />](https://www.npmjs.com/package/@chialab/wds-plugin-postcss) |

---

## License

RNA is released under the [MIT](https://github.com/chialab/rna/blob/master/LICENSE) license.
