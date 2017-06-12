 var path = require("path");
 var fs = require("fs");
 var express = require("express");
 var exphbs = require("express-handlebars");

 var weather = require("./weather");
 var app = express();
 var port = process.env.PORT || 3000;

 app.engine('handlebars', exphbs({defaultLayout: 'main'}));
 app.set('view engine', 'handlebars');


 app.get('/twits/:index', function(req, res, next){
   console.log("==url params for request: ", req.params);
    next();
 });

app.use(express.static(path.join(__dirname, 'v0/public')));

 app.get('/', function(req, res, next){
   var templateArgs = {
     location: weather["main"].location,
     date: weather["main"].date,
     spot: weather["sub"]
   }
       res.render('weatherPage', templateArgs);
  });

 app.listen(port, function(err){
 	console.log("Server runing on port 3000");
 });
