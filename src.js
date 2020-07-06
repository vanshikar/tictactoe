

//global variables
var board = ['-','-','-','-','-','-','-','-','-'];
var compfirst = false;
var maxdepth= -1;
var boardSize=3;

//set the first player as human or computer
function setFirst(first)
{
    if(first=='hu') compfirst = false;
    if(first=='co') compfirst = true;
}

//set difficulty
function difficulty(depth){
    maxdepth=depth;
    console.log(maxdepth);
}


function clearBoard()
{
    //clear the board
    board = ['-','-','-','-','-','-','-','-','-'];
    let blank=document.getElementById("board");
    if(boardSize==3)
        blank.innerHTML='<div id="cell-0" onclick="playermoved(0)"></div><div id="cell-1" onclick="playermoved(1)"></div><div id="cell-2" onclick="playermoved(2)"></div><div id="cell-3" onclick="playermoved(3)"></div><div id="cell-4" onclick="playermoved(4)"></div><div id="cell-5" onclick="playermoved(5)"></div><div id="cell-6" onclick="playermoved(6)"></div><div id="cell-7" onclick="playermoved(7)"></div><div id="cell-8" onclick="playermoved(8)"></div>';
   
        //if first player is computer then make move
    if(compfirst)
    {
        //for first move, randomly choosing between [0,2,4,6,8]
        var arr=[0,2,4,6,8];
        var ans=arr[ans];
        //board[ans] = 'x';
        board[ans]='x';
        printMove(ans,'x');
       // console.log(board);
    }
    
}
    
function gameOver(res)
{
    if(res!='t'){
        for(let i=0;i<9;i++)
    document.getElementById("cell-"+i).onclick=null;
    }
}

function playermoved(move)
{
    board[move] = 'o';
    printMove(move,'o');
    var temp = evalBoard();
    console.log(temp);
    if(temp!='n') gameOver(temp);
    else
    {
        var ans = returnbestmove();
        board[ans] = 'x';
        printMove(ans,'x');
        var temp1 = evalBoard();
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

    
