var connection = require('./connection.js')

var orm = {
  insertInto: function(tableInput, burgerInput,callback){
    var query = 'INSERT INTO '+ tableInput +' (burger_name, devoured) VALUES (?,0)'
    connection.query(query,[burgerInput], function(err, results){
      if(err) throw err;
    });
  },
  devour: function(tableInput, idInput,callback){
    var query = 'UPDATE '+ tableInput +' SET devoured=1 WHERE id=?'
    connection.query(query,[idInput], function(err, results){
      if(err) throw err;
      callback(null,results);
    });
  },
  displayToEat: function(tableInput, callback){
    var query = 'SELECT * FROM '+ tableInput +' WHERE devoured=0'
    var dataReturn;
    var data
    connection.query(query, function(err, result){
      if(err) throw err;
      var query2 = 'SELECT * FROM '+ tableInput +' WHERE devoured=1'
      connection.query(query2, function(err, results){
        if(err) throw err;
        callback(null,result, results);
      });
      //console.log(results)
      //callback(null,results);

    });

  },
  displayDevoured: function(tableInpupt,callback){
    var query = 'SELECT * FROM '+ tableInpupt +' WHERE devoured=1'
    connection.query(query, function(err, results){
      if(err) throw err;
      callback(null,results);
    });
  }
}
module.exports = orm;
