let instagramURL = "https://www.instagram.com/reels/";
let stage = 0;
let yellowColor = "#FFCB22";

let quoteSets = {
  comparison: [
    '“I can feel inspired and at the same time feel like other people are living the life I wish I had.”',
    '“I often feel like my life is boring when I scroll through instagram.”',
    '“If I don’t scroll, I get FOMO.”'
  ],

  timeloss: [
    '“There comes a point where I ‘wake up’ and realize how long I’ve been on my phone.”',
    '“When I scroll while my partner is home, it feels like I’m wasting our quality time.”',
    '“I always end up scrolling no matter what i opened Instagram for.”'
  ],

  compulsion: [
    '“My biggest addiction isn’t apps, it’s the feeling of ‘checking’.”',
    '“I get this ‘lottery’ feeling. If I scroll just one more time, something good might show up.”',
    '“As soon as I wake up, I grab my phone quickly and scroll. It feels like an addiction.”'
  ],

  emptiness: [
    '“After scrolling for a long time, I can get an empty feeling.”',
    '"I scroll because I do not know what else to do."',
    '“I can be online all day and still feel socially empty.”'
  ],

  overstimulation: [
    '“When I’ve had too many impressions, it feels like my brain doesn’t have anything left to give.”',
    '“My biggest problem isn’t screen time, it’s that I can’t remember what I watched.”',
    '“Scrolling entertains me, but also overwhelms me.”'
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
  background(yellowColor);

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
  fill(yellowColor);
  textSize(13);
  text("WARNING", x, y);

  y += 55;

  if (stage <= 2) {
    drawQuoteStage(x, y, contentW);
  } else if (stage === 3) {
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

  let cardH = min(height - 40, 760);
  let cardY = (height - cardH) / 2;

  let buttonY = cardY + cardH - 230;
  let grayTextY = buttonY - 95;

  fill(200);
  textStyle(NORMAL);
  textSize(16);
  textLeading(22);
  text(
    "These are not warnings from a system.\nThey are lived experiences.",
    x,
    grayTextY,
    contentW
  );

  drawNextButton(x, buttonY, contentW, "Continue");
}

function drawRevealStage(x, y, contentW) {
  textAlign(LEFT, TOP);

  fill(yellowColor);
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

  fill(yellowColor);
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

  fill(yellowColor);
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
  fill(0, 190);
  rect(0, 0, width, height);

  let isPhone = width < 500;

  let popupW = isPhone ? width - 50 : min(width - 50, 360);
  let popupH = isPhone ? 280 : 330;

  let popupX = (width - popupW) / 2;
  let popupY = (height - popupH) / 2;

  fill(255);
  rect(popupX, popupY, popupW, popupH, 24);

  fill(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(isPhone ? 24 : 26);
  text("Are you sure?", popupX + 25, popupY + 32, popupW - 50);

  textStyle(NORMAL);
  textSize(isPhone ? 16 : 17);
  textLeading(isPhone ? 22 : 24);
  text(
    "You are about to open Instagram Reels.",
    popupX + 30,
    popupY + 90,
    popupW - 60
  );

  let buttonW = popupW - 50;
  let buttonH = 50;
  let buttonX = popupX + 25;

  yesBtn = {
    x: buttonX,
    y: popupY + popupH - 125,
    w: buttonW,
    h: buttonH
  };

  noBtn = {
    x: buttonX,
    y: popupY + popupH - 65,
    w: buttonW,
    h: buttonH
  };

  fill(yellowColor);
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

  fill(yellowColor);
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

  if (stage <= 2 && over(nextBtn, px, py)) {
    stage++;
    return;
  }

  if (stage === 3 && over(continueBtn, px, py)) {
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
