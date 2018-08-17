"use strict";

const autoprefixer = require("autoprefixer"); //自动添加css前缀插件
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //html webpack生成插件
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");
const eslintFormatter = require("react-dev-utils/eslintFormatter");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const getClientEnvironment = require("./env");
const paths = require("./paths");
const antdTheme = require("./antd-theme");

console.log(require.resolve("less-loader"));
// Webpack 使用 `publicPath` 确定app是从哪个目录启动.
// 在开发环境中, 我们总是使用根目录，这让配置更加简单。
const publicPath = "/";
// `publicUrl` 和 `publicPath` 相似, 但我们将规定他在我们的app中，
// 省略'/' ，因为 %PUBLIC_PATH%/lzx 看上去比 %PUBLIC_PATH%lzx更清晰.
const publicUrl = "";

//获取客户端环境变量
const env = getClientEnvironment(publicUrl);

// 开发环境配置
module.exports = {
  // 如果您希望在DevTools中看到已编译的输出，您可能需要“eval”。
  // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
  devtool: "cheap-module-source-map",
  // 前两个值支持“热”CSS和JS的自动刷新，第三个值是app入口文件
  entry: [
    // We ship a few polyfills by default:
    //定制的服务
    require.resolve("./polyfills"),
    // webpack自带的服务
    // require.resolve('webpack-dev-server/client') + '?/',
    // require.resolve('webpack/hot/dev-server'),
    require.resolve("react-dev-utils/webpackHotDevClient"),
    // Finally, this is your app's code:
    paths.appIndexJs
  ],
  output: {
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // 这不会生成真的文件，这只是虚拟路径当WebpackDevServer在开发环境启动。
    filename: "static/js/bundle.js",
    // 如果使用代码分割，也会有额外的JS块文件。
    chunkFilename: "static/js/[name].chunk.js",
    // This is the URL that app is served from. We use "/" in development.
    publicPath: publicPath,
    // 资源映射到原始磁盘位置（在Windows上作为URL格式）
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")
  },
  resolve: {
    // 设置node_modules文件夹的路径，当Webpack在寻找时。
    // https://github.com/facebookincubator/create-react-app/issues/253
    modules: ["node_modules", paths.appNodeModules].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    // 支持的格式
    // https://github.com/facebookincubator/create-react-app/issues/290
    extensions: [".web.js", ".mjs", ".js", ".json", ".web.jsx", ".jsx"],
    alias: {
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      "react-native": "react-native-web"
    },
    plugins: [
      // 防止用户从src/（或node_modules/）外部导入文件，避免不必要的错误。
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])
    ]
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: "pre",
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve("eslint")
            },
            loader: require.resolve("eslint-loader")
          }
        ],
        include: paths.appSrc
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000,
              name: "static/media/[name].[hash:8].[ext]"
            }
          },
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve("babel-loader"),
            options: {
              plugins: [
                ["import", [{ libraryName: "antd", style: true }]] // import less
              ],
              presets: [require.resolve("babel-preset-react-app")],
              cacheDirectory: true
            }
          },
          {
            test: /\.css|less$/,
            use: [
              require.resolve("style-loader"),
              {
                loader: require.resolve("css-loader"),
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: require.resolve("postcss-loader"),
                options: {
                  ident: "postcss",
                  plugins: () => [
                    require("postcss-flexbugs-fixes"),
                    autoprefixer({
                      browsers: [
                        ">1%",
                        "last 4 versions",
                        "Firefox ESR",
                        "not ie < 9" // React doesn't support IE8 anyway
                      ],
                      flexbox: "no-2009"
                    })
                  ]
                }
              },
              {
                loader: require.resolve("less-loader"),
                options: {
                  javascriptEnabled: true,
                  modifyVars: antdTheme
                }
              }
            ]
          },
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.(css|less)$/, /\.json$/],
            loader: require.resolve("file-loader"),
            options: {
              name: "static/media/[name].[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    new InterpolateHtmlPlugin(env.raw),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    }),
    // Add module names to factory functions so they appear in browser profiler.
    new webpack.NamedModulesPlugin(),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
    new webpack.DefinePlugin(env.stringified),
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebookincubator/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  },
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false
  }
};
