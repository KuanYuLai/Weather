var path = require("path");
var fs = require("fs");
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

//var weather = require("./weather");
var app = express();
var port = process.env.PORT || 3000;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var templatesArgs;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//statically serve v0/public files
app.use(bodyParser.json());

function httpGet(url, callback) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if(this.readyState == 4) {
      var weather = JSON.parse(this.responseText);
      }
      if(weather)
        callback(weather);
  };
  xhr.open('GET', url, true);
  xhr.send();
}

//main handler
app.get('/', function(req, res, next){
  // Get Forecast Data
  fs.readFile('zip.json', 'utf-8', function(err, data){
      if(err)
        throw err;
      else {
        var maincode = JSON.parse(data);
        var main = maincode.main;
        var sub = maincode.sub;
        httpGet("http://api.openweathermap.org/data/2.5/forecast?zip=" + main + ",us&appid=01d189351de6cfc4bf0155a1e9734f03&units=imperial",
          function (weather){

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
             location: weather.city.name,
             date: today,
             temp: weather.list[0].main.temp | 0,
             noonD: weather.list[1].main.temp | 0,
             noonImg: 'cloudy-use',
             afternoonD: weather.list[2].main.temp | 0,
             afternoonImg: 'mostly-cloudy-use',
             eveningD: weather.list[3].main.temp | 0,
             eveningImg: 'sunny-use',
             tonightD: weather.list[4].main.temp | 0,
             tonightImg: 'sunny-use',
             curSp: weather.list[0].wind.speed | 0,
             ow: weather.list[1].wind.speed | 0,
             sw: weather.list[2].wind.speed | 0,
             tw: weather.list[3].wind.speed | 0,
             fw: weather.list[4].wind.speed | 0
           },
           sub:[]
         };//END Get Forecast Data

//====================Get Sub Data===========================================
        //console.log(sub);
        sub.forEach(function(value){
          httpGet("http://api.openweathermap.org/data/2.5/weather?zip="+ value + ",us&appid=01d189351de6cfc4bf0155a1e9734f03&units=imperial",
        function(weather){
            var data = {
              location: weather.name,
              temperature: weather.main.temp | 0,
              zipCode: value,
              disappear: "disappear(" + value + ")",
              appear: "appear(" + value + ")",
              remove: "remove(" + value + ")"
            };
            if(data)
              templatesArgs["sub"].push(data);

            if(templatesArgs.sub.length == sub.length){
              templatesArgs.sub.sort(function(a, b){
                return a.temperature - b.temperature;
              });
              res.render('weatherPage', templatesArgs);
            }
        });
      });//forEach

//===========================================================================

        })
      }
    });//fs.readFile
  });

app.use(express.static(path.join(__dirname, 'v0/public')));

//post handler
app.post('/', function(req, res, next) {
  var zip = req.body.zipCode;
  var setting = req.body.setting;
    fs.readFile('zip.json','utf8',function(err, data) {
      if(err){
        console.log(err);
      }else{
        var obj = JSON.parse(data);

        if(!setting){
          obj.sub.push(zip);
        }
        else{
          obj.main = zip;
        }

        var json = JSON.stringify(obj, null, 2);
        fs.writeFile('zip.json',json,'utf8',function(err){
          if(err){
            console.log('Error: Unable to write zip.json.');
          }
        });
      }
    });//readFile
});

//404 handler
app.get('*',function(req,res){
  console.log("== error: 404");
  res.status(404);
  res.render("404Page");
});

app.listen(port, function(err){
	console.log(" -- Server runing on port: " + port + " -- ");
});
