const assert = require('power-assert');
const dbUtils = require('../../server/utils/db-util');
const userInfoService = require('../../server/services/user-info');

describe('#services/user-info.js', () => {

  describe('#create()', () => {
    after(() => {
      dbUtils.deleteDataById('user_info', '999');
    });
    it('#create(model) should return ', async () => {
      let userResult = await userInfoService.create({email: '888@gmail.com', password: '888', id: '999'});
      assert.equal(userResult.affectedRows, 1);
    });
  });

  describe('#getExistOne()', () => {
    it('#getExistOne(formData) should return resultData', async () => {
      let formData = {
        email: 'w@asd.com',
        userName: 'leon1851'
      };
      let result = {
        id: 2,
        email: 'w@asd.com',
        password: '12345678',
        name: 'leon1851',
        nick: null,
        detail_info: null,
        create_time: '1501033380237',
        modified_time: null,
        level: 1
      };
      let resultData = await userInfoService.getExistOne(formData);
      assert.deepEqual(resultData, result);
    });
  });

  describe('#validatorSignUp()', () => {
    it('#validatorSignUp(userInfo) should return {success: true, message: ""}', async () => {
      let result = await userInfoService.validatorSignUp({
        email: '888@gmail.com',
        password: '888888',
        confirmPassword: '888888',
        userName: 'linasd'
      });
      assert.equal(result.success, true);
    });
  });

  describe('#getUserInfoByUserName()', () => {
    it('#getUserInfoByUserName(userName) should return userInfo', async () => {
      let userInfo = await userInfoService.getUserInfoByUserName('leon1851');
      assert.equal(userInfo.userName, 'leon1851')
    });
  });

});