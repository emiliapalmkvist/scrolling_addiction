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

let checkbox = { x: 0, y: 0, size: 24 };
let stopBtn = { x: 0, y: 0, w: 0, h: 54 };
let finalChecked = false;

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
  let isPhone = width < 500;

  // Move final-stage content slightly upward on phones
  if (isPhone) {
    y -= 28;
  }

  textAlign(LEFT, TOP);

  fill(yellowColor);
  textStyle(BOLD);
  textSize(isPhone ? 20 : 23);
  textLeading(isPhone ? 25 : 29);
  text("YOU ARE ABOUT TO ENTER THE FEED.", x, y, contentW);

  y += isPhone ? 72 : 88;

  y = drawInfoBox(
    x,
    y,
    contentW,
    "POSSIBLE SIDE EFFECTS",
    [
      "Time loss",
      "Sleep disruption",
      "Social comparison",
      "Compulsive continuation",
      "Loss of awareness"
    ]
  );

  y += isPhone ? 9 : 14;

  y = drawInfoBox(
    x,
    y,
    contentW,
    "ACTIVE INGREDIENTS",
    [
      "Infinite scroll",
      "Algorithmic targeting",
      "Variable reward",
      "No natural stopping point"
    ]
  );

  y += isPhone ? 14 : 22;

  checkbox = {
    x: x,
    y: y + 2,
    size: isPhone ? 21 : 24
  };

  noFill();
  stroke(220);
  strokeWeight(2);
  rect(checkbox.x, checkbox.y, checkbox.size, checkbox.size, 4);
  noStroke();

  if (finalChecked) {
    fill(yellowColor);
    rect(checkbox.x, checkbox.y, checkbox.size, checkbox.size, 4);

    fill(20);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(isPhone ? 16 : 18);
    text("✓", checkbox.x + checkbox.size / 2, checkbox.y + checkbox.size / 2);
  }

  fill(230);
  textAlign(LEFT, TOP);
  textStyle(NORMAL);
  textSize(isPhone ? 12 : 13);
  textLeading(isPhone ? 16 : 18);
  text(
    "I understand that continuing may override my original intention.",
    x + 34,
    y,
    contentW - 34
  );

  y += isPhone ? 48 : 62;

  continueBtn = {
    x: x,
    y: y,
    w: contentW,
    h: isPhone ? 44 : 52
  };

  if (finalChecked) {
    fill(yellowColor);
  } else {
    fill(160);
  }

  rect(continueBtn.x, continueBtn.y, continueBtn.w, continueBtn.h, 999);

  fill(finalChecked ? 20 : 255);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(isPhone ? 13 : 15);
  text(
    "Continue to Instagram",
    continueBtn.x + continueBtn.w / 2,
    continueBtn.y + continueBtn.h / 2
  );

  y += isPhone ? 52 : 64;

  stopBtn = {
    x: x,
    y: y,
    w: contentW,
    h: isPhone ? 42 : 48
  };

  noFill();
  stroke(220);
  strokeWeight(2);
  rect(stopBtn.x, stopBtn.y, stopBtn.w, stopBtn.h, 999);
  noStroke();

  fill(230);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(isPhone ? 13 : 15);
  text("Stop here", stopBtn.x + stopBtn.w / 2, stopBtn.y + stopBtn.h / 2);
}

function drawInfoBox(x, y, w, title, items) {
  let isPhone = width < 500;

  let titleSize = isPhone ? 10.5 : 12;
  let itemSize = isPhone ? 11.5 : 13;
  let itemGap = isPhone ? 16 : 21;
  let boxH = isPhone ? 31 + items.length * itemGap + 10 : 38 + items.length * itemGap + 14;

  fill(35);
  stroke(90);
  strokeWeight(1.5);
  rect(x, y, w, boxH, 16);
  noStroke();

  fill(160);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(titleSize);
  text(title, x + 15, y + 12);

  fill(240);
  textStyle(NORMAL);
  textSize(itemSize);
  textLeading(itemGap);

  let itemY = y + (isPhone ? 34 : 39);

  for (let i = 0; i < items.length; i++) {
    text("• " + items[i], x + 18, itemY);
    itemY += itemGap;
  }

  return y + boxH;
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
  if (stage <= 2 && over(nextBtn, px, py)) {
    stage++;
    return;
  }

  if (stage === 3) {
    if (overCheckbox(px, py)) {
      finalChecked = !finalChecked;
      return;
    }

    if (over(continueBtn, px, py)) {
      if (finalChecked) {
        window.location.href = instagramURL;
      }
      return;
    }

    if (over(stopBtn, px, py)) {
      stage = 0;
      finalChecked = false;
      return;
    }
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

function overCheckbox(px, py) {
  return (
    px >= checkbox.x &&
    px <= checkbox.x + checkbox.size &&
    py >= checkbox.y &&
    py <= checkbox.y + checkbox.size
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
