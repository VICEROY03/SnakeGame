
let currentRow = initialRow;
let currentCol = initialCol;
let currentApple = initialApple;
let snakeBody = initialSnakeBody.slice();
var timedFunc;
let direction = [1, 0];
let tmp=direction;
let freeCellsSet = new Set(initialfreeCellsSet);

window.addEventListener('keydown', function(event){
    if(event.key==="Enter"){
        document.getElementsByTagName("button")[0].focus();
    }
});

function myListener(event){
    if(event.key==="ArrowUp"){
        direction = [0,-1];
        console.log("u");
    }
    else if(event.key==="ArrowDown"){
        direction = [0,1];
        console.log("d");
    }
    else if(event.key==="ArrowLeft"){
        direction = [-1,0];
        console.log("l");
    }
    else if(event.key==="ArrowRight"){
        direction = [1,0];
        console.log("r");
    }
}
function startGame() {
    document.getElementById("play").style.display="none";
    window.addEventListener('keydown', myListener);
    
    timedFunc = setInterval(moveSnake, 300);
} 

function setEyes(){
    if(tmp[0]==1){
        document.getElementById(snakeBody[0]).appendChild(eyeRight1);
        document.getElementById(snakeBody[0]).appendChild(eyeRight2);
    }
    else if(tmp[0]==-1){
        document.getElementById(snakeBody[0]).appendChild(eyeLeft1);
        document.getElementById(snakeBody[0]).appendChild(eyeLeft2);
    }
    else if(tmp[1]==1){
        document.getElementById(snakeBody[0]).appendChild(eyeBottom1);
        document.getElementById(snakeBody[0]).appendChild(eyeBottom2);
    }
    else if(tmp[1]==-1){
        document.getElementById(snakeBody[0]).appendChild(eyeTop1);
        document.getElementById(snakeBody[0]).appendChild(eyeTop2);
    }
}

function moveSnakeBody(){
    let i = snakeBody.length-1;
    document.getElementById(snakeBody[i]).classList.remove('snake-body');
    for(i; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
}

function resetGame(snakeHead){
    snakeHead.innerHTML="";
    snakeHead.classList.remove('snake-body');
    snakeBody[0] = 'r'+currentRow+'-c'+currentCol;
    for(let i=snakeBody.length-1; i>0; i--){
        document.getElementById(snakeBody[i]).classList.remove('snake-body');
    }
    currentRow = initialRow;
    currentCol = initialCol;
    snakeBody = initialSnakeBody.slice();
    freeCellsSet = new Set(initialfreeCellsSet);
    for(let i=snakeBody.length-1; i>0; i--){
        document.getElementById(snakeBody[i]).classList.add('snake-body');
    }

    document.getElementById(currentApple).classList.remove('apple');
    currentApple = initialApple;
    document.getElementById(initialApple).classList.add('apple');

    if(score > highScore){
        highScore = score;
        localStorage.setItem('highscore', highScore);
    }
    score = 0;
    document.getElementById('score').innerHTML = 'Score: '+ score;
    document.getElementById('highscore').innerHTML = 'Highscore: '+ highScore;

    window.removeEventListener('keydown', myListener);
    document.getElementById("play").style.display="inline";
    direction = [1, 0];
    tmp = direction;
    clearInterval(timedFunc);
}

function setApple(){
    let random = Math.floor(Math.random() * freeCellsSet.size);
    const iterator1 = freeCellsSet.entries();
    let i=0;
    for (const entry of iterator1) {
        if(i==random){
            document.getElementById(entry[0]).classList.add('apple');
            currentApple = entry[0];
            return;
        }
        i++;
    }
}

function moveSnake(){
    let snakeHead = document.getElementById(snakeBody[0]);
    
    if(direction[0]!=(-1)*tmp[0] && direction[1]!=(-1)*tmp[1]){
        tmp = direction;
    }
    currentCol += tmp[0];
    currentRow += tmp[1];
    
    if(currentCol>=colNum || currentCol<0 || currentRow>=rowNum || currentRow<0 || document.getElementById('r'+currentRow+'-c'+currentCol).classList.contains('snake-body')){
        resetGame(snakeHead);
    }
    else if(document.getElementById('r'+currentRow+'-c'+currentCol).classList.contains('apple')){
        score++;
        document.getElementById('score').innerHTML = 'Score: '+ score;

        snakeBody.push(snakeBody[snakeBody.length-1]);

        snakeHead.innerHTML="";
        moveSnakeBody();
        snakeBody[0] = 'r'+currentRow+'-c'+currentCol;

        freeCellsSet.delete(snakeBody[0]);
        document.getElementById('r'+currentRow+'-c'+currentCol).classList.remove('apple');
        setApple();
    }
    else{
        snakeHead.innerHTML="";
        freeCellsSet.add(snakeBody[snakeBody.length-1]);
        moveSnakeBody();
        snakeBody[0] = 'r'+currentRow+'-c'+currentCol;
        freeCellsSet.delete(snakeBody[0]);
    }
    
    setEyes();
    
    snakeHead = document.getElementById(snakeBody[0]);
    snakeHead.classList.add('snake-body');
}
