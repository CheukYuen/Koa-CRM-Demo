const dbUtils = require('../../server/utils/db-util');
const assert = require('power-assert');


describe('#db-util.js', () => {

  before(function () {
    dbUtils.insertData("user", {email: '99@example.com', password: '123456', id: '10'});
  });
  describe('#query()', () => {
    it('#query("SELECT * FROM ?? WHERE id = ? ", ["usr_info", 1]) should return userOne', () => {
      let userOne = [{
        id: 1,
        email: 'admin001@example.com',
        password: '123456',
        name: 'admin001',
        nick: null,
        detail_info: null,
        create_time: null,
        modified_time: null,
        level: null
      }];
      let promise = dbUtils.query("SELECT * FROM ?? WHERE id = ? ", ["user_info", 1]);
      return promise.then(value => {
        assert.deepEqual(value, userOne);
      });

    });
  });

  describe('#createTable()', () => {
    after(() => {
      dbUtils.query('drop table test_table', []);
    });
    let okPacket = {
      fieldCount: 0,
      affectedRows: 0,
      insertId: 0,
      serverStatus: 2,
      warningCount: 0,
      message: '',
      protocol41: true,
      changedRows: 0
    };
    it('#createTable() should return okPacket', () => {
      let promise = dbUtils.createTable("CREATE TABLE IF NOT EXISTS test_table ( id int(11) NOT NULL AUTO_INCREMENT, PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8");
      return promise.then(value => {
        assert.deepEqual(value, okPacket);
      });
    });
  });

  describe('#findDataById()', () => {
    it('#findDataById("usr_info", "1") should return userOne', () => {
      let userOne = [{
        id: 1,
        email: 'admin001@example.com',
        password: '123456',
        name: 'admin001',
        nick: null,
        detail_info: null,
        create_time: null,
        modified_time: null,
        level: null
      }];
      let promise = dbUtils.findDataById('user_info', '1');
      return promise.then(value => {
        assert.deepEqual(value, userOne);
      });

    });
  });

  describe('#findDataByPage()', () => {
    it('#findDataByPage("user", "email", "1", "2") should return users', () => {
      let users = [{email: '2@example.com'}, {email: '3@example.com'}];
      let promise = dbUtils.findDataByPage("user", "email", 1, 2);
      return promise.then(value => {
        assert.deepEqual(value, users);
      });
    });
  });


  describe('#insertData()', () => {
    it('#insertData() should return value.affectedRows 1,', () => {
      afterEach(function () {
        dbUtils.deleteDataById('user', '98');
      });

      let promise = dbUtils.insertData("user", {email: '99@example.com', password: '123456', id: '98'});
      return promise.then(value => {
        assert.equal(value.affectedRows, 1);
      });
    });
  });

  describe('#updateData()', () => {
    it('#updateData() should return ', () => {

      let promise = dbUtils.updateData('user', {email: '321@example.com', password: '321',}, 1);
      return promise.then(value => {
        assert.equal(value.affectedRows, 1);
      });
    });
  });


  describe('#deleteDataById()', () => {
    it('#deleteDataById() should return ', () => {

      let promise = dbUtils.deleteDataById('user', '10');
      return promise.then(value => {
        assert.equal(value.affectedRows, 1);
      });
    });
  });

  describe('#select()', () => {
    it('#select() should return ', () => {

      let promise = dbUtils.select('user', 'email');
      return promise.then(value => {
        assert(value);
      });
    });
  });

  describe('#count()', () => {
    it('#count() should return total_count', () => {

      let promise = dbUtils.count('user');
      return promise.then(value => {
        assert.equal(Object.keys(value[0]), 'total_count');
      });
    });
  });

  describe('#selectByName()', () => {
    it('#selectByName() should return ', () => {
      let result = [{
        id: 2,
        email: 'w@asd.com',
        name: 'leon1851',
        create_time: '1501033380237' }];
      let promise = dbUtils.selectByName('user_info',
        ['id', 'email', 'name', 'create_time'],
        'leon1851');
      return promise.then(value => {
        // assert.equal(Object.keys(value[0]), 'total_count');
        assert.deepEqual(value, result);

      });
    });
  });

});