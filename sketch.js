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
let continueBtn = { x: 0, y: 0, w: 0, h: 60 };

let showPopup = false;
let yesBtn = { x: 0, y: 0, w: 0, h: 50 };
let noBtn = { x: 0, y: 0, w: 0, h: 50 };

let lastTouchTime = 0;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.elt.style.touchAction = "none";

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
    drawRevealStage(x, y, contentW);
  } else if (stage === 4) {
    drawFinalStage(x, y, contentW);
  }

  if (showPopup) {
    drawPopup();
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

  drawNextButton(x, y, contentW, "Continue");
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

function drawFinalStage(x, y, contentW) {
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

  continueBtn = { x: x, y: y, w: contentW, h: 60 };

  fill(245, 216, 63);
  rect(continueBtn.x, continueBtn.y, continueBtn.w, continueBtn.h, 999);

  fill(20);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(16);
  text(
    "Continue anyway",
    continueBtn.x + continueBtn.w / 2,
    continueBtn.y + continueBtn.h / 2
  );
}

function drawPopup() {
  fill(0, 180);
  rect(0, 0, width, height);

  let popupW = min(width - 50, 360);
  let popupH = 260;
  let popupX = (width - popupW) / 2;
  let popupY = (height - popupH) / 2;

  fill(255);
  rect(popupX, popupY, popupW, popupH, 24);

  fill(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(24);
  text("Are you sure?", popupX + 25, popupY + 32, popupW - 50);

  textStyle(NORMAL);
  textSize(16);
  textLeading(22);
  text(
    "You are about to open Instagram Reels.",
    popupX + 35,
    popupY + 85,
    popupW - 70
  );

  yesBtn = {
    x: popupX + 25,
    y: popupY + 170,
    w: popupW - 50,
    h: 50
  };

  noBtn = {
    x: popupX + 25,
    y: popupY + 225,
    w: popupW - 50,
    h: 50
  };

  fill(245, 216, 63);
  rect(yesBtn.x, yesBtn.y, yesBtn.w, yesBtn.h, 999);

  fill(20);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(15);
  text("Yes, continue", yesBtn.x + yesBtn.w / 2, yesBtn.y + yesBtn.h / 2);

  fill(230);
  rect(noBtn.x, noBtn.y, noBtn.w, noBtn.h, 999);

  fill(20);
  text("No, go back", noBtn.x + noBtn.w / 2, noBtn.y + noBtn.h / 2);
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

function handlePress(px, py) {
  if (showPopup) {
    if (over(yesBtn, px, py)) {
      window.location.href = instagramURL;
      return;
    }

    if (over(noBtn, px, py)) {
      showPopup = false;
      return;
    }

    return;
  }

  if (stage <= 3 && over(nextBtn, px, py)) {
    stage++;
    return;
  }

  if (stage === 4 && over(continueBtn, px, py)) {
    showPopup = true;
  }
}

function mousePressed() {
  if (millis() - lastTouchTime < 500) {
    return;
  }

  handlePress(mouseX, mouseY);
}

function touchStarted() {
  lastTouchTime = millis();

  if (touches.length > 0) {
    handlePress(touches[0].x, touches[0].y);
  }

  return false;
}

function touchMoved() {
  return false;
}

function over(btn, px, py) {
  return (
    px >= btn.x &&
    px <= btn.x + btn.w &&
    py >= btn.y &&
    py <= btn.y + btn.h
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
