import Seneca from 'seneca';
import Promise from 'bluebird';

const router = require('.');
const seneca = Seneca();
const client = seneca.client();
const act = Promise.promisify(seneca.act, {
  context: seneca,
});

router.post('/signup', async(ctx, next) => {
  const body = ctx.request.body;
  const name = body.name;
  const pwd = body.pwd;
  ctx.body = await act({
    role: 'user',
    cmd: 'signup',
  }, {
    name,
    pwd,
  });
});

router.post('/login', async(ctx, next) => {
  ctx.body = await act({
    role: 'user',
    cmd: 'login',
  }, {
    name,
    pwd,
  });
});

router.get('/getInfo', async(ctx, next) => {
  ctx.body = await act({
    role: 'waka',
    cmd: 'getinfo',
  });
});

module.exports = router;
