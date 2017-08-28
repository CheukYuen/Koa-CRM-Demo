const Router = require('koa-router');

const api = require('./api');

let router = new Router();
router.use('/api', api.routes(), api.allowedMethods());

module.exports = router;