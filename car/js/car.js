let pos =[0,0,0,0,0]
let fPlay= true;
let cPosition= Math.ceil(Number(9/2));
score =0
$(document).ready(function () {
    for (i = 1; i < 46; i++) {
         $("#gameBoard").append('<div class="tic" id="' + i + '"></div>');
    }
   
    $('#' + cPosition).css("background-color", "white");
    $(document).keydown(function (e) { 
        moveCar(); 
    });
    $("#stack-replay").on('click', function () {
        if(fPlay)
        {
            play();
            iPosition =0;
            for(i=1; i<pos.length; i++)
            {
                pos.shift();
                pos.push(Math.floor(Math.random() * 10))
            }
            e= flow(iPosition);
       }else{
      window.parent.location = window.parent.location.href;
       }
    });

    // for the manual key 
    $("#arrowl").click(function () { document.dispatchEvent(new KeyboardEvent('keydown', { 'keyCode': 37 })); });
    $("#arrowr").click(function () { document.dispatchEvent(new KeyboardEvent('keydown', { 'keyCode': 39 })); });
   

});

function play(){
    fPlay=true;
    console.log('Start Play!')
    $('#stack-replay').css("z-index",1);    
}
function gameOver(){
    fPlay= false;
    console.log('Game Over!')
    $('#stack-replay').css("z-index",10).text("Game Over");    
}

function flow(iPostion) {
    if(Number(iPostion)==0)
        {
        $('.tic').css("background-color", "rgb(136, 138, 132)");
        $('.tic').css("background-image", "");
        iPosition = Math.floor(Math.random() * 10);
        $('#' + cPosition).css("background-image","url(/views/img/car-icon-user.png)");
            $('#' + cPosition).css("background-repeat","no-repeat");
            $('#' + cPosition).css("background-size"," 90% 100%");
        if (pos[0]==cPosition) {
           pos =[];
           gameOver();
 
        } else {
            score++;
            $(".score").text('Score: '+score);
        }
        
        }
    
        if(pos.length>5)
        {
            pos.shift();
        }
        pos.push(Math.floor(Math.random() * 9)+1);
        i=0;
        po = pos;
        for(j=0; j<po.length; j++)
        {  if(po[j]!=0){
             x= Number(Number(po[j])+(j-i)*9)
            $('#' + x).css("background-image","url(/views/img/car-icon-64.png)");
            $('#' + x).css("background-repeat","no-repeat");
            $('#' + x).css("background-size"," 90% 100%"); 
            }
            else{
                i++;
            }
        }
       if (iPosition < 46) {
            setTimeout(() => {
                $('#' + iPosition).css("background-color", "rgb(136, 138, 132)");
                iPosition = Number(Number(iPosition) + Number(9));
                if(pos.length>5)
                {
                    pos.shift();
                }
                if(fPlay){flow(iPostion); }
                
            }, 1000);
        }


}

//function to move left  right he box

function moveCar(e){
    e = e || window.event;
        if (e.keyCode == '37') {
             if(cPosition>1){
                cPosition= cPosition-1;
            }
            
            
        }
        else if (e.keyCode == '39') {
            if(cPosition<9){
                cPosition= cPosition+1;
            }
        }
}
