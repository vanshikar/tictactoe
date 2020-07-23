//hash map  //key is board value is score
//var memo={};

var storemin=[];
var storemax=[];

var arr=[];
 
function returnBestMove()
{
    //check if we have a winner
    //initilaise move and score associated with it
    var move;
    var score = -1000;
    for(var i =0;i<n*n;i++)
    {
        //check if move is possible at i
        if(board[i]=='-')
        {
            //make the move
            setBoard(i,'x');
            //evaluate score on making this move
            var temp = returnScore(false,0,-1000,1000,i);
            if(temp>score)
            {
                arr.length=0;
                score = temp;
                arr.push(i);
            }
            if(temp==score) arr.push(i);
            //undo this move
           setBoard(i,'-');
        }
    }
    move = arr[Math.floor(Math.random()*arr.length)];
    return move;
    
}
    
function evalBoardScore(lastMove)
{
    //only need to check rows/columns/diags with lastMove index present
    //check Row
    if(Math.abs(checkR[Math.floor(lastMove/n)])==n){
        if(checkR[Math.floor(lastMove/n)]==n)
            return 'x';
        else
            return 'o';
    }
    //check Col
    if(Math.abs(checkC[lastMove%n])==n){
        if(checkC[lastMove%n]==n)
            return 'x';
        else
            return 'o';
    }
    //check if on diagonal
    if(lastMove%(n+1)==0){
        //left diag
        if(Math.abs(checkD[0])==n){
            if(checkD[0]==n)
                return 'x';
            else
            return 'o';
        }
    }
    if(lastMove!=0 && lastMove!=(n*n-1) && lastMove%(n-1)==0){
        //right diag
        if(Math.abs(checkD[1])==n){
            if(checkD[1]==n)
                return 'x';
            else
                return 'o';
        }
    }
    var isfull = true;
    for(let i=0;i<n*n;i++){
        if(board[i]=='-'){
            isfull=false;
            break;
        }
    }
    if(isfull) return 't';
    return 'n';
}
    
function returnScore(isMax,depth,alpha,beta,lastMove)
{
    //check if either player is winner
    //return -10 if o is winner
    //return +10 if x is winner
    //return 0 if it is a draw / reached max depth
    
    //check if winner
    var temp1 = evalBoardScore(lastMove);
    if(temp1=='t') return 0;
    if(temp1=='x') return 1000-depth;
    if(temp1=='o') return -1000+depth;
    if(depth==maxDepth){
        return 0;
       //return betterHeuristic(board);
    }
    
    if(isMax)
    {
        //make all possible moves and return highest possible score
        var score = -1000;
        for(var i =0;i<n*n;i++)
        {
            if(board[i]=='-')
            {
                setBoard(i,'x');
                var temp;
                //if(board in memo)
                //    temp=memo[board];
                //else{
                    temp = returnScore(false,depth+1,alpha,beta,i);
                    //inserting in hashmap
                    //memo[board]=temp;
                //}
                score = Math.max(score,temp);
                alpha = Math.max(score,alpha);
                setBoard(i,'-');
                if(alpha>=beta){
                    //storemax.push(i);
                    break;
                }
    
            }
        }
        return alpha;
    }
    else
    {
        var score = 1000;
        for(var i =0;i<n*n;i++)
        {
            if(board[i]=='-')
            {
                setBoard(i,'o');
                var temp;
                //if(board in memo)
                //    temp=memo[board];
                //else{
                    temp = returnScore(true,depth+1,alpha,beta,i);
                 //   memo[board]=temp;
                //}
                score = Math.min(score,temp);
                beta = Math.min(score,beta);
                setBoard(i,'-');
                if(alpha>=beta){
                    //storemin.push(i);
                    break;
                }    
            } 
        }
        return beta;
    }
    
}

function betterHeuristic(board){
    //score each row/col/diag
    //return max/min
    let maxscore=-1000,minscore=1000,currscore=0;
    for(let i=0;i<n*n;i+=n){
        //for each row
        currscore=0;
        let j=i;
        for(;j<i+n;j++){
            if(board[j]=='x')
                currscore++;
            else if(board[j]=='o')
                currscore--;
        }
        maxscore=Math.max(maxscore,currscore);
        minscore=Math.min(minscore,currscore);
        /*if(maxscore<minscore){
        let temp=maxscore;
        maxscore=minscore;
        minscore=temp;
        }
        */
    }

    for(let i=0;i<n;i++){
        //for each column
        let j=i;
        currscore=0;
        for(;j<n*n;j+=n){
            if(board[j]=='x')
                currscore++;
            else if(board[j]=='o')
                currscore--;
        }
        maxscore=Math.max(maxscore,currscore);
        minscore=Math.min(minscore,currscore);
        /*if(maxscore<minscore){
        let temp=maxscore;
        maxscore=minscore;
        minscore=temp;
        }
        */
    }

    //for left diagonal
    currscore=0;
    for(let k=n+1;k<n*n;k+=n+1){
        if(board[k]=='x')
                currscore++;
        else if(board[k]=='o')
            currscore--;
    }
    maxscore=Math.max(maxscore,currscore);
    minscore=Math.min(minscore,currscore);
    /*if(maxscore<minscore){
        let temp=maxscore;
        maxscore=minscore;
        minscore=temp;
    }
    */
    //for right diagonal
    currscore=0;
    for(let k=n-1;k<(n-1)*(n+1);k+=n-1){
        if(board[k]=='x')
            currscore++;
        else if(board[k]=='o')
            currscore--;
    }
    maxscore=Math.max(maxscore,currscore);
    minscore=Math.min(minscore,currscore);
    /*if(maxscore<minscore){
        let temp=maxscore;
        maxscore=minscore;
        minscore=temp;
    }
    */
    let score= (Math.abs(minscore)>Math.abs(maxscore))? minscore: maxscore;
    console.log('better heuristic score= '+score);
    return 100*score;
}