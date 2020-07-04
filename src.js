//when new game button is pressed
//clearboard
//var board = ['-','-','-','-','-','-','-','-','-'];
var board = [['-','-','-'],['-','-','-'],['-','-','-']];
//var board;
var compfirst = false;
var maxdepth= -1;
var boardSize=3;
function setFirst(first)
{
    if(first=='hu') compfirst = false;
    if(first=='co') compfirst = true;
}

function difficulty(depth){
    maxdepth=depth;
    console.log(maxdepth);
}
function makeBoard(size){
    boardSize=size; 
}
function clearBoard()
{
    //initializing new board
    for(let i=0;i<boardSize;i++)
        for(let j=0;j<boardSize;j++)
            board[i][j]='-';
    //board = ['-','-','-','-','-','-','-','-','-'];
    //remove any previous moves
    let blank=document.getElementById("board");
    if(boardSize==3)
        blank.innerHTML='<div id="cell-0" onclick="playermoved(0)"></div><div id="cell-1" onclick="playermoved(1)"></div><div id="cell-2" onclick="playermoved(2)"></div><div id="cell-3" onclick="playermoved(3)"></div><div id="cell-4" onclick="playermoved(4)"></div><div id="cell-5" onclick="playermoved(5)"></div><div id="cell-6" onclick="playermoved(6)"></div><div id="cell-7" onclick="playermoved(7)"></div><div id="cell-8" onclick="playermoved(8)"></div>';
    console.log('Boardmade');
    //check if starting player is human or computer
    //starting player is human
    // as soon as move is made call return best move function
    //starting player is computer call return best move function
    if(compfirst)
    {
        //for first move, randomly choosing between [0,2,4,6,8]
        var arr=[0,2,4,6,8];
        var ans=arr[Math.floor(Math.random()*arr.length)];
        //board[ans] = 'x';
        board[Math.floor(ans/boardSize)][ans%boardSize]='x';
        printMove(ans,'x');
        console.log(board);
    }
    
}
    
function gameOver(res)
{
    if(res!='t'){
        for(let i=0;i<9;i++)
    document.getElementById("cell-"+i).onclick=null;
    drawWinningLine(res[1],res[2]+1);
    }
}

function drawWinningLine({ direction, row }) {
	let board = document.getElementById("board");
	board.className = `${direction}${row}`;
	setTimeout(() => { board.className += ' full'; }, 50);
}

function playermoved(move)
{
    console.log(move/boardSize);
    board[Math.floor(move/boardSize)][Math.floor(move%boardSize)] = 'o';
    printMove(move,'o');
    var temp = evalBoard();
    if(temp!='n') gameOver(temp);
    else
    {
        var ans = returnbestmove();
        board[Math.floor(ans/boardSize)][ans%boardSize] = 'x';
        printMove(ans,'x');
        console.log(board);
        var temp1 = evalBoard();
        console.log(temp1);
        if(temp1!='n') gameOver(temp1);
    }    
}

//function printMove
function printMove(move,symbol){
    var img=document.createElement("img");
    if(symbol=='o')
        img.src="images/humanface.png";
    else if(symbol=='x')
        img.src="images/robotface.png";
    let place=document.getElementById("cell-"+move);
    img.style.width='70%';
    place.appendChild(img);
    place.style.textAlign="center";
    place.onclick=null;
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
    for(var i =0;i<3;i++)
        for(var j=0;j<3;j++)
        {
            //check if move is possible at i
            if(board[i][j]=='-')
            {
                //make the move
                board[i][j] = 'x';
                //evaluate score on making this move
                var temp = returnScore(false,0);
                if(temp>score)
                {
                    //update this move as the best move so far
                    score = temp;
                    move = 3*i+j;
                }
                //undo this move
                board[i][j] = '-';
            }
        }
    return move;
    
}
    
function evalBoard()
{
    //return x if x is winner
    //return o if o is winner
    //else return n
    //check for ties
    var isfull = true;
    for(var i =0;i<3;i++)
        for(var j=0;j<3;j++)
            if(board[i][j]=='-') isfull=false;
    if(isfull) return 't';
    
    for(let i=0;i<3;i++){
        //rows
        if(board[i][0]==board[i][1] && board[i][1]==board[i][2]){
            if(board[i][0]!='-') return board[i][0];
        }
        //cols
        if(board[0][i]==board[1][i] && board[1][i]==board[2][i]){
            if(board[0][i]!='-') return board[0][i];
        }
    }

    //check 2 diagonals
    if(board[0][0]==board[1][1] && board[1][1]==board[2][2]) 
    {
        if(board[0][0]=='o') return 'o';
        if(board[0][0]=='x') return 'x';
    }
    
    if(board[0][2]==board[1][1] && board[1][1]==board[2][0]) 
    {
        {
            if(board[0][2]=='o') return 'o';
            if(board[0][2]=='x') return 'x';
        }
    }
    
    return 'n';
}
  
function returnScore(isMax,depth)
{
    //check if either player is winner
    //return -10 if o is winner
    //return +10 if x is winner
    //return 0 if it is a draw
    
    //check if winner
    var temp1 = evalBoard();
    if(temp1[0]=='t') return 0;
    if(temp1[0]=='x') return 10-depth;
    if(temp1[0]=='o') return -10+depth;
    if(depth==maxdepth) return 0;
    
    
    
    
    if(isMax)
    {
        //make all possible moves and return highest possible score
        var score = -1000;
        for(var i =0;i<3;i++)
            for(var j=0;j<3;j++)
            {
                if(board[i][j]=='-')
                {
                    board[i][j]='x';
                    var temp = returnScore(false,depth+1);
                    score = Math.max(score,temp);
                    board[i][j] = '-';
        
                }
            }
        return score;
    }
    else
    {
        var score = 1000;
        for(var i =0;i<3;i++)
        for(var j=0;j<3;j++)
            {
                if(board[i][j]=='-')
                {
                    board[i][j]='o';
                    var temp = returnScore(true,depth+1);
                    score = Math.min(score,temp);
                    board[i][j] = '-';
        
                } 
            }
        return score;
    }
    
}