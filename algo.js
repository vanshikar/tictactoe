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
    //return t if there is tie
    //else return n


    //check for ties
    var isfull = true;
    for(var i =0;i<3;i++)
        for(var j=0;j<3;j++)
            if(board[i][j]=='-') isfull=false;
    if(isfull) return 't';
    
    //check for wins
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

    //diagonals
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
    //return -10 if o is winner
    //return +10 if x is winner
    //return 0 if it is a draw
    
    //check base cases
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


