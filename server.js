var path = require("path");
var fs = require("fs");
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

//var weather = require("./weather");
var zip = require("./zip");
var app = express();
var port = process.env.PORT || 3000;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var templatesArgs;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//statically serve v0/public files
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'v0/public')));

function httpGet(callback) {
  var xhr = new XMLHttpRequest(),
  url = "http://api.openweathermap.org/data/2.5/weather?zip=97331,us&appid=01d189351de6cfc4bf0155a1e9734f03&&units=imperial";

  xhr.onreadystatechange = function() {
    if(this.readyState == 4) {
      var weather = JSON.parse(this.responseText);
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
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();
      if(dd<10){
        dd = '0'+dd;
      }
      if(mm<10){
        mm='0'+mm;
      }
      today = mm + '/' + dd + '/' + yyyy;
      templatesArgs = {
        local: {
          temp: weather.main.temp | 0,
          location: weather.name,
          date: today,
          curSp: Math.round(weather.wind.speed)
        }
        }
        res.render('weatherPage', templatesArgs);
      });

});

//post handler
app.post('/', function(req, res, next) {
  var zip = req.body.zipCode;
  fs.readFile('zip.json','utf8',function(err, data) {
    if(err){
      console.log(err);
    }else{
      var obj = JSON.parse(data);
      obj.sub.push(zip);
      var json = JSON.stringify(obj);
      fs.writeFile('zip.json',json,'utf8',function(err){
        if(err){
          console.log('Error: Unable to write zip.json.');
        }
      });
    }
  });
});

//404 handler
app.get('*',function(req,res,next){
  res.status(404);
  res.render("404Page");
});

app.listen(port, function(err){
	console.log(" -- Server runing on port: " + port + " -- ");
});
