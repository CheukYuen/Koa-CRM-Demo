const path = require('path');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const koaStatic = require('koa-static');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const config = require('./../config');
const routers = require('./routers/index');


const app = new Koa();

const THIRTY_MINTUES = 30 * 60 * 1000;
const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;

// session存储配置
const sessionMysqlConfig = {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST,
};

// 配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig),
  rolling: true,
  cookie: {
    maxAge: ONE_MONTH
  }
}));
//
app.use(koaLogger());

app.use(bodyParser());

app.use(koaStatic(
  path.join(__dirname, './../static')
));

// 加载路由中间件
app.use(routers.routes()).use(routers.allowedMethods());


module.exports = app;