let dividerY;
let salmons = [];
let systems = [];

function setup() {
  createCanvas(800, 600);
  dividerY = height / 2;

  textAlign(CENTER, CENTER);
  textSize(32);

  for (let i = 0; i < 11; i++) {
    let x = random(50, width - 50);
    let y = random(dividerY + 50, height - 50);
    salmons.push(new Salmon(x, y));
  }
}

function draw() {
  background(20, 40, 80);

  drawRiverZones();

  // 연어 업데이트 & 그리기
  for (let i = salmons.length - 1; i >= 0; i--) {
    salmons[i].update();
    salmons[i].show();

    // 다 터지고 더 이상 쓸모 없으면 리스트에서 제거
    if (salmons[i].finished) {
      salmons.splice(i, 1);
    }
  }

  // 연어 재생성
  if (salmons.length < 11) {
    let x = random(50, width - 50);
    let y = random(dividerY + 50, height - 50);
    salmons.push(new Salmon(x, y));
  }

  // 파티클 시스템 업데이트 & 그리기
  for (let i = systems.length - 1; i >= 0; i--) {
    systems[i].run();
    }
  }

function drawRiverZones() {
  // 상류(위)
  noStroke();
  fill(40, 90, 160);
  rect(0, 0, width, dividerY);

  // 하류(아래)
  fill(10, 60, 120);
  rect(0, dividerY, width, height - dividerY);

  // 텍스트 라벨
  noStroke();
  fill(255);
  textSize(30);
  text("🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊", 400, 300);
}

function mousePressed() {
  // 클릭할 때 가장 인접한 연어를 상류로 보내기
  let clickedIndex = -1;
  let minDist = 99999;

  for (let i = 0; i < salmons.length; i++) {
    let s = salmons[i];
    if (s.exploded) continue;
    let d = dist(mouseX, mouseY, s.pos.x, s.pos.y);
    if (d < 40 && d < minDist) { // 40px 정도를 클릭 범위로
      minDist = d;
      clickedIndex = i;
    }
  }

  if (clickedIndex !== -1) {
    salmons[clickedIndex].startMigration();
  }
}