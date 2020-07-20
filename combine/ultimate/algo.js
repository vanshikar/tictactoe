//global variables
var bigboard  = [];
var smallcellsfilled;
var difficulty=1;
var cellsfilled = 0;
var sans;
var bans;
var firstMove=true;
var compFirst=false;
var winn;
//end of global variables

function startGame()
{
    //disable first player choice buttons
    document.getElementById("hu").style.cursor = 'not-allowed';
    document.getElementById("hu").onclick = null;
    document.getElementById("co").style.cursor = 'not-allowed';
    document.getElementById("co").onclick = null;
    //disable depth buttons
    document.getElementById("1").style.cursor = 'not-allowed';
    document.getElementById("1").onclick = null;
    document.getElementById("3").style.cursor = 'not-allowed';
    document.getElementById("3").onclick = null;
    document.getElementById("4").style.cursor = 'not-allowed';
    document.getElementById("4").onclick = null;
    document.getElementById("5").style.cursor = 'not-allowed';
    document.getElementById("5").onclick = null;
    document.getElementById("8").style.cursor = 'not-allowed';
    document.getElementById("8").onclick = null;

    if(compFirst==false)
    {
        for(var i = 0;i<9;i++)
        {
        for(var j = 0;j<9;j++)
        {
            document.getElementById("cell9-"+i+j).style.cursor='pointer';

        }
        }
    }

    //call computer to make first move
    if(compFirst)    compFirstMove();
    

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
    document.getElementById('1').style.cursor = 'pointer';
    document.getElementById('3').style.cursor = 'pointer';
    document.getElementById('4').style.cursor = 'pointer';
    document.getElementById('5').style.cursor = 'pointer';
    document.getElementById('8').style.cursor = 'pointer';
    
    document.getElementById('1').onclick = function() {setDifficulty(1)};
    document.getElementById('3').onclick = function() {setDifficulty(3)};
    document.getElementById('4').onclick = function() {setDifficulty(4)};
    document.getElementById('5').onclick = function() {setDifficulty(5)};
    document.getElementById('8').onclick = function() {setDifficulty(8)};
    //remove winning line
    if(winn)
    {
        document.getElementById("board").classList.remove(winn);
        document.getElementById("board").classList.remove('full');

    }

    //initialise all variables
    bigboardstatus = ['-','-','-','-','-','-','-','-','-'];
    smallcellsfilled = [0,0,0,0,0,0,0,0,0];
    bigboard = [['-','-','-','-','-','-','-','-','-'],['-','-','-','-','-','-','-','-','-'],['-','-','-','-','-','-','-','-','-'],['-','-','-','-','-','-','-','-','-'],['-','-','-','-','-','-','-','-','-'],['-','-','-','-','-','-','-','-','-'],['-','-','-','-','-','-','-','-','-'],['-','-','-','-','-','-','-','-','-'],['-','-','-','-','-','-','-','-','-']];
    firstMove=true;
    let blank=document.getElementById("board");
    blank.innerHTML=' <div id="cell9-00" onclick="playerMoved(0,0)"></div><div id="cell9-01" onclick="playerMoved(0,1)"></div><div id="cell9-02" onclick="playerMoved(0,2)"></div><div id="cell9-10" onclick="playerMoved(1,0)"></div><div id="cell9-11" onclick="playerMoved(1,1)"></div><div id="cell9-12" onclick="playerMoved(1,2)"></div><div id="cell9-20" onclick="playerMoved(2,0)"></div><div id="cell9-21" onclick="playerMoved(2,1)"></div><div id="cell9-22" onclick="playerMoved(2,2)"></div><div id="cell9-03" onclick="playerMoved(0,3)"></div><div id="cell9-04" onclick="playerMoved(0,4)"></div><div id="cell9-05" onclick="playerMoved(0,5)"></div><div id="cell9-13" onclick="playerMoved(1,3)"></div><div id="cell9-14" onclick="playerMoved(1,4)"></div><div id="cell9-15" onclick="playerMoved(1,5)"></div><div id="cell9-23" onclick="playerMoved(2,3)"></div><div id="cell9-24" onclick="playerMoved(2,4)"></div><div id="cell9-25" onclick="playerMoved(2,5)"></div><div id="cell9-06" onclick="playerMoved(0,6)"></div><div id="cell9-07" onclick="playerMoved(0,7)"></div><div id="cell9-08" onclick="playerMoved(0,8)"></div><div id="cell9-16" onclick="playerMoved(1,6)"></div><div id="cell9-17" onclick="playerMoved(1,7)"></div><div id="cell9-18" onclick="playerMoved(1,8)"></div><div id="cell9-26" onclick="playerMoved(2,6)"></div><div id="cell9-27" onclick="playerMoved(2,7)"></div><div id="cell9-28" onclick="playerMoved(2,8)"></div><div id="cell9-30" onclick="playerMoved(3,0)"></div><div id="cell9-31" onclick="playerMoved(3,1)"></div><div id="cell9-32" onclick="playerMoved(3,2)"></div><div id="cell9-40" onclick="playerMoved(4,0)"></div><div id="cell9-41" onclick="playerMoved(4,1)"></div><div id="cell9-42" onclick="playerMoved(4,2)"></div><div id="cell9-50" onclick="playerMoved(5,0)"></div><div id="cell9-51" onclick="playerMoved(5,1)"></div><div id="cell9-52" onclick="playerMoved(5,2)"></div><div id="cell9-33" onclick="playerMoved(3,3)"></div><div id="cell9-34" onclick="playerMoved(3,4)"></div><div id="cell9-35" onclick="playerMoved(3,5)"></div><div id="cell9-43" onclick="playerMoved(4,3)"></div><div id="cell9-44" onclick="playerMoved(4,4)"></div><div id="cell9-45" onclick="playerMoved(4,5)"></div><div id="cell9-53" onclick="playerMoved(5,3)"></div><div id="cell9-54" onclick="playerMoved(5,4)"></div><div id="cell9-55" onclick="playerMoved(5,5)"></div><div id="cell9-36" onclick="playerMoved(3,6)"></div><div id="cell9-37" onclick="playerMoved(3,7)"></div><div id="cell9-38" onclick="playerMoved(3,8)"></div><div id="cell9-46" onclick="playerMoved(4,6)"></div><div id="cell9-47" onclick="playerMoved(4,7)"></div><div id="cell9-48" onclick="playerMoved(4,8)"></div><div id="cell9-56" onclick="playerMoved(5,6)"></div><div id="cell9-57" onclick="playerMoved(5,7)"></div><div id="cell9-58" onclick="playerMoved(5,8)"></div><div id="cell9-60" onclick="playerMoved(6,0)"></div><div id="cell9-61" onclick="playerMoved(6,1)"></div><div id="cell9-62" onclick="playerMoved(6,2)"></div><div id="cell9-70" onclick="playerMoved(7,0)"></div><div id="cell9-71" onclick="playerMoved(7,1)"></div><div id="cell9-72" onclick="playerMoved(7,2)"></div><div id="cell9-80" onclick="playerMoved(8,0)"></div><div id="cell9-81" onclick="playerMoved(8,1)"></div><div id="cell9-82" onclick="playerMoved(8,2)"></div><div id="cell9-63" onclick="playerMoved(6,3)"></div><div id="cell9-64" onclick="playerMoved(6,4)"></div><div id="cell9-65" onclick="playerMoved(6,5)"></div><div id="cell9-73" onclick="playerMoved(7,3)"></div><div id="cell9-74" onclick="playerMoved(7,4)"></div><div id="cell9-75" onclick="playerMoved(7,5)"></div><div id="cell9-83" onclick="playerMoved(8,3)"></div><div id="cell9-84" onclick="playerMoved(8,4)"></div><div id="cell9-85" onclick="playerMoved(8,5)"></div><div id="cell9-66" onclick="playerMoved(6,6)"></div><div id="cell9-67" onclick="playerMoved(6,7)"></div><div id="cell9-68" onclick="playerMoved(6,8)"></div><div id="cell9-76" onclick="playerMoved(7,6)"></div><div id="cell9-77" onclick="playerMoved(7,7)"></div><div id="cell9-78" onclick="playerMoved(7,8)"></div><div id="cell9-86" onclick="playerMoved(8,6)"></div><div id="cell9-87" onclick="playerMoved(8,7)"></div><div id="cell9-88" onclick="playerMoved(8,8)"></div>';
    //disable all cells
    for(var i = 0;i<9;i++)
    {
        for(var j = 0;j<9;j++)
        {
            document.getElementById("cell9-"+i+j).style.cursor='not-allowed';

        }
    }
    console.log("new game started");
}


function setFirst(first)
{
    if(first=='hu')
    { 
        document.getElementById('co').classList.remove('active');
         compFirst = false; 
         document.getElementById('hu').classList.add('active'); 
    }
    if(first=='co')
    { 
        document.getElementById('hu').classList.remove('active'); 
        compFirst = true;  
        document.getElementById('co').classList.add('active'); 
    }
    console.log('first: '+first);
}


function setDifficulty(d)
{
    document.getElementById(difficulty).classList.remove('active');
    document.getElementById(d).classList.add('active');
    difficulty=d;
}


function compFirstMove(){
    var arr=[0,2,4,6,8];
    var bmove=arr[Math.floor(Math.random()*arr.length)];
    var smove=arr[Math.floor(Math.random()*arr.length)];
    makeMove(bmove,smove,'x');
    printMove(bmove,smove,'x');
    setBoard(bmove,smove);
    console.log(board);
}


function printMove(bmove,smove,symbol){
    var img=document.createElement("img");
    if(symbol=='o')
    {
        img.src="images/humanface.png";
        img.style.width='50%';
    }
        
    else if(symbol=='x')
    {
        img.src="images/robotface.png";
        img.style.width='60%';
    }
    let place=document.getElementById("cell9-"+bmove+smove);
     place.appendChild(img);
     place.onclick=null;
     place.style.cursor = 'not-allowed';
     console.log('bigb '+bigboardstatus);
}


//this function gets all the cells of board number bn and applies crimson/blue background
function wonlocal(sym,bn)
{
    for(var i = 0;i<9;i++)
    {
        document.getElementById("cell9-"+bn+i).classList.remove('highlightCell');
        document.getElementById("cell9-"+bn+i).classList.add('won'+sym);
    }
    var img=document.createElement("img");
    if(sym=='o')
    {
        img.src="images/humanface.png";
        // img.classList.add('won'+bn);
    }
    else if(sym=='x')
    {
        img.src="images/robotface.png";
        // img.classList.add('won'+bn);
    }
    img.classList.add('won'+bn);
    let place = document.getElementById('board').appendChild(img);


}


function playerMoved(bmove,smove)
{
    makeMove(bmove,smove,'o');
    if(bigboardstatus[bmove]=='o') wonlocal('o',bmove);
    printMove(bmove,smove,'o');
    setBoard(bmove,smove);
    var bigStat = evalboard();
    
    if(bigStat != 'n')
    {
        //this means player has won or it is a draw 
        //gameover
        console.log("game over");
        endGame(bigStat);
    }
    else
    {
      //have to decide which move to make in smove board
      sans = 0;
      bans = 0;
      console.log("called it with "+smove);
      var temp = getBestMove(smove,0,true,-10000,10000);
      console.log("bans is "+ bans + "sans is " + sans);
      makeMove(bans,sans,'x');
      if(bigboardstatus[bans]=='x') wonlocal('x',bans);
      printMove(bans,sans,'x');
      setBoard(bans,sans);
      var bigStat = evalboard();
      if(bigStat != 'n')
        {
            //this means player has won or it is a draw
            console.log("game over");
            endGame(bigStat);
        }
    }

}



function setBoard(bmove,smove){
    console.log("bmove= "+bmove+" smove= "+smove);
    
    if(firstMove==true){
        for(let j=0;j<9;j++)
        document.getElementById("cell9-"+smove+j).classList.add('highlightCell');
        //disable all boards except next board (smove is the next board number)
        for(let i=0;i<9;i++){
            if(i==smove)
                continue;
            else{
                for(let j=0;j<9;j++){
                    //console.log("cell9-"+i+j);
                    let place=document.getElementById("cell9-"+i+j);
                    place.onclick=null;
                    place.classList.remove('highlightCell');
                    place.style.cursor = 'not-allowed';
                }
            }
        }
        firstMove=false;
    }
    else{
        //disable current board, enable next board
        while(smove<9 && bigboardstatus[smove]!='-')
            smove++;
        if(smove==9){
            smove=0;
            while(smove<9 && bigboardstatus[smove]!='-')
            smove++;
        }
        for(let j=0;j<9;j++)
        document.getElementById("cell9-"+smove+j).classList.add('highlightCell');
        if(smove==9)    return;
        //console.log('smove='+smove);
        if(smove!=bmove){
            for(let j=0;j<9;j++){
                let currBoard=document.getElementById("cell9-"+bmove+j);
                currBoard.onclick=null;
                currBoard.style.cursor='not-allowed';
                currBoard.classList.remove('highlightCell');
                //enable only if not filled
                let nextBoard=document.getElementById("cell9-"+smove+j);
                nextBoard.style.cursor = 'pointer';
                if(bigboard[smove][j]=='-')
                    nextBoard.onclick= function() {playerMoved(smove,j)};
                
            }
        }
    }
    console.log("board set");
}

function endGame(ch)
{
   
    console.log(bigboardstatus);
    for(var i =0;i<9;i++)
        for(var j=0;j<9;j++)
        {
            let place=document.getElementById("cell9-"+i+j);
            place.onclick=null;
            place.style.cursor = 'not-allowed';
            place.classList.remove('highlightCell')
        }
    if(ch!='t')
    {
        //check all rows
        for(var i =0;i<9;i+=3)
        {
            if(bigboardstatus[i]==bigboardstatus[i+1] && bigboardstatus[i+1]==bigboardstatus[i+2])
            {
                if(bigboardstatus[i]!='-'){
                    drawWinningLine('H'+(Math.floor(i/3)+1));
                    return;
                }
            }
        }
        //check all cols
        for(var i = 0;i<3;i++)
        {
            if(bigboardstatus[i]==bigboardstatus[i+3] && bigboardstatus[i+3]==bigboardstatus[i+6])
            {
                if(bigboardstatus[i]!='-'){
                    console.log("here");
                    drawWinningLine('V'+(i+1));
                    return;
                }
            }  
        }
        //check diagonals
        if(bigboardstatus[0]==bigboardstatus[4] && bigboardstatus[4]==bigboardstatus[8])
        {
            if(bigboardstatus[4]!='-'){
                drawWinningLine('D1');
                return;
            }
        }
        if(bigboardstatus[2]==bigboardstatus[4] && bigboardstatus[4]==bigboardstatus[6])
        {
            if(bigboardstatus[4]!='-'){
                drawWinningLine('D2');
                return;
            }
        }
 
    }
    console.log('TIE!!');
}
 
function drawWinningLine(win)
{
    winn=win;
    console.log(win);
    document.getElementById("board").classList.add(win);
    document.getElementById("board").classList.add('full');
}