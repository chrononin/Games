
$(document).ready(function(){
var computerTurn = false;
var userChoice;
var computerChoice;
var userscore = [];
var set = [];
var computerscore = [];
var keys = [];
var gameCompleted = false;
var emptyspace = ['2', '7', '6', '9', '5', '1', '4', '3', '8'];
$('.x').click(function () {
    userChoice = 'X';
    computerChoice = 'O';
    $('#tbanner p').text('Your choice is X.');
    $('.tbox').css("z-index", '10');
    $('.stack-replay').css("z-index", '5');
    $('.stack-top').css("z-index", '0');
});
$('.o').click(function () {
    userChoice = 'O';
    computerChoice = 'X';
    $('#tbanner p').text('Your choice is O.');
    $('.tbox').css("z-index", '10');
    $('.stack-replay').css("z-index", '5');
    $('.stack-top').css("z-index", '0');
    computersAttempt();
});
$('.stack-replay').click(function () {
    userscore = [];
    computerscore = [];
    emptyspace = ['2', '7', '6', '9', '5', '1', '4', '3', '8'];
    $('#tbanner p').text("Choose 'X' or 'O to start play.");
    $('.tbox').css("z-index", '5');
    $('.stack-replay').css("z-index", '0');
    $('.stack-top').css("z-index", '10');
    $('li').empty();
    $('.stack-replay').hide();
});
$('li').click(function () {
    if ($(this).is(':empty')) {
        $(this).text(userChoice);
        userscore.unshift(parseInt($(this).attr('id')));
        const indx = emptyspace.indexOf($(this).attr('id').toString());
        if (emptyspace.length < 6 && emptyspace.length > 0) {
            set = [];
            keys = userscore;
            recursive(2, 0, []);
            if (set.find(element => element == 15) != undefined) {
                result('You won the Game!');
                emptyspace = [];
                gameCompleted = true;
            }
        }
        if (indx > -1) {
            emptyspace.splice(indx, 1);
        }
        if (emptyspace.length > 0) {
            computerTurn = true;
            computersAttempt();
        } else {
            if (!gameCompleted) {
                result("It's a draw!");
            }
        }
    }
});

function result(e) {
    $('#tbanner p').text(e);
    $('.tbox').css("z-index", '5');
    $('.stack-replay p').text('Play again');
    $('.stack-replay').css("z-index", '10');
    $('.stack-top').css("z-index", '0');
    $('.stack-replay').show();

}
function computersAttempt(e) {
    const indxc = Math.floor(Math.random() * emptyspace.length);
    $('#' + emptyspace[indxc]).text(computerChoice);
    $('#' + emptyspace[indxc]).prop('click', false);
    computerscore.unshift(parseInt(emptyspace[indxc]));
    computerTurn = false;
    if (emptyspace.length < 6 && emptyspace.length > 0) {
        set = [];
        keys = computerscore;
        recursive(2, 0, []);
        if (set.find(element => element == 15) != undefined) {
            gameCompleted = true;
            result('Computer has won the game');
            emptyspace = [];
        }
    }
    emptyspace.splice(indxc, 1);
    if (emptyspace.length == 0 && !gameCompleted) {
        result("It's a draw!");
    }
}
function recursive(cross, s, a) {
    for (var i = s; i < keys.length; i++) {
        if (!cross) {
            var b = a.slice(0);
            b.push(keys[i]);
            set.push(b.reduce(function (x, y) { return x + y }));
        } else {
            a.push(keys[i]);
            recursive(cross - 1, i + 1, a);
            a.splice(-1, 1);
        }
    }
}
});
