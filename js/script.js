const canvas = document.querySelector("canvas");

//adicionando contexto ao canvas
const ctx = canvas.getContext("2d");

//definir tamnho fixo dos quadrados
const size = 30;

//cobra dentro do array armazenaremos os quadrados da cobra
//cada posição será um objeto porque salvaremos a posição de x, y
const snake = [
  { x: 230, y: 200 },
  { x: 260, y: 200 },
  { x: 260, y: 230 },
  { x: 260, y: 260 },
];

//armazenar direção que a cobra esta indo
let direction 

//desenhando a cobrinha
const drawSnake = () => {
  //definindo a cor dos elementos
  ctx.fillStyle = "#ddd";

  //percorrer as coordenadas no array snake
  snake.forEach((e, index) => {
    if (index == snake.length - 1) {
      ctx.fillStyle = "blue";
    }
    ctx.fillRect(e.x, e.y, size, size);
  });
};

//função para mover a cobra

drawSnake();
