//declaring global variables
var board=[];
var compFirst = false;
var maxDepth= 1;
var n=3;
var checkR=[];
var checkC=[];
var checkD=[];
var winn;
//end of declaration


function startGame()
{  
    //remove winning line
    console.log('winn= '+winn);
    if(winn) 
    {
        document.getElementById("board").classList.remove("full");
        document.getElementById("board").classList.remove(winn);
    }

    //deactivate all buttons 
    //starting player
    document.getElementById("hu").style.cursor = 'not-allowed';
    document.getElementById("hu").onclick = null;
    document.getElementById("co").style.cursor = 'not-allowed';
    document.getElementById("co").onclick = null;
    //depth
    for(var i = -1;i<5;i++)
    {
        if(i==0) continue;
        document.getElementById("depth"+i).style.cursor = 'not-allowed'; 
        document.getElementById("depth"+i).onclick = null; 
    }
    //board size
    document.getElementById("s3").style.cursor = 'not-allowed';
    document.getElementById("s3").onclick = null;
    document.getElementById("s4").style.cursor = 'not-allowed';
    document.getElementById("s4").onclick = null;
    document.getElementById("s5").style.cursor = 'not-allowed';
    document.getElementById("s5").onclick = null;
    document.getElementById("s6").style.cursor = 'not-allowed';
    document.getElementById("s6").onclick = null;

    setDifficultyAndSize();
    //initialize all variables
    board=Array(n*n).fill('-');
    checkR=Array(n).fill(0);
    checkC=Array(n).fill(0);
    checkD=Array(2).fill(0);
    //create board
    let blank=document.getElementById("board");
    if(n==3)
    {
        blank.innerHTML='<div id="cell3-0" onclick="playerMoved(0)"></div><div id="cell3-1" onclick="playerMoved(1)"></div><div id="cell3-2" onclick="playerMoved(2)"></div><div id="cell3-3" onclick="playerMoved(3)"></div><div id="cell3-4" onclick="playerMoved(4)"></div><div id="cell3-5" onclick="playerMoved(5)"></div><div id="cell3-6" onclick="playerMoved(6)"></div><div id="cell3-7" onclick="playerMoved(7)"></div><div id="cell3-8" onclick="playerMoved(8)"></div>';
    }
        
    if(n==4)
    {
        blank.innerHTML='<div id="cell4-0" onclick="playerMoved(0)"></div><div id="cell4-1" onclick="playerMoved(1)"></div><div id="cell4-2" onclick="playerMoved(2)"></div><div id="cell4-3" onclick="playerMoved(3)"></div><div id="cell4-4" onclick="playerMoved(4)"></div><div id="cell4-5" onclick="playerMoved(5)"></div><div id="cell4-6" onclick="playerMoved(6)"></div><div id="cell4-7" onclick="playerMoved(7)"></div><div id="cell4-8" onclick="playerMoved(8)"></div><div id="cell4-9" onclick="playerMoved(9)"></div><div id="cell4-10" onclick="playerMoved(10)"></div><div id="cell4-11" onclick="playerMoved(11)"></div><div id="cell4-12" onclick="playerMoved(12)"></div><div id="cell4-13" onclick="playerMoved(13)"></div><div id="cell4-14" onclick="playerMoved(14)"></div><div id="cell4-15" onclick="playerMoved(15)"></div>';
    }
        
    if(n==5)
    {
        blank.innerHTML='<div id="cell5-0" onclick="playerMoved(0)"></div><div id="cell5-1" onclick="playerMoved(1)"></div><div id="cell5-2" onclick="playerMoved(2)"></div><div id="cell5-3" onclick="playerMoved(3)"></div><div id="cell5-4" onclick="playerMoved(4)"></div><div id="cell5-5" onclick="playerMoved(5)"></div><div id="cell5-6" onclick="playerMoved(6)"></div><div id="cell5-7" onclick="playerMoved(7)"></div><div id="cell5-8" onclick="playerMoved(8)"></div><div id="cell5-9" onclick="playerMoved(9)"></div><div id="cell5-10" onclick="playerMoved(10)"></div><div id="cell5-11" onclick="playerMoved(11)"></div><div id="cell5-12" onclick="playerMoved(12)"></div><div id="cell5-13" onclick="playerMoved(13)"></div><div id="cell5-14" onclick="playerMoved(14)"></div><div id="cell5-15" onclick="playerMoved(15)"></div><div id="cell5-16" onclick="playerMoved(16)"></div><div id="cell5-17" onclick="playerMoved(17)"></div><div id="cell5-18" onclick="playerMoved(18)"></div><div id="cell5-19" onclick="playerMoved(19)"></div><div id="cell5-20" onclick="playerMoved(20)"></div><div id="cell5-21" onclick="playerMoved(21)"></div><div id="cell5-22" onclick="playerMoved(22)"></div><div id="cell5-23" onclick="playerMoved(23)"></div><div id="cell5-24" onclick="playerMoved(24)"></div>';
    }
        
    if(n==6)
    {
        blank.innerHTML='<div id="cell6-0" onclick="playerMoved(0)"></div><div id="cell6-1" onclick="playerMoved(1)"></div><div id="cell6-2" onclick="playerMoved(2)"></div><div id="cell6-3" onclick="playerMoved(3)"></div><div id="cell6-4" onclick="playerMoved(4)"></div><div id="cell6-5" onclick="playerMoved(5)"></div><div id="cell6-6" onclick="playerMoved(6)"></div><div id="cell6-7" onclick="playerMoved(7)"></div><div id="cell6-8" onclick="playerMoved(8)"></div><div id="cell6-9" onclick="playerMoved(9)"></div><div id="cell6-10" onclick="playerMoved(10)"></div><div id="cell6-11" onclick="playerMoved(11)"></div><div id="cell6-12" onclick="playerMoved(12)"></div><div id="cell6-13" onclick="playerMoved(13)"></div><div id="cell6-14" onclick="playerMoved(14)"></div><div id="cell6-15" onclick="playerMoved(15)"></div><div id="cell6-16" onclick="playerMoved(16)"></div><div id="cell6-17" onclick="playerMoved(17)"></div><div id="cell6-18" onclick="playerMoved(18)"></div><div id="cell6-19" onclick="playerMoved(19)"></div><div id="cell6-20" onclick="playerMoved(20)"></div><div id="cell6-21" onclick="playerMoved(21)"></div><div id="cell6-22" onclick="playerMoved(22)"></div><div id="cell6-23" onclick="playerMoved(23)"></div><div id="cell6-24" onclick="playerMoved(24)"></div><div id="cell6-25" onclick="playerMoved(25)"></div><div id="cell6-26" onclick="playerMoved(26)"></div><div id="cell6-27" onclick="playerMoved(27)"></div><div id="cell6-28" onclick="playerMoved(28)"></div><div id="cell6-29" onclick="playerMoved(29)"></div><div id="cell6-30" onclick="playerMoved(30)"></div><div id="cell6-31" onclick="playerMoved(31)"></div><div id="cell6-32" onclick="playerMoved(32)"></div><div id="cell6-33" onclick="playerMoved(33)"></div><div id="cell6-34" onclick="playerMoved(34)"></div><div id="cell6-35" onclick="playerMoved(35)"></div>';
    }
    
    if(compFirst) compFirstMove();
}

    
function newGame()
{
     //reativate all buttons
    //first player
    document.getElementById("hu").style.cursor = 'pointer';
    document.getElementById("co").style.cursor = 'pointer';
    document.getElementById('hu').onclick =function() {setFirst('hu')};
    document.getElementById('co').onclick =function() {setFirst('co')};
    //depth
    for(var i = -1;i<5;i++)
    {
        if(i==0) continue;
        document.getElementById("depth"+i).style.cursor = 'pointer';  
    }
    document.getElementById("depth"+1).onclick = function() {activateDepth(1)};
    document.getElementById("depth"+2).onclick = function() {activateDepth(2)};
    document.getElementById("depth"+3).onclick = function() {activateDepth(3)};
    document.getElementById("depth"+4).onclick = function() {activateDepth(4)};
    document.getElementById("depth"+-1).onclick = function() {activateDepth(-1)};
    //board size
    document.getElementById("s3").style.cursor = 'pointer';
    document.getElementById("s4").style.cursor = 'pointer';
    document.getElementById("s5").style.cursor = 'pointer';
    document.getElementById("s6").style.cursor = 'pointer';
    document.getElementById("s3").onclick = function() {activateSize(3)};
    document.getElementById("s4").onclick = function() {activateSize(4)};
    document.getElementById("s5").onclick = function() {activateSize(5)};
    document.getElementById("s6").onclick = function() {activateSize(6)};
    
    //remove winning line
    if(winn) 
    {
        document.getElementById("board").classList.remove("full");
        document.getElementById("board").classList.remove(winn);
    }  
}

function compFirstMove()
{
    var arr=[];
        
    for(let index=0;index<n*n;index+=n+1)
        arr.push(index);
    for(let index=n-1;index<=n*(n-1);index+=n-1)
        arr.push(index);
    
    var ans=arr[Math.floor(Math.random()*arr.length)];
    setBoard(ans,'x');
    printMove(ans,'x');
    console.log(board);
}
    
function gameOver(winner)
{
    if(winner!='t'){
        for(let i=0;i<n*n;i++)
        {
            document.getElementById("cell"+n+"-"+i).onclick=null;
            document.getElementById("cell"+n+"-"+i).style.cursor = 'not-allowed';
        }
        for(var j=0;j<n;j++)
            {
                if(Math.abs(checkC[j])==n) { drawWinningLine('V'+(j+1)); break; }
                if(Math.abs(checkR[j])==n){  drawWinningLine('H'+(j+1)); break; }
            }
            if(Math.abs(checkD[0])==n) drawWinningLine('D1');
            else if(Math.abs(checkD[1])==n) drawWinningLine('D2');
    }

    console.log('game over');
}

function drawWinningLine(win)
{
   // console.log(win);
    winn = win;
    document.getElementById("board").classList.add(win);
    document.getElementById("board").classList.add('full');
    console.log(win);
}

    
function playerMoved(move)
{
    setBoard(move,'o');
    printMove(move,'o');
    var temp = evalBoardScore(move);
    if(temp!='n') gameOver(temp);
    else
    {
        var ans = returnBestMove();
        setBoard(ans,'x');
        printMove(ans,'x');
        console.log(board);
        var temp1 = evalBoardScore(ans);
        if(temp1!='n') gameOver(temp1);
    }    
}


function printMove(move,symbol){
    var img=document.createElement("img");
    if(symbol=='o')
    {
        img.src="images/humanface.png";
        img.style.width='50%';
    }
        
    else if(symbol=='x')
    {
        img.style.width='60%';
        img.src="images/robotface.png";
    }
    let place=document.getElementById("cell"+n+"-"+move);
     place.appendChild(img);
     place.onclick=null;
     place.style.cursor = 'not-allowed';
}
 
function setBoard(move,symbol){
    //update all scoring variables, set board array

    //for each o: -1    //for each x: +1    (computer is X)
    if(symbol=='x'){
        checkR[Math.floor(move/n)]++;
        checkC[move%n]++;
        if(move%(n+1)==0)   checkD[0]++;
        if(move!=0 && move!=(n*n-1) && move%(n-1)==0)   checkD[1]++;
    }
    else if(symbol=='o'){
        checkR[Math.floor(move/n)]--;
        checkC[move%n]--;
        if(move%(n+1)==0)   checkD[0]--;
        if(move!=0 && move!=(n*n-1) && move%(n-1)==0)   checkD[1]--;
    }
    //for undoing move by inserting '-'
    else if(symbol=='-'){
        if(board[move]=='x'){
            checkR[Math.floor(move/n)]--;
            checkC[move%n]--;
            if(move%(n+1)==0)   checkD[0]--;
            if(move!=0 && move!=(n*n-1) && move%(n-1)==0)   checkD[1]--;
        }
        else if(board[move]=='o'){
            checkR[Math.floor(move/n)]++;
            checkC[move%n]++;
            if(move%(n+1)==0)   checkD[0]++;
            if(move!=0 && move!=(n*n-1) && move%(n-1)==0)   checkD[1]++;
        }
    }
    board[move]=symbol;
}