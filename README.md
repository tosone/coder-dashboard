# coder-dashboard
coder-dashboard

### Step
- `npm run update`
- `npm install`
- `npm start`
- `npm run client`

### Notice
If you have this problem:
``` bash
[nodemon] 1.9.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `babel-node index.js`
[nodemon] Internal watch failed: watch /home/tosone/Desktop/github/my/coder-dashboard/models ENOSPC
```
Then you can run this command:
``` bash
echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```