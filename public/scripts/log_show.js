var pwd = document.getElementById('Password');
var eye = document.getElementById('flexSwitchCheckDefault');
var show3 = document.getElementById('show3');
var btn_submit = document.getElementById('btn_submit');

eye.addEventListener('click',togglePass);

function togglePass(){

   eye.classList.toggle('active');

   (pwd.type == 'password') ? pwd.type = 'text' : pwd.type = 'password';
   (show3.innerHTML == 'Show Password') ? show3.innerHTML = 'Hide Password' : show3.innerHTML = 'Show Password';
}


btn_submit.addEventListener('click',togglePass2);

function togglePass2(){

   pwd.type = 'password';

}