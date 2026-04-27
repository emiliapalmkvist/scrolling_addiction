let instagramURL = "https://www.instagram.com/reels/";
let stage = 0;

let quoteSets = {
  comparison: [
    '"They look better here."',
    '"I compare myself without meaning to."',
    '"I know it is curated, but it still gets to me."'
  ],

  timeloss: [
    '"I did not notice the time."',
    '"I was only going to check for a minute."',
    '"Wait... how long have I been here?"'
  ],

  compulsion: [
    '"Just one more."',
    '"I keep checking without thinking."',
    '"I do not know why I opened it again."'
  ],

  emptiness: [
    '"After scrolling for a long time, I can get an empty feeling."',
    '"I scroll because I do not know what else to do."',
    '"I can be online all day and still feel socially empty."'
  ],

  overstimulation: [
    '"I cannot keep up."',
    '"I do not want to miss it."',
    '"It is too much, but I stay."'
  ]
};

let currentType = "comparison";
let currentQuotes = [];

let nextBtn = { x: 0, y: 0, w: 0, h: 58 };
let holdBtn = { x: 0, y: 0, w: 0, h: 60 };

let holding = false;
let holdProgress = 0;
let holdRequired = 90;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Arial");

  let params = new URLSearchParams(window.location.search);
  currentType = params.get("type") || "comparison";

  if (!quoteSets[currentType]) {
    currentType = "comparison";
  }

  currentQuotes = quoteSets[currentType];
}

function draw() {
  background(245, 216, 63);

  let cardW = min(width - 40, 430);
  let cardH = min(height - 40, 760);
  let cardX = (width - cardW) / 2;
  let cardY = (height - cardH) / 2;

  noStroke();
  fill(20);
  rect(cardX, cardY, cardW, cardH, 24);

  let x = cardX + 28;
  let y = cardY + 32;
  let contentW = cardW - 56;

  textAlign(LEFT, TOP);
  textStyle(BOLD);
  fill(245, 216, 63);
  textSize(13);
  text("WARNING", x, y);

  y += 55;

  if (stage <= 2) {
  drawQuoteStage(x, y, contentW);
} else if (stage === 3) {
  drawHoldStage(x, y, contentW);
}

  if (stage === 4) {
    if (holding) {
      holdProgress++;

      if (holdProgress >= holdRequired) {
        window.location.href = instagramURL;
      }
    } else {
      holdProgress = max(0, holdProgress - 3);
    }
  }
}

function drawQuoteStage(x, y, contentW) {
  textAlign(LEFT, TOP);

  fill(255);
  textStyle(BOLD);
  textSize(32);
  textLeading(38);
  text(currentQuotes[stage], x, y, contentW);

  y += 220;

  fill(200);
  textStyle(NORMAL);
  textSize(16);
  textLeading(22);
  text(
    "These are not warnings from a system. They are lived experiences.",
    x,
    y,
    contentW
  );

  y += 120;

  let label = "Continue";
  drawNextButton(x, y, contentW, label);
}

function drawRevealStage(x, y, contentW) {
  textAlign(LEFT, TOP);

  fill(245, 216, 63);
  textStyle(BOLD);
  textSize(29);
  textLeading(35);
  text("THIS SYSTEM IS DESIGNED TO CONTINUE.", x, y, contentW);

  y += 120;

  fill(255);
  textStyle(NORMAL);
  textSize(18);
  textLeading(28);

  text("There is no natural stopping point.", x, y, contentW);

  y += 55;

  text(
    "You are shown what is most likely to keep you engaged, not what is most likely to satisfy you.",
    x,
    y,
    contentW
  );

  y += 115;

  text("Continuation becomes easier than stopping.", x, y, contentW);

  y += 120;

  drawNextButton(x, y, contentW, "I understand");
}

function drawHoldStage(x, y, contentW) {
  textAlign(LEFT, TOP);

  fill(245, 216, 63);
  textStyle(BOLD);
  textSize(27);
  textLeading(33);
  text("YOU ARE ABOUT TO ENTER THE FEED.", x, y, contentW);

  y += 110;

  fill(255);
  textStyle(NORMAL);
  textSize(18);
  textLeading(28);

  text("You may continue longer than intended.", x, y, contentW);

  y += 55;

  text("You may not feel finished.", x, y, contentW);

  y += 55;

  text("You may keep going even after you stop enjoying it.", x, y, contentW);

  y += 120;

  holdBtn = { x: x, y: y, w: contentW, h: 60 };

  fill(255);
  rect(holdBtn.x, holdBtn.y, holdBtn.w, holdBtn.h, 999);

  let progressW = map(holdProgress, 0, holdRequired, 0, holdBtn.w);

  fill(245, 216, 63);
  rect(holdBtn.x, holdBtn.y, progressW, holdBtn.h, 999);

  fill(20);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(16);
  text(
    "Hold to continue anyway",
    holdBtn.x + holdBtn.w / 2,
    holdBtn.y + holdBtn.h / 2
  );
}

function drawNextButton(x, y, w, label) {
  nextBtn = { x: x, y: y, w: w, h: 58 };

  fill(245, 216, 63);
  rect(nextBtn.x, nextBtn.y, nextBtn.w, nextBtn.h, 999);

  fill(20);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(16);
  text(label, nextBtn.x + nextBtn.w / 2, nextBtn.y + nextBtn.h / 2);
}

function mousePressed() {
  if (stage <= 3 && over(nextBtn)) {
    stage++;
    return;
  }

  if (stage === 4 && over(holdBtn)) {
    holding = true;
  }
}

function mouseReleased() {
  holding = false;
}

function touchStarted() {
  mousePressed();
  return false;
}

function touchEnded() {
  holding = false;
  return false;
}

function over(btn) {
  return (
    mouseX >= btn.x &&
    mouseX <= btn.x + btn.w &&
    mouseY >= btn.y &&
    mouseY <= btn.y + btn.h
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
