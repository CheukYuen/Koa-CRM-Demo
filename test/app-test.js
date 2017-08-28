const app = require('../server/app');
const dbUtils = require('../server/utils/db-util');
const request = require('supertest');
const assert = require('power-assert');


describe('#test koa app', () => {

  let server = app.listen(3001);

  describe('#test POST /api/user/signUp.json', () => {
    after(() => {
      dbUtils.query("delete from user_info where email='222@gmail.com'");
    });
    it('#test POST /api/user/signUp.json', async () => {
      let result = {success: true, message: "", data: null};
      let res = await request(server)
        .post('/api/user/signUp.json')
        .type('form')
        .send({
          email: '222@gmail.com',
          password: '222222',
          confirmPassword: '222222',
          userName: 'lin222'
        })
        .then((callback) => {
          assert.deepEqual(JSON.parse(callback.text), result);
        });
    });
  });

  describe('#test POST /api/user/signIn.json', () => {
    before(() => {
      dbUtils.insertData("user_info", {email: '99@example.com', name: 'leonaaa', password: '123456', id: '4'})
    });
    after(() => {
      dbUtils.query("delete from user_info where id='4'");
    });
    it('#test POST /api/user/signIn.json', async () => {
      let result = {success: true, message: '', data: null, code: ''};
      let res = await request(server)
        .post('/api/user/signIn.json')
        .type('form')
        .send({
          password: '123456',
          userName: 'leonaaa'
        })
        .then((callback) => {
          assert.deepEqual(JSON.parse(callback.text), result);
        });
    });
  });

  // describe('#test GET /api/user/getUserInfo.json', () => {
  //
  //   it('#test POST /api/user/getUserInfo.json', async () => {
  //     // let result = {success: true, message: '', data: null, code: ''};
  //     let res = await request(server)
  //       .get('/api/user/getUserInfo.json')
  //       .send({
  //         password: '123456',
  //         userName: 'leonaaa'
  //       })
  //       .then((callback) => {
  //         console.log(callback);
  //         // assert.deepEqual(JSON.parse(callback.text), result);
  //       });
  //   });
  // });

});