var path = require("path");
var fs = require("fs");
var express = require("express");
var exphbs = require("express-handlebars");

var weather = require("./weather");
var zip = require("./zip");
var app = express();
var port = process.env.PORT || 3000;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/twits/:index', function(req, res, next){
 console.log("==url params for request: ", req.params);
  next();
});

//statically serve v0/public files
app.use(express.static(path.join(__dirname, 'v0/public')));

//main handler
app.get('/', function(req, res, next){
   /*zip["sub"].forEach(function(zipcode){
     httpGet("http://api.openweathermap.org/data/2.5/weather?zip="
    + zipcode +",us&appid=01d189351de6cfc4bf0155a1e9734f03&&units=imperial");
  });*/
  var arg = httpGet();
  console.log(arg["spot"].temperature);
  res.render('weatherPage', arg);
});

function httpGet() {
  var xhr = new XMLHttpRequest(),
  method = "GET",
  url = "http://api.openweathermap.org/data/2.5/weather?zip=97331,us&appid=01d189351de6cfc4bf0155a1e9734f03&&units=imperial";

  xhr.open(method, url, true);
  xhr.onreadystatechange = function () {
    if(xhr.readyState == 4) {
      //console.log(xhr.responseText);
      var weather = JSON.parse(xhr.responseText);
      var templateArgs = {
        local: weather.main,
        spot: {
          temperature: weather.main.temp,
          location: weather.name
        }
      };
      return templateArgs;
    }
  };
//xhr.send();
}

//404 handler
app.get('*',function(req,res,next){
  res.status(404);
  res.render("404Page");
});

app.listen(port, function(err){
	console.log("Server runing on port: " + port);
});
