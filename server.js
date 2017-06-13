var path = require("path");
var fs = require("fs");
var express = require("express");
var exphbs = require("express-handlebars");

//var weather = require("./weather");
var zip = require("./zip");
var app = express();
var port = process.env.PORT || 3000;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var templatesArgs;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//statically serve v0/public files
app.use(express.static(path.join(__dirname, 'v0/public')));

function httpGet(callback) {
  var xhr = new XMLHttpRequest(),
  url = "http://api.openweathermap.org/data/2.5/weather?zip=97331,us&appid=01d189351de6cfc4bf0155a1e9734f03&&units=imperial";

  xhr.onreadystatechange = function() {
    if(this.readyState == 4) {
      var weather = JSON.parse(this.responseText);
      console.log(weather.name);
      callback(weather);
      }
  };
  xhr.open('GET', url, true);
  xhr.send();
}

//main handler
app.get('/', function(req, res, next){
   /*zip["sub"].forEach(function(zipcode){
     httpGet("http://api.openweathermap.org/data/2.5/weather?zip="
    + zipcode +",us&appid=01d189351de6cfc4bf0155a1e9734f03&&units=imperial");
  });*/


  httpGet(function render(weather){
      templatesArgs = {
        local: {
          temp: weather.main.temp | 0,
          location: weather.name
        }
        }
        res.render('weatherPage', templatesArgs);
        })
});

//post handler
// app.post( , function(req, res, next) {
//
//   fs.writeFile('zip.json', JSON.stringify(zipData), function(err) {
//     if (err) {
//       res.status(500).send("Unable to save zip to \"database\"");
//     } else {
//       res.status(200).send();
//     }
//   });
// });

//404 handler
app.get('*',function(req,res,next){
  res.status(404);
  res.render("404Page");
});

app.listen(port, function(err){
	console.log("Server runing on port: " + port);
});
