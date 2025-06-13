let drone;

let campo, cidade;

let item;

let entregando = false;

let pontuacao = 0;

let mensagemTimer = 0;

let mensagens = [

  "Drones ajudam na agricultura de precisão!",

  "Do campo vem o alimento que chega à cidade.",

  "Tecnologia conecta o campo à cidade!",

  "A cidade depende do campo para viver.",

  "Agricultura moderna usa sensores, dados e drones.",

];

let prediosAlturas = [];

function setup() {

  createCanvas(800, 400);

  drone = createVector(400, 200);

  campo = createVector(150, 250);

  cidade = createVector(650, 200);

  item = campo.copy();

  mensagemTimer = millis();

  // Define alturas fixas para prédios da cidade

  for (let x = 0; x < 10; x++) {

    prediosAlturas[x] = random(80, 150);

  }

}

function draw() {

  drawCeu();

  drawCampo();

  drawCeleiro(campo.x - 60, campo.y + 50);

  drawCidade();

  drawDrone(drone.x, drone.y);

  // Item no campo, só se não estiver entregando

  if (!entregando) {

    drawProduto(item.x, item.y + 30);

  }

  // Movimento do drone

  if (keyIsDown(LEFT_ARROW)) drone.x -= 3;

  if (keyIsDown(RIGHT_ARROW)) drone.x += 3;

  if (keyIsDown(UP_ARROW)) drone.y -= 3;

  if (keyIsDown(DOWN_ARROW)) drone.y += 3;

  // Limitar movimento para dentro da tela

  drone.x = constrain(drone.x, 15, width - 15);

  drone.y = constrain(drone.y, 15, height - 15);

  // Coleta no campo

  if (!entregando && dist(drone.x, drone.y, campo.x, campo.y) < 50) {

    entregando = true;

  }

  // Entrega na cidade

  if (entregando && dist(drone.x, drone.y, cidade.x, cidade.y) < 50) {

    entregando = false;

    pontuacao++;

    mensagemTimer = millis();

  }

  // HUD

  fill(0);

  textSize(16);

  textAlign(LEFT);

  text(`🎯 Pontuação: ${pontuacao}`, 10, height - 10);

  // Mensagem educativa a cada entrega

  if (millis() - mensagemTimer < 4000 && pontuacao > 0) {

    fill(0);

    textSize(18);

    textAlign(CENTER);

    let msg = mensagens[(pontuacao - 1) % mensagens.length];

    text("💡 " + msg, width / 2, height - 30);

    textAlign(LEFT);

  }

}

function drawCeu() {

  // Degradê do céu (de azul escuro até azul claro)

  for (let y = 0; y < height; y++) {

    let inter = map(y, 0, height, 0, 1);

    let c = lerpColor(color(135, 200, 245), color(25, 25, 112), inter);

    stroke(c);

    line(0, y, width, y);

  }

}

function drawCampo() {

  // Fundo verde campo metade esquerda

  noStroke();

  fill(100, 180, 100, 200);

  rect(0, 0, width / 2, height);

  // Grama com linhas

  stroke(70, 150, 70, 150);

  for (let y = 0; y < height; y += 15) {

    line(0, y, width / 2, y);

  }

  noStroke();

  // Texto e ícone

  fill(0);

  textSize(20);

  text("🌾 Campo", 20, 30);

  // Planta estilizada (espiga)

  push();

  translate(campo.x, campo.y);

  fill(200, 180, 50);

  for (let i = -2; i <= 2; i++) {

    ellipse(i * 10, 0, 10, 20);

  }

  fill(80, 160, 40);

  rect(-5, 10, 10, 30);

  pop();

}

function drawCeleiro(x, y) {

  push();

  translate(x, y);

  // Corpo do celeiro

  fill(178, 34, 34);

  stroke(100, 0, 0);

  strokeWeight(2);

  rect(0, 0, 80, 60);

  // Telhado

  fill(139, 0, 0);

  triangle(0, 0, 40, -40, 80, 0);

  // Porta

  fill(120, 0, 0);

  rect(30, 20, 20, 40);

  // Detalhes das tábuas

  stroke(255, 100, 100);

  strokeWeight(1);

  for (let i = 10; i < 80; i += 10) {

    line(i, 0, i, 60);

  }

  noStroke();

  pop();

}

function drawCidade() {

  fill(180, 200, 220, 220);

  rect(width / 2, 0, width / 2, height);

  fill(120);

  // prédios fixos

  let xBase = width / 2 + 40;

  for (let i = 0; i < prediosAlturas.length; i++) {

    let x = xBase + i * 60;

    let h = prediosAlturas[i];

    rect(x, height - h, 40, h);

    fill(255, 255, 100, 220);

    for (let y = height - h + 20; y < height - 10; y += 25) {

      rect(x + 10, y, 10, 15);

    }

    fill(120);

  }

  fill(0);

  textSize(20);

  text("🏙️ Cidade", width - 140, 30);

}

function drawDrone(x, y) {

  push();

  translate(x, y);

  // Corpo

  fill(0, 150, 255);

  ellipse(0, 0, 40, 25);

  // Hélices

  fill(50);

  for (let i = -1; i <= 1; i += 2) {

    ellipse(i * 20, -10, 15, 5);

    ellipse(i * 20, 10, 15, 5);

  }

  // Luz frontal

  fill(255, 50, 50);

  ellipse(15, 0, 8, 8);

  // Texto

  fill(0);

  noStroke();

  textSize(14);

  textAlign(CENTER);

  text("🚁", 0, 5);

  pop();

}

function drawProduto(x, y) {

  push();

  translate(x, y);

  fill(255, 204, 0);

  rect(-15, -15, 30, 30, 5);

  // Fita da caixa

  stroke(180, 140, 0);

  strokeWeight(3);

  line(-15, 0, 15, 0);

  line(0, -15, 0, 15);

  noStroke();

  fill(0);

  textSize(16);

  textAlign(CENTER);

  text("📦", 0, 7);

  pop();

}