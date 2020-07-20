function makeMove(bmove, smove,player)
{
    bigboard[bmove][smove] = player;
    cellsfilled++;
    smallcellsfilled[bmove]++;
    updatebigstatus(bmove,smove,player);
}

function undoMove(bmove,smove,player)
{
    bigboard[bmove][smove] = '-';
    cellsfilled--;
    smallcellsfilled[bmove]--;
    if(bigboardstatus[bmove]==player || bigboardstatus[bmove]=='t') 
        bigboardstatus[bmove] = '-';
}


function updatebigstatus(bmove,smove,player)
{
    var currboard = bigboard[bmove];
    //check the row
    var rn = Math.floor(smove/3);
    var cn = smove%3;
    if(currboard[rn*3]==currboard[rn*3+1] && currboard[rn*3+1]==currboard[rn*3+2])
    {
        bigboardstatus[bmove] = player;
        return; 
    }
    //check the col
    if(currboard[cn]==currboard[cn+3] && currboard[cn+3]==currboard[cn+6])
    {
        bigboardstatus[bmove] = player; 
        return;
    }

    //check if it lies on diagonal
    if(rn==cn)
    {
        if(currboard[0]==currboard[4] && currboard[4]==currboard[8])
        {
            bigboardstatus[bmove] = player;  
            return;
        }
        
    }
    if(rn+cn==2)
    {
        if(currboard[2]==currboard[4] && currboard[4]==currboard[6])
        {
            bigboardstatus[bmove] = player;  
            return;
        }
    }
    if (smallcellsfilled[bmove]==9 && bigboardstatus[bmove]=='-') bigboardstatus[bmove] = 't';

}
