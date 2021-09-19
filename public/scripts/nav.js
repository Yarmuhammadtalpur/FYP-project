$(document).ready( $(function(){
    
    var navbtn = $('.navbar-toggler')

    $(navbtn).click(function (e) { 
        
        $(navbtn).toggleClass('collapsed');
        
    });
} ))