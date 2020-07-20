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
    
function setDifficulty(depth){
    document.getElementById('depth'+maxDepth).classList.remove('active');
    if(n==5 && depth==-1)
        maxDepth=8;
    else if(n==6 && depth==-1)
        maxDepth=5;
    maxDepth=depth;
    document.getElementById('depth'+depth).classList.add('active');
    console.log('depth= '+maxDepth);
}
    
function setBoardSize(size){
    document.getElementById('board').classList.remove(n);
    document.getElementById('s'+n).classList.remove('active');
    n=size;
    if(n<=3 && maxDepth>4)
        maxDepth=-1;
    else if(n==5 && maxDepth==-1)
        maxDepth=8;
    else if(n==6 && maxDepth==-1)
        maxDepth=5;
    document.getElementById('s'+size).classList.add('active');
    document.getElementById('board').classList.add(n);
    console.log('size= '+n);
    console.log('depth= '+maxDepth);
}