
const searchFun = () =>{

    const filter = document.getElementById('find_info').value.toUpperCase();

    const infoCards = document.getElementsByClassName('info_cards');

    const infoCardTitle = document.getElementsByClassName('info_title')[1].innerHTML;

    console.log(infoCardTitle)

    for(var i=0; i<infoCards.length; i++){

        const infoCardTitle = document.getElementsByClassName('info_title')[i].innerHTML.toUpperCase();


        if(infoCardTitle){

            const textvalue = infoCardTitle;

            if(textvalue.indexOf(filter) > -1){
                infoCards[i].style.display= "";

            }   else{
                infoCards[i].style.display= "none";

            }

        }
        

    }


}