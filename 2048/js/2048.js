$(document).ready(function () {
    let emptySet; 
    let stka = [];
    let stkb = [];
    let stkc = [];
    let stkd = [];
    let e2 = [];
    let winValue = 2048;
    let nMvUpDn=false;
    let nMvLfRt=false;
    a = 0;
    b = 0;
    board = {
        "key": {
            "up": [13, 14, 15, 16],
            "left": [4, 8, 12, 16],
            "right": [1, 5, 9, 13],
            "down": [1, 2, 3, 4]
        },
        "adjacency": {
            1: [0, 0, 2, 5],
            2: [1, 0, 3, 6],
            3: [2, 0, 4, 7],
            4: [3, 0, 0, 8],
            5: [0, 1, 6, 9],
            6: [5, 2, 7, 10],
            7: [6, 3, 8, 11],
            8: [7, 4, 0, 12],
            9: [0, 5, 10, 13],
            10: [9, 6, 11, 14],
            11: [10, 7, 12, 15],
            12: [11, 8, 0, 16],
            13: [0, 9, 14, 0],
            14: [13, 10, 15, 0],
            15: [14, 11, 16, 0],
            16: [15, 12, 0, 0],
        }

    };
    $('.stack-replay').click(function () {
        $('#tbanner p').text("Use touch or arrow keys to play.");
        $('.stack-top').hide();
        $('li').empty();
        $('.stack-replay').hide();

        emptySet = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

        pickTwoEmptySpace();
    });

    function colorMeBox()
    {
        for( i=1; i<=16; i++)
        {
            if($("#"+i).text().trim()){
                bgcolor = "rgb(212, 170, "+Math.floor((200-($("#"+i).text()*20)))+")";
            $("#"+i).css("background-color",bgcolor);
            }
            else
            {
                $("#"+i).css("background-color","rgb(126, 126, 126,0.6)"); 
            }
        }
    }

    function gameOver()
    {
        console.log('No more move available!');
        $('#tbanner p').text("Game over!");
        $('.stack-replay').text('Replay');
        $('.stack-replay').css('opacity',0.7);
        $('.stack-replay').show();
    }

    function pickTwoEmptySpace(e) {
        var ret = [];
        var i = 0;
        var max = 16
        var position = 0;
        if (emptySet.size > 0) {
            while (i < 2) {
                position = Math.floor(Math.random() * Math.floor(17));
                if (emptySet.has(position)) {
                    if (i - 1 == 0 && ret[i - 1] == position) {
                        --i;
                    }
                    ret[i] = position;
                    $('#' + position).text(getValue);
                    if(Math.floor(Math.random()*2)>0 && emptySet.size>0)
                    {
                        i++;
                    }
                    i++;
                }
            }
        }
        else
        {
            console.log('No more empty space available!')
        }

        colorMeBox();
        
    }
    function isEmptyOrSpaces(str) {
        return str == null || str.trim == '';
    }
    function getValue(e) {
        return Math.floor(Math.round(Math.random(), 1) * 2) + 2;
    }

    function declareWin()
    {
        console.log('You have won the game!');
            $('#tbanner p').text("You have completed "+winValue+".");
            $('.stack-replay').text('You Win!');
            $('.stack-replay').show();
    }

    function evaluateBoard(e, d) {
        e2 = [];
            if ($('#' + e[0]).text().trim()>0) {
                stka.push($('#' + e[0]).text());
            } 
            if ($('#' + e[1]).text().trim()>0) {
                stkb.push($('#' + e[1]).text());
            }
            if ($('#' + e[2]).text().trim()>0) {
                stkc.push($('#' + e[2]).text());
            }
            if ($('#' + e[3]).text().trim()>0) {
                stkd.push($('#' + e[3]).text());
            }

            for (i = 0; i < e.length; i++) {
                e2[i] = board.adjacency[e[i]][d];
            }

            if (board.adjacency[e[0]][d] != 0) {
                evaluateBoard(e2, d);
            }
            // TO POP-ing the values are suming up 
            //row 0
            
            if (stka.length > 1) { a = Number(stka.pop()); b = Number(stka.pop());
                if (a == b) { $('#' + e[0]).text(a + b); emptySet.delete(e[0]); if (a+b==winValue){(declareWin())};
                } else { stka.push(b);$('#' + e[0]).text(a); emptySet.delete(e[0]);}
            } else {if (stka.length == 1) {a = stka.pop(); $('#' + e[0]).text(a); emptySet.delete(e[0]);} else {$('#' + e[0]).text(''); emptySet.add(e[0]); }}
            //row 1
            if (stkb.length > 1) { a = Number(stkb.pop()); b = Number(stkb.pop());
                if (a == b) {$('#' + e[1]).text(a + b); emptySet.delete(e[1]); if (a+b==winValue){(declareWin())};
                 } else { stkb.push(b);$('#' + e[1]).text(a); emptySet.delete(e[1]);
                }
            } else {if (stkb.length == 1) {a = stkb.pop(); $('#' + e[1]).text(a); emptySet.delete(e[1]);} else {$('#' + e[1]).text(''); emptySet.add(e[1]); }}
            //row 2
            if (stkc.length > 1) { a = Number(stkc.pop()); b = Number(stkc.pop());
                if (a == b) { $('#' + e[2]).text(a + b); emptySet.delete(e[2]); if (a+b==winValue){(declareWin())};
                    } else { stkc.push(b);$('#' + e[2]).text(a); emptySet.delete(e[2]);}
            } else {if (stkc.length == 1) {a = stkc.pop(); $('#' + e[2]).text(a); emptySet.delete(e[2]);} else {$('#' + e[2]).text(''); emptySet.add(e[2]);}}
            //row 3
            if (stkd.length > 1) { a = Number(stkd.pop()); b = Number(stkd.pop());
                if (a == b) { $('#' + e[3]).text(a + b); emptySet.delete(e[3]); if (a+b==winValue){(declareWin())};
                    } else { stkd.push(b);$('#' + e[3]).text(a); emptySet.delete(e[3]);
                }
            }else {if (stkd.length == 1) {a = stkd.pop(); $('#' + e[3]).text(a);emptySet.delete(e[3]);} else {$('#' + e[3]).text('');emptySet.add(e[3]); }}


    }


    document.onkeydown = checkKey;

    function checkKey(e) {
        //direction d = [left=0, top=1, right=2, down=3]

        e = e || window.event;
        if (e.keyCode == '37') {
            evaluateBoard(board.key.left, 0);
            if(!emptySet.size==0){
                nMvLfRt = false; 
             pickTwoEmptySpace();
            }
            else{ nMvLfRt = true; if (nMvLfRt && nMvUpDn) {gameOver();} 
            }
            

        } else if (e.keyCode == '38') {
            evaluateBoard(board.key.up, 1);
            if(!emptySet.size==0){
                nMvUpDn = false;
                pickTwoEmptySpace();
               }
               else{ nMvUpDn = true; if (nMvLfRt && nMvUpDn) {gameOver();} 
            }


        } else if (e.keyCode == '39') {
            evaluateBoard(board.key.right, 2)
            if(!emptySet.size==0){
                nMvLfRt = false; 
                pickTwoEmptySpace();
               }
               else{ nMvLfRt = true; if (nMvLfRt && nMvUpDn) {gameOver();} 
            }

        } else if (e.keyCode == '40') {
            evaluateBoard(board.key.down, 3);
            if(!emptySet.size==0){
                nMvUpDn = false;
                pickTwoEmptySpace();
               }
               else{ nMvUpDn = true; if (nMvLfRt && nMvUpDn) {gameOver();} 
            }
        }
    }

});
