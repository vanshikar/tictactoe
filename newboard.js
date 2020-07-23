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

function activateDepth(depth){
    for(let i=-1;i<5;i++){
        if(i==0)    continue;
        let option =document.getElementById('depth'+i);
        if(option.classList.contains('active')){
            option.classList.remove('active');
            break;
        }
    }

    document.getElementById('depth'+depth).classList.add('active');
}

function activateSize(size){
    for(let i=3;i<7;i++){
        let option =document.getElementById('s'+i);
        if(option.classList.contains('active')){
            option.classList.remove('active');
            break;
        }
    }
    document.getElementById('s'+size).classList.add('active');
}

function setDifficultyAndSize(){
    if(document.getElementById('s3').classList.contains('active')){
        n=3;
        if(document.getElementById('depth-1').classList.contains('active'))
            maxDepth=-1;
        else if(document.getElementById('depth4').classList.contains('active'))
            maxDepth=5;
        else if(document.getElementById('depth3').classList.contains('active'))
            maxDepth=4;
        else if(document.getElementById('depth2').classList.contains('active'))
            maxDepth=3;
        else if(document.getElementById('depth1').classList.contains('active'))
            maxDepth=2;
    }

    else if(document.getElementById('s4').classList.contains('active')){
        n=4;
        if(document.getElementById('depth-1').classList.contains('active'))
            maxDepth=10;
        else if(document.getElementById('depth4').classList.contains('active'))
            maxDepth=8;
        else if(document.getElementById('depth3').classList.contains('active'))
            maxDepth=6;
        else if(document.getElementById('depth2').classList.contains('active'))
            maxDepth=4;
        else if(document.getElementById('depth1').classList.contains('active'))
            maxDepth=2;
    }

    else if(document.getElementById('s5').classList.contains('active')){
        n=5;
        if(document.getElementById('depth-1').classList.contains('active'))
            maxDepth=8;
        else if(document.getElementById('depth4').classList.contains('active'))
            maxDepth=7;
        else if(document.getElementById('depth3').classList.contains('active'))
            maxDepth=6;
        else if(document.getElementById('depth2').classList.contains('active'))
            maxDepth=5;
        else if(document.getElementById('depth1').classList.contains('active'))
            maxDepth=4;
    }

    else if(document.getElementById('s6').classList.contains('active')){
        n=6;
        if(document.getElementById('depth-1').classList.contains('active'))
            maxDepth=5;
        else if(document.getElementById('depth4').classList.contains('active'))
            maxDepth=4;
        else if(document.getElementById('depth3').classList.contains('active'))
            maxDepth=3;
        else if(document.getElementById('depth2').classList.contains('active'))
            maxDepth=2;
        else if(document.getElementById('depth1').classList.contains('active'))
            maxDepth=1;
    }

    console.log('depth= '+maxDepth);
    console.log('size= '+n);
}