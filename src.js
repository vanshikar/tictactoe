//when new game button is pressed
//clearboard
var board = ['-','-','-','-','-','-','-','-','-'];
var compfirst = false;
//clearBoard();
function setfirst(first)
{
    if(first=='hu') compfirst = false;
    if(first=='co') compfirst = true;
}
    
function clearBoard()
{
    
    //write code to print clean board
    //code to initialise new board
        board = ['-','-','-','-','-','-','-','-','-'];
        let blank=document.getElementById("board");
        blank.innerHTML='<div id="cell-0" onclick="playermoved(0)"></div><div id="cell-1" onclick="playermoved(1)"></div><div id="cell-2" onclick="playermoved(2)"></div><div id="cell-3" onclick="playermoved(3)"></div><div id="cell-4" onclick="playermoved(4)"></div<div id="cell-5" onclick="playermoved(5)"></div><div id="cell-6" onclick="playermoved(6)"></div><div id="cell-7" onclick="playermoved(7)"></div><div id="cell-8" onclick="playermoved(8)"></div>';
    //check if starting player is human or computer
    //starting player is human
    // as soon as move is made call return best move function
    //starting player is computer call return best move function
    if(compfirst)
    {
        var ans = returnbestmove();
        board[ans] = 'x';
        //print this move
        printMove(ans,'x');
    }
    
}
    
function playermoved(move)
{
    
    console.log(board);
    board[move] = 'o';
    //print player's move
    printMove(move,'o');
    //check if it is draw or if anyone won
    var ans = returnbestmove();
    board[ans] = 'x';
    printMove(ans,'x');
    console.log(ans);
    console.log(board);
    //print this move
    
}
    
    
//function printMove
function printMove(move,symbol){
    var img=document.createElement("img");
    if(symbol=='o')
        img.src="images/humanface.png";
    else if(symbol=='x')
        img.src="images/robotface.png";
    let place=document.getElementById("cell-"+move);
    img.style.width='50%';
    img.style.height='auto';
    place.appendChild(img);
}
//function that is called everytime player makes a move
//checks if board is full
//if it is not then calls return best move and prints it
    
function returnbestmove()
{
    //check if we have a winner
    //initilaise move and score associated with it
    var move;
    var score = -10000;
    //board is global
    for(var i =0;i<9;i++)
    {
        //check if move is possible at i
        if(board[i]=='-')
        {
            //make the move
            board[i] = 'x';
            //evaluate score on making this move
            var temp = returnScore(false);
            if(temp>score)
            {
                //update this move as the best move so far
                score = temp;
                move = i;
            }
            //undo this move
            board[i] = '-';
        }
    }
    return move;
    
}
    
function evalBoard()
{
    //return x if x is winner
    //return o if o is winner
    //else return n
    //check all rows
    for(var i = 0;i<9;i+=3)
    {
        if(board[i]==board[i+1] && board[i+1]==board[i+2]) return board[i];
    }
    //check all columns
    for(var i = 0;i<3;i++)
    {
        if(board[i]==board[i+3] && board[i+3]==board[i+6]) return board[i];
    }
    //check 2 diagonals
    if(board[0]==board[4] && board[4]==board[8]) return board[0];
    if(board[2]==board[4] && board[4]==board[6]) return board[2];
    
    return 'tie';
}
    
    
    
    
    
function returnScore(isMax)
{
    //check if either player is winner
    //return -10 if o is winner
    //return +10 if x is winner
    //return 0 if it is a draw
    var isfull = true;
    for(var i=0;i<9;i++)
    {
        if(board[i]=='-') {
            isfull = false;
            break;
        }
    }
    if(isfull) return 0;
    
    //check if winner
    var temp1 = evalBoard();
    if(temp1=='x') return 10;
    if(temp1=='o') return -10;
    
    
    
    
    if(isMax)
    {
        //make all possible moves and return highest possible score
        var score = -1000;
        for(var i = 0;i<9;i++)
        {
            if(board[i]=='-')
            {
                board[i]='x';
                var temp = returnScore(false);
                score = Math.max(score,temp);
                board[i] = '-';
    
            }
        }
        return score;
    }
    else
    {
        var score = 1000;
        for(var i = 0;i<10;i++)
        {
            if(board[i]=='-')
            {
                board[i]='o';
                var temp = returnScore(true);
                score = Math.min(score,temp);
                board[i] = '-';
    
            } 
        }
        return score;
    }
    
}