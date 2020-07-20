//hash map  //key is board value is score
var memo={};

function returnBestMove()
{
    //check if we have a winner
    //initilaise move and score associated with it
    var move;
    var score = -1000;
    //board is global
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
                //update this move as the best move so far
                score = temp;
                move = i;
            }
            //undo this move
           setBoard(i,'-');
        }
    }
    return move;
    
}
    
function evalBoard(lastMove)
{
    //only need to check rows/columns/diags with lastMove index present
    if(Math.abs(checkR[Math.floor(lastMove/n)])==n){
        if(checkR[Math.floor(lastMove/n)]==n)
            return 'x';
        else
            return 'o';
    }
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
    var temp1 = evalBoard(lastMove);
    if(temp1=='t') return 0;
    if(temp1=='x') return 10-depth;
    if(temp1=='o') return -10+depth;
    if(depth==maxDepth) return 0;
    
    
    
    
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
                if(alpha>=beta) break;
    
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
                if(alpha>=beta) break;
    
            } 
        }
        return beta;
    }
    
}