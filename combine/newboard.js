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
    maxDepth=depth;
    document.getElementById('depth'+depth).classList.add('active');
    console.log('depth= '+maxDepth);
}
    
function setBoardSize(size){
    document.getElementById('board').classList.remove(n);
    document.getElementById('s'+n).classList.remove('active');
    n=size;
    document.getElementById('s'+size).classList.add('active');
    document.getElementById('board').classList.add(n);
    console.log('size= '+n);
}