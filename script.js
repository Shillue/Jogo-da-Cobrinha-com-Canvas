let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let comida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//Função para criar Grade do jogo
function criarGrade(){
    context.fillStyle = "#c1d09f";
    context.fillRect(0, 0, 16 *box, 16 * box);
}
//Função para criar cobrinha
function criarCobrinha(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//Função criar comidinha
function drawComida(){
    context.fillStyle = "red";
    context.fillRect(comida.x, comida.y, box, box);
}

//Evento de esculta para controla a cobrinha pelo teclado
document.addEventListener("keydown", atualizaSnakeP);
//Função para controla a cobrinha pelo teclado
function atualizaSnakeP(event){
    if(event.keyCode == 37 && direction != "right"){
        direction = "left";
    }
    if(event.keyCode == 38 && direction != "down"){
        direction = "up";
    }
    if(event.keyCode == 39 && direction != "left"){
        direction = "right";
    }
    if(event.keyCode == 40 && direction != "up"){
        direction = "down";
    }
}


//Função iniciar Jogo
function iniciarJogo(){

    //Quando a cobrinha sair do canvas de um dos lados ela aparece no lado contrario ao que ela saiu
    if(snake[0].x > 15 * box && direction == "right"){
        snake[0].x = 0;
    }
    if(snake[0].x < 0 && direction == "left"){
        snake[0].x = 16 * box;
    }
    if(snake[0].y > 15 * box && direction == "down"){
        snake[0].y = 0;
    }
    if(snake[0].y < 0 && direction == "up"){
        snake[0].y = 16 * box;
    }

    //condição de fim de jogo
    for(i=1; i< snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Game Over :(");            
        }
    }

    criarGrade();
    criarCobrinha(); 
    drawComida();

    //Posição da cobrinha
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;   

    //codicionais das direções da cobrinha
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -=box;
    if(direction == "down") snakeY += box;

    //Fazer a cobrinha crescer
    if(snakeX != comida.x || snakeY != comida.y){
        snake.pop();//Função retira o último elemento da cobrinha
    }else {
       comida.x = Math.floor(Math.random() * 15 + 1) * box;
       comida.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    //Para cabeça da cobrinha
    let novaHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(novaHead);
}
//Pro jogo funcionar
let jogo = setInterval(iniciarJogo, 100);


