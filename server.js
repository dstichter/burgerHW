var express = require('express')
var app = express();
var orm = require('./config/orm.js')
var bodyParser = require('body-parser')
var expressHandlebars = require('express-handlebars')

app.use(bodyParser.urlencoded({extended: false}));
var PORT = 8000;
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/',function(req,res){
  var x;
  var y;
  orm.displayToEat("burgers",function(err,results,results2){
    var data = {
      toEat: results,
      devoured: results2
    }
    console.log(data)
    res.render('index',data)
  })
});
app.post('/',function(req,res){
  orm.insertInto("burgers", req.body.burgerInput)
  res.redirect('/')
});
app.post('/devour/:id',function(req,res){
  orm.devour("burgers", req.params.id, function(err, results){
    res.redirect('/')
  });
});

app.listen(PORT, function(){
  console.log('Listening on %s', PORT)
})
