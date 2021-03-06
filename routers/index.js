import Router from 'koa-router';
import glob from 'glob';
import path from 'path';

const router = Router();

glob('routers/*.js', (err, files) => {
  if (err) {
    console.log('Get routers error.');
  } else {
    files.forEach(file => {
      if (file.indexOf('index') === -1) {
        require(path.join(__dirname, path.basename(file)));
      }
    });
  }
});

module.exports = router;
