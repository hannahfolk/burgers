const connection = require("../config/connection.js");

const printQuestionMarks = (num) => {
  const arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
};

// Helper function to convert object key/value pairs to SQL syntax
const objToSql = (ob) => {
  const arr = [];

  for (let key in ob) {
    let value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }

  return arr.toString();
};

const orm = {
  selectAll: function (tableInput, cb) {
    const queryStr = `SELECT * FROM ${tableInput};`;

    connection.query(queryStr, (err, result) => {
      if (err) throw err;

      cb(result);
    });
  },
  insertOne: function (table, cols, vals, cb) {
    let queryStr = `INSERT INTO ${table}`;

    queryStr += " (";
    queryStr += cols.toString();
    queryStr += ") ";
    queryStr += "VALUES (";
    queryStr += printQuestionMarks(vals.length);
    queryStr += ") ";

    console.log(queryStr);

    connection.query(queryStr, vals, (err, result) => {
      if (err) throw err;

      cb(result);
    });
  },

  updateOne: function (table, objColVals, condition, cb) {
    let queryStr = `UPDATE ${table}`;

    queryStr += " SET ";
    queryStr += objToSql(objColVals);
    queryStr += " WHERE ";
    queryStr += condition;

    console.log(queryStr);

    connection.query(queryStr, (err, result) => {
      if (err) throw err;

      cb(result);
    });
  },
};

module.exports = orm;
