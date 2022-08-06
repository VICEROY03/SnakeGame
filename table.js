let rowNum = Number(getComputedStyle(document.querySelector(':root')).getPropertyValue('--rowNum'));
let colNum = Number(getComputedStyle(document.querySelector(':root')).getPropertyValue('--colNum'));
let initialRow = 4;
let initialCol = 4;
let initialApple = 'r'+4+'-c'+8;
let initialSnakeBody = ['r'+initialRow+'-c'+initialCol, 'r'+initialRow+'-c'+(initialCol-1), 'r'+initialRow+'-c'+(initialCol-2), 'r'+initialRow+'-c'+(initialCol-3)]
let initialfreeCellsSet = new Set();
let score = 0;
let highScore = localStorage.getItem('highscore');

let eyeTop1 = document.createElement("div");
eyeTop1.setAttribute('class', 'snake-face-top');
let eyeTop2 = document.createElement("div");
eyeTop2.setAttribute('class', 'snake-face-top');
//
let eyeRight1 = document.createElement("div");
eyeRight1.setAttribute('class', 'snake-face-right');
let eyeRight2 = document.createElement("div");
eyeRight2.setAttribute('class', 'snake-face-right');
//
let eyeBottom1 = document.createElement("div");
eyeBottom1.setAttribute('class', 'snake-face-bottom');
let eyeBottom2 = document.createElement("div");
eyeBottom2.setAttribute('class', 'snake-face-bottom');
//
let eyeLeft1 = document.createElement("div");
eyeLeft1.setAttribute('class', 'snake-face-left');
let eyeLeft2 = document.createElement("div");
eyeLeft2.setAttribute('class', 'snake-face-left');


window.onload = function createTable(){
    for(let r=0; r<rowNum; r++){
        let x = document.getElementById('myTable').insertRow(r);
        for(let c=0; c<colNum; c++){
            let y = x.insertCell(c);
            let z = 'r'+r+'-c'+c;
            initialfreeCellsSet.add(z);
            y.setAttribute('id', z);
            if((r+c)%2==0){
                y.classList.add('white');
            }
            else{
                y.classList.add('grey');
            }
        }
    }
    for(i in initialSnakeBody){
        document.getElementById(initialSnakeBody[i]).classList.add('snake-body');
        initialfreeCellsSet.delete(initialSnakeBody[i]);
    }
    document.getElementById(initialSnakeBody[0]).appendChild(eyeRight1);
    document.getElementById(initialSnakeBody[0]).appendChild(eyeRight2);
    document.getElementById(initialApple).classList.add('apple');
    if(highScore==null){
        localStorage.setItem('highscore', '0');
    }
    document.getElementById('score').innerHTML = 'Score: '+ score;
    document.getElementById('highscore').innerHTML = 'Highscore: '+ highScore;
}
