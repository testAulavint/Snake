const canvas = document.querySelector("canvas");

//adicionando contexto ao canvas
const ctx = canvas.getContext("2d");

//definir tamnho fixo dos quadrados
const size = 30;

//cobra dentro do array armazenaremos os quadrados da cobra
//cada posição será um objeto porque salvaremos a posição de x, y
const snake = [{ x: 0, y: 0 }];

//armazenar direção que a cobra esta indo
let direction, loopId;

//desenhando a cobrinha
const drawSnake = () => {
  //definindo a cor dos elementos
  ctx.fillStyle = "#ddd";

  //percorrer as coordenadas no array snake
  snake.forEach((e, index) => {
    if (index == snake.length - 1) {
      ctx.fillStyle = "red";
    }
    ctx.fillRect(e.x, e.y, size, size);
  });
};

//função para mover a cobra
const moveSnake = () => {
  //armazenar ultimo elemento | a cabeça da cobra
  const head = snake[snake.length - 1];

  //validação da direção
  if (!direction) {
    return;
  }

  //faz o movimento acontecer adicionando um objeto ao array
  if (direction == "right") {
    snake.push({ x: head.x + size, y: head.y });
  }
  //faz o movimento acontecer adicionando um objeto ao array para esquerda
  if (direction == "left") {
    snake.push({ x: head.x - size, y: head.y });
  }
  //faz o movimento acontecer adicionando um objeto ao array para baixo
  if (direction == "down") {
    snake.push({ x: head.x, y: head.y + size });
  }
  //faz o movimento acontecer adicionando um objeto ao array para cima
  if (direction == "up") {
    snake.push({ x: head.x, y: head.y - size });
  }

  //remover o últinmo elemento do array
  snake.shift();
};

//Função principal que faz o jogo rodar
const gameLoop = () => {
  clearInterval(loopId);

  ctx.clearRect(0, 0, 600, 600); //apagar o quadro anterior
  moveSnake();
  drawSnake();

  //criando o valor de loopÍd se caso declarar aqui o clearInterval vai cancelar ele antes de iniciar
  loopId = setTimeout(() => {
    gameLoop();
  }, 100);
};

//Desenhar um grid
const drawGrid = () => {
  ctx.lineWidth = 1; //largura da linha

  ctx.strokeStyle = "white"; //estilo da linha (cor)

  ctx.lineTo(300, 0); //começo da llinha coordendas dadas em x,y
  ctx.lineTo(300, 600); //final da linha x,y

  ctx.stroke();
};

drawGrid();
 gameLoop();

//evento de teclado para jogar
document.addEventListener("keydown", ({ key }) => {
  if (key == "ArrowRight" && direction != "left") {
    direction = "right";
  }

  if (key == "ArrowLeft" && direction != "right") {
    direction = "left";
  }

  if (key == "ArrowDown" && direction != "up") {
    direction = "down";
  }

  if (key == "ArrowUp" && direction != "down") {
    direction = "up";
  }
});
