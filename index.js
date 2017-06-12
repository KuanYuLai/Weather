//listeners
document.getElementById('addLocation').addEventListener("click", show);
var backdrop = document.getElementById('backdrop');
var popout = document.getElementById('popout');
document.querySelector('.add-btn').addEventListener('click', add);
document.querySelector('.close-btn').addEventListener('click', hide);
document.querySelector('.cancel-btn').addEventListener('click', hide);

function show() {
  backdrop.classList.remove('hidden');
  popout.classList.remove('hidden');
}

function hide(){
  backdrop.classList.add('hidden');
  popout.classList.add('hidden');
  document.getElementById('zip-input').value = "";
}

function add(){
  var url = "http://api.openweathermap.org/data/2.5/weather?zip=97331,us&appid=01d189351de6cfc4bf0155a1e9734f03&&units=imperial";
  loadJSON(url, gotdata);
  location.reload();
}
