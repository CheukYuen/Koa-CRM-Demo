const assert = require('power-assert');
const dbUtils = require('../../server/utils/db-util');
const user = require('../../server/models/user-info');


describe('#models/user-info.js', () => {
  after(() => {
    dbUtils.deleteDataById('user_info', '777');
  });

  describe('#create(model)', () => {
    it('#create()', async () => {
      let result = await user.create({email: '777@gmail.com', password: '777', id: '777'});
      assert.equal(result.affectedRows, 1);
    })
  });

  describe('getUserInfoByUserName(userName)', () => {
    it('getUserInfoByUserName()', async () => {
      let userName = 'leon1851';
      let result = {
        id: 2,
        email: 'w@asd.com',
        name: 'leon1851',
        create_time: '1501033380237'
      };
      let userData = await user.getUserInfoByUserName(userName);
      assert.deepEqual(userData, result);
    });

  });

});