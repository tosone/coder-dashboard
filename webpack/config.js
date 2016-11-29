const path = require('path');

const upperDir = '..';
const dir = path.join(__dirname, upperDir);
const srcDir = path.join(dir, 'public');

module.exports = {
  nodeModulesPath: path.join(dir, 'node_modules'),
  srcDir,
  entry: path.join(srcDir, 'app.js'),
  publicDir: path.join(srcDir, 'www'),
  mainCss: 'main.css',
  buildPath: path.join(__dirname, upperDir, 'build')
};
