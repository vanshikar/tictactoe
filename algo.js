function returnbestmove()
{
    //check if we have a winner
    //initilaise move and score associated with it
    var move;
    var score = -10000;
    //board is global
    for(var i =0;i<9;i++)
        
            //check if move is possible at i
            if(board[i]=='-')
            {
                //make the move
                board[i] = 'x';
                //evaluate score on making this move
                var temp = returnScore(false,0);
                if(temp>score)
                {
                    //update this move as the best move so far
                    score = temp;
                    move = i;
                }
                //undo this move
                board[i] = '-';
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
    for(var i =0;i<9;i++)
            if(board[i]=='-') isfull=false;
    if(isfull) return 't';
    
    //check for wins
    for(let i=0;i<9;i+=3){
        //rows
        if(board[i]==board[i+1] && board[i+1]==board[i+2]){
            if(board[i]!='-') return board[i];
        }
        //cols
        
    }
    for(var i =0;i<3;i++)
    {
        if(board[i+3]==board[i] && board[i+3]==board[i+6]){
            if(board[i]!='-') return board[i];
        }
    }

    //diagonals
    if(board[0]==board[4] && board[4]==board[8]) 
    {
        if(board[0]=='o') return 'o';
        if(board[0]=='x') return 'x';
    }
    
    if(board[2]==board[4] && board[4]==board[6]) 
    {
        {
            if(board[2]=='o') return 'o';
            if(board[2]=='x') return 'x';
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
    if(temp1=='t') return 0;
    if(temp1=='x') return 10-depth;
    if(temp1=='o') return -10+depth;
    if(depth==maxdepth) return 0;
    
    
    
    
    if(isMax)
    {
        //make all possible moves and return highest possible score
        var score = -1000;
        for(var i =0;i<9;i++)
            
                if(board[i]=='-')
                {
                    board[i]='x';
                    var temp = returnScore(false,depth+1);
                    score = Math.max(score,temp);
                    board[i] = '-';
        
                }
            
        return score;
    }
    else
    {
        var score = 1000;
        for(var i =0;i<9;i++)
        
                if(board[i]=='-')
                {
                    board[i]='o';
                    var temp = returnScore(true,depth+1);
                    score = Math.min(score,temp);
                    board[i] = '-';
        
                } 
            
        return score;
    }
    
}


