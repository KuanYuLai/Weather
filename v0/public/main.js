var addLocation = document.getElementById('addLocation');
var backdrop = document.getElementById('backdrop');
var popout = document.getElementById('popout');
var closeBtn = document.querySelector('.close-btn');
var cancelBtn = document.querySelector('.cancel-btn');

addLocation.addEventListener('click', function(){

  backdrop.classList.remove('hidden');
  popout.classList.remove('hidden');

});

closeBtn.addEventListener('click', function(){

  backdrop.classList.add('hidden');
  popout.classList.add('hidden');

});

cancelBtn.addEventListener('click', function(){

  backdrop.classList.add('hidden');
  popout.classList.add('hidden');

});
