        setTimeout( ()=>{
            $(".preloader-wrapper").fadeToggle();
        }, 1000)

        
    //  $(window).on("load", function(){
    //         $(".preloader-wrapper").fadeOut('slow');
    //       });


          $(document).ready(function()
          {
              $('img').bind('contextmenu', function(e){
                  return false;
              }); 
          });