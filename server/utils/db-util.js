const allConfig = require('./../../config');
const config = allConfig.database;
const mysql = require('mysql');

const pool = mysql.createPool({
  host: config.HOST,
  user: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE
});


/**
 *
 * @param {string} sql
 * @param {Array} values
 * @returns {Promise}
 */
let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        resolve(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release();
        })
      }
    })
  })
};

let createTable = function (sql) {
  return query(sql, [])
};


let findDataById = function (table, id) {
  let _sql = "SELECT * FROM ?? WHERE id = ? ";
  return query(_sql, [table, id])
};


let findDataByPage = function (table, keys, start, end) {
  let _sql = "SELECT ?? FROM ??  LIMIT ? , ?";
  return query(_sql, [keys, table, start, end])
};


let insertData = function (table, values) {
  let _sql = "INSERT INTO ?? SET ?";
  return query(_sql, [table, values])
};


let updateData = function (table, values, id) {
  let _sql = "UPDATE ?? SET ? WHERE id = ?";
  return query(_sql, [table, values, id])
};


let deleteDataById = function (table, id) {
  let _sql = "DELETE FROM ?? WHERE id = ?";
  return query(_sql, [table, id])
};


let select = function (table, keys) {
  let _sql = "SELECT ?? FROM ??";
  return query(_sql, [keys, table])
};

let selectByName = function (table, keys, name) {
  let _sql = "SELECT ?? FROM ?? WHERE name = ?";
  return query(_sql, [keys, table, name])
};

let count = function (table) {
  let _sql = "SELECT COUNT(*) AS total_count FROM ?? ";
  return query(_sql, [table])
};

module.exports = {
  query,
  createTable,
  findDataById,
  findDataByPage,
  deleteDataById,
  insertData,
  updateData,
  select,
  selectByName,
  count,
};
