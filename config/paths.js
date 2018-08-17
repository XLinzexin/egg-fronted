'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

const appDirectory = fs.realpathSync(process.cwd());    //process.cwd() ,node文件执行的目录，fs.realpathSync得到在服务器中的真正路径
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);    //根目录与路径合并，得到完整路径

const envPublicUrl = process.env.PUBLIC_URL;      //进程运行时的public文件夹目录

/**
 * 判断路径是否需要在结尾有'/'，并返回路径
 * @param  {String} path
 * @param  {Boolean} needsSlash
 * @return {String}
 */
function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
}

/**
 * 获取当前public文件夹目录????
 * @param  {String} appPackageJson
 * @return {String}
 */
const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;
//当一个app启动时，我们使用“publicurl”环境变量或“homepage”字段来推断“public path”
//Webpack需要知道它将正确的<script>放入HTML中，即使是单页应用程序可能开始于index.html，其中嵌套url例如 /todos/42
//我们不能在HTML中使用相对路径，因为我们不想加载某些东西
//例如 /todos/42/static/js/bundle.7289d.js。我们必须知道根目录。

function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),    //  undefiend
  servedPath: getServedPath(resolveApp('package.json')),  //  '/'
};
