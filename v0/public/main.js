//globals
var backdrop = document.getElementById('backdrop');
var popout = document.getElementById('popout');

/*
Function: show()
Description: shows the hidden elements
*/
function show() {
  backdrop.classList.remove('hidden');
  popout.classList.remove('hidden');
}

/*
Function: hide()
Description: hides the previously hidden elements
*/
function hide(){
  backdrop.classList.add('hidden');
  popout.classList.add('hidden');
  document.getElementById('zip-input').value = "";
}

/*
Function: add()
Description: checks the zip code and handles the nessesary functions
*/
function add(){
  // var url = "http://api.openweathermap.org/data/2.5/weather?zip=97331,us&appid=01d189351de6cfc4bf0155a1e9734f03&&units=imperial";
  // loadJSON(url, gotdata);
  // location.reload();

  var zip = document.getElementById('zip-input').value;
  //this is some black magic for checking zip codes
  var val_zip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip.toString());
  if(val_zip){
    store_zip(zip);
    add_dom(zip);
    hide();
  }else{
    console.log("Error: Invalid zip code.");
    alert("Invalid zip code!");
    document.getElementById('zip-input').value = "";
  }
}

/*
Function: store_zip()
Description: sends a POST XML request to the server to add the zip to zip.json
*/
function store_zip(zip) {
  var postURL = "/";
  var postRequest = new XMLHttpRequest();

  postRequest.open('POST',postURL);
  postRequest.seRequestHeader('Content-type','application/json');

  postRequest.addEventListener('load', function(event){
    var error;
    if(event.target.status !== 200){
      error = event.target.response;
    }
    callback(error);
  });

  var post_content = { zip: zip };
  postRequest.send(JSON.stringify(post_content));
}

/*
Function: add_dom()
Description: adds the sub-display for the new zip code to the DOM
*/
function add_dom(zip) {
  var xhr = new XMLHttpRequest();
  var method = "GET";
  var url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip.toString() + ",us&appid=01d189351de6cfc4bf0155a1e9734f03&&units=imperial";
  xhr.open(method, url, true);
  xhr.onreadystatechange = function () {
    if(xhr.readyState == 4) {
      var weather = JSON.parse(xhr.responseText);
      var templateArgs = {
        temperature: weather.main.temp,
        location: weather.name,
      };
      return templateArgs;
    }
  };
  var subDisplayTemplate = Handlebars.templates.subDisplay;

  var subDisplayHTML = subDisplayTemplate(templateArgs);

  var subDisplayContainer = document.getElementsByClass('sub-display-container')[0];
  subDisplayContainer.insertAdjacentHTML('beforeend',subDisplayHTML);
}

//listeners
window.addEventListener('DOMContentLoaded',function(event){
  document.getElementById('addLocation').addEventListener("click", show);
  document.querySelector('.add-btn').addEventListener('click', add);
  document.querySelector('.close-btn').addEventListener('click', hide);
  document.querySelector('.cancel-btn').addEventListener('click', hide);
});
