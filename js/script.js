const canvas = document.querySelector("canvas");

const score = document.querySelector(".score--value");
const finalScore = document.querySelector(".final-score > span");
const menu = document.querySelector(".menu-screen");
const btn = document.querySelector(".btn-play");

const h1 = document.querySelector("h1");

//incrementar o score sempre que a comida for comida
const scoreAtt = () => {
  return (score.innerText = parseInt(score.innerText) + 10);
};

//adicionando contexto ao canvas
const ctx = canvas.getContext("2d");

//definir tamnho fixo dos quadrados
const size = 30;

const initialPosition = { x: 0, y: 0 };
//cobra dentro do array armazenaremos os quadrados da cobra
//cada posição será um objeto porque salvaremos a posição de x, y
let snake = [initialPosition];

//armazenar direção que a cobra esta indo
let direction, loopId;

//gerar numero intero aleatorio
const randoNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
  //função para gerar número aleatorio
  //a multiplicação adiciona o maximo e a adição o minimo
};
//gerar com aleatoria com a função de gerar numero aleatorio
const colorRandon = () => {
  const red = randoNumber(0, 255);
  const green = randoNumber(0, 255);
  const blue = randoNumber(0, 255);
  return `rgb(${red},${green},${blue})`;
};
//Transformar o numero randon em multiplo de 30 para caber no grid
const randoPosition = () => {
  const number = randoNumber(0, canvas.width - size);
  return Math.round(number / 30) * 30;
};

//comida da cobra pode ser um objeto porque teremos somente uma por vez
const food = {
  x: randoPosition(0, 570),
  y: randoPosition(0, 570),
  color: colorRandon(),
};

const drawFood = () => {
  const { x, y, color } = food;
  ctx.fillStyle = color; //cor da comida
  ctx.shadowColor = color; //cor da sombra
  ctx.shadowBlur = 50;

  ctx.fillRect(x, y, size, size); //coordenadas da comida
  ctx.shadowBlur = 0;
};

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

//detequitar que a cobra adiquiriu o alimento
const checkEat = () => {
  const head = snake[snake.length - 1];
  if (head.x == food.x && head.y == food.y) {
    snake.push(head); //adiciona mais um quadrado a conbrinha acrescentando um snake
    scoreAtt();
    let x = randoPosition(); //cria novo x e novo y
    let y = randoPosition();

    while (
      //estrutura que gera um lugar aleatorio para o Food qque nao seja a propria cobrinha
      snake.find((position) => {
        position.x == x && position.y == y;
      })
    ) {
      x = randoPosition(); // se o while ser true faz novos x e y
      y = randoPosition();
    }

    food.x = x; // entrega os novos valçores de x e y do food
    food.y = y;
    food.color = colorRandon(); // cor continua randon
  }
};

//checar colisoes com ela mesma e com as bordas
const checkCollision = () => {
  const head = snake[snake.length - 1]; //a cabeça da cobra (último elemento do array)
  const nackIndex = snake.length - 2; //segundo elemento do corpo da cobra
  const limit = canvas.width - size; //tamanho limite da largura do canvas

  //colisao com a parede
  const wallCollision =
    head.x < 0 || head.x > limit || head.y < 0 || head.y > limit;

  //colisao com ela mesma
  const selfCollision = snake.find((position, index) => {
    return index < nackIndex && position.x == head.x && position.y == head.y;
  });

  if (selfCollision || wallCollision) {
    GameOver();
  }
};

//Função principal que faz o jogo rodar
const gameLoop = () => {
  clearTimeout(loopId);

  ctx.clearRect(0, 0, 600, 600); //apagar o quadro anterior
  drawGrid();
  drawFood();
  moveSnake();
  drawSnake();
  checkEat();
  checkCollision();

  //criando o valor de loopÍd se caso declarar aqui o clearInterval vai cancelar ele antes de iniciar
  loopId = setTimeout(() => {
    gameLoop();
  }, 200);
};

//Desenhar um grid
const drawGrid = () => {
  ctx.lineWidth = 1; //largura da linha

  ctx.strokeStyle = "#191919"; //estilo da linha (cor)

  //for para preencher o grid de froma automica
  for (let i = 30; i < canvas.width; i += 30) {
    ctx.beginPath(); //começar um novo caminho a partir de top X
    ctx.lineTo(i, 0); //começo da linha coordendas dadas em x,y
    ctx.lineTo(i, 600); //final da linha x,y
    ctx.stroke(); // metodo para desenhar em si

    ctx.beginPath();
    ctx.lineTo(0, i);
    ctx.lineTo(600, i);
    ctx.stroke();
  }
};

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

const GameOver = () => {
  direction = undefined;
  menu.style.display = "flex";
  finalScore.innerText = score.innerText;
  canvas.style.filter = "blur(4px)";
};

btn.addEventListener("click", () => {
  score.innerText = "00";
  canvas.style.filter = "none";
  menu.style.display = "none";

  snake = [initialPosition];
});

gameLoop();
