import glob from 'glob';
import path from 'path';
import Seneca from 'seneca';

const seneca = Seneca();

glob('services/*.js', (err, files) => {
  files.forEach(file => {
    if (file.indexOf('index') === -1) {
      require(path.join(__dirname, path.basename(file)));
    }
  });
});

seneca.listen();

module.exports = seneca;
