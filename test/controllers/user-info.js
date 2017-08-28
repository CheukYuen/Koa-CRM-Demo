const assert = require('power-assert');
const dbUtils = require('../../server/utils/db-util');
const userInfoService = require('../../server/services/user-info');
const userInfoController = require('../../server/controllers/user-info');

const context = require('../helpers/context');


describe('#controllers/user-info.js', () => {

  describe('#signUp() should return ', () => {
    after(() => {
      dbUtils.query('delete from user_info where email="q1@asd.com"');
    });

    it('#signUp()', async () => {
      let ctx = context();
      ctx.request.body = {
        email: 'q1@asd.com',
        userName: 'leon18511',
        password: '123456',
        confirmPassword: '123456'
      };

      let result = await userInfoController.signUp(ctx);
      assert.ifError(result)
    })
  });

  // describe('#getLoginUserInfo(ctx) should return ', () => {
  //   it('#getLoginUserInfo()', async () => {
  //     let ctx = context();
  //     let userResult = {
  //       name:'leonaaa',
  //       id:'1053'
  //     };
  //     let session = ctx.session;
  //     session.isLogin = true;
  //     session.userName = userResult.name;
  //     session.userId = userResult.id;
  //     let result = await userInfoController.getLoginUserInfo(ctx);
  //     console.log(result);
  //   })
  // });

});