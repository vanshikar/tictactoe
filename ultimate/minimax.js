function minimax(i,depth,isMax,alpha,beta)
{
   //base case
   //win lose or tie
   //check for base cases and return score associated and update the best move
   var bigStat = evalBoardScore();
   if(bigStat != 'n')
   {
       if(bigStat == 'x') return 1000-depth;
       if(bigStat== 'o') return -1000+depth;
       return 0;
    }
   
    if(depth==difficulty)
   {
       //calculate number of small boards won and number of small boards lost
       var temp = 0;
       for(var k = 0;k<9;k++)
       {
           if(bigboardstatus[k]=='x') temp++;
           if(bigboardstatus[k]=='o') temp--;
       }
       return 100*temp;

   }
   //iterate through all possible moves in ith board
    while(i<9 && bigboardstatus[i] != '-')  i++;
    if(i==9){
        i=0;
        while(i<9 && bigboardstatus[i] != '-')  i++;
    }
    if(i==9)    return 0;
    var sboard = bigboard[i];
    
    if(isMax)
    {
        //iterate through all possible moves and return the highest score possible
        //update answer with the best move
        var smove = 0;
        var score = -10000;
        for(var j = 0;j<9;j++)
         {
           if(sboard[j]=='-')
           {
                makeMove(i,j,'x');
                var temp = minimax(j,depth+1,false,alpha,beta);
                if(temp > score)
                 {
                    score = temp;
                    smove = j;
                 }
                 undoMove(i,j,'x');
                 alpha = Math.max(alpha,score);
                 if(alpha>=beta) break;
            }
         }
        sans = smove;
        bans = i;
        return score;
    }

    else
    {
        var smove = 0;
        var score = 10000;
        for(var j = 0;j<9;j++)
         {
           if(sboard[j]=='-')
           {
            makeMove(i,j,'o');
            var temp = minimax(j,depth+1,true,alpha,beta);
            if(temp < score)
            {
                score = temp;
                smove = j;
            }
            undoMove(i,j,'o');
            beta=Math.min(beta,score);
            if(alpha>=beta) break;
            }
         }
         sans = smove;
         bans = i;
        return score; 
    }
}

function evalBoardScore()
{
    //checking rows
    for(var i = 0;i<9;i+=3)
    {
        if(bigboardstatus[i]==bigboardstatus[i+1] && bigboardstatus[i+1]==bigboardstatus[i+2])
        {
            if(bigboardstatus[i]=='x' || bigboardstatus[i]=='o') return bigboardstatus[i];
        }
    }

    //checking for columns
    for(var i = 0;i<3;i++)
    {
        if(bigboardstatus[i]==bigboardstatus[i+3] && bigboardstatus[i+3]==bigboardstatus[i+6])
        {
            if(bigboardstatus[i]=='x' || bigboardstatus[i]=='o') return bigboardstatus[i];
        }
    }

    //checking for diagonals
    if(bigboardstatus[0]==bigboardstatus[4] && bigboardstatus[4]==bigboardstatus[8])
    {
        if(bigboardstatus[4]=='x' || bigboardstatus[4]=='o') return bigboardstatus[4];
    }
    if(bigboardstatus[2]==bigboardstatus[4] && bigboardstatus[4]==bigboardstatus[6])
    {
        if(bigboardstatus[4]=='x' || bigboardstatus[4]=='o') return bigboardstatus[4];
    }

    for(let i=0;i<9;i++){
        if(bigboardstatus[i]=='-'){
            return 'n';
        }
    }
    //if bigboardstatus full, but no win
    return 't';

}