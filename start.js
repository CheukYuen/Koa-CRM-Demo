const app = require('./server/app');
const config = require('./config');

// 监听启动端口
app.listen(config.port);
console.log(`the server is start at port ${config.port}`);