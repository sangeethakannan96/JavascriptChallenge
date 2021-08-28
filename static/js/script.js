function ageInDays() {
  var birthYear = prompt("Which year were you born...good friend?");
  var ageInDayss = (2020 - birthYear) * 365;
  var h1 = document.createElement("h1");
  var textAnswer = document.createTextNode(
    "You are " + ageInDayss + " Years old"
  );
  h1.setAttribute("id", "ageinDays");
  h1.appendChild(textAnswer);
  document.getElementById("flex-box-result").appendChild(h1);
}

function reset() {
  document.getElementById("ageinDays").remove();
}

function generateCats() {
  var img = document.createElement("img");
  img.src = "static/images/cat.jpg";
  document.getElementById("flex-cat-gen").appendChild(img);
}

function rpsGame(yourChoice) {
  console.log(yourChoice);
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;

  botChoice = numberToChoice(randomToRpsInt());
  console.log("Computer choice:", botChoice);

  var result = decideWinner(humanChoice, botChoice);
  console.log(result);

  var message = finalMessage(result);
  console.log(message);

  rpsFrontEnd(humanChoice, botChoice, message);
}

function randomToRpsInt() {
  return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
  return ["rock", "paper", "scissors"][number];
}

function decideWinner(yourChoice, computerChoice) {
  var rpsDataBase = {
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { paper: 1, scissors: 0.5, rock: 0 },
  };

  var yourScore = rpsDataBase[yourChoice][computerChoice];
  var botScore = rpsDataBase[computerChoice][yourChoice];

  return [yourScore, botScore];
}

function finalMessage([yourScore, botScore]) {
  if (yourScore == 0) {
    return { message: "You lost", color: "red" };
  } else if (yourScore == 0.5) {
    return { message: "You tied", color: "yellow" };
  } else {
    return { message: "You won", color: "green" };
  }
}

function rpsFrontEnd(humanImgChoice, botImgChoice, finalmessage) {
  var imageDataBase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };

  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();

  var humanDiv = document.createElement("div");
  var messageDiv = document.createElement("div");
  var botDiv = document.createElement("div");

  humanDiv.innerHTML =
    "<img src='" +
    imageDataBase[humanImgChoice] +
    "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'>";

  messageDiv.innerHTML =
    "<h1 style= 'color: " +
    finalmessage["color"] +
    "; font-size:60px; padding:30px; '>" +
    finalmessage["message"] +
    "</h1>";

  botDiv.innerHTML =
    "<img src='" +
    imageDataBase[botImgChoice] +
    "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1);'>";

  document.getElementById("flex-box-rps-div").appendChild(humanDiv);
  document.getElementById("flex-box-rps-div").appendChild(messageDiv);
  document.getElementById("flex-box-rps-div").appendChild(botDiv);
}

//Challenge 4
var all_Buttons = document.getElementsByTagName("button");

var copy_All_Buttons = [];
for (let i = 0; i < all_Buttons.length; i++) {
  copy_All_Buttons.push(all_Buttons[i].classList[1]);
}

function buttonColorChange(buttonChoice) {
  if (buttonChoice.value == "red") {
    buttonsRed();
  } else if (buttonChoice.value == "green") {
    buttonsGreen();
  } else if (buttonChoice.value == "random") {
    buttonsRandom();
  } else if (buttonChoice.value == "reset") {
    buttonsReset();
  }
}

function buttonsRed() {
  for (let i = 0; i < all_Buttons.length; i++) {
    all_Buttons[i].classList.remove(all_Buttons[i].classList[1]);
    all_Buttons[i].classList.add("btn-danger");
  }
}

function buttonsGreen() {
  for (let i = 0; i < all_Buttons.length; i++) {
    all_Buttons[i].classList.remove(all_Buttons[i].classList[1]);
    all_Buttons[i].classList.add("btn-success");
  }
}

function buttonsReset() {
  for (let i = 0; i < all_Buttons.length; i++) {
    all_Buttons[i].classList.remove(all_Buttons[i].classList[1]);
    all_Buttons[i].classList.add(copy_All_Buttons[i]);
  }
}

function buttonsRandom(randomcolor) {
  var colorchoices = [
    "btn-danger",
    "btn-success",
    "btn-primary",
    "btn-warning",
  ];
  for (let i = 0; i < all_Buttons.length; i++) {
    let randomNumber = Math.floor(Math.random() * 4);
    all_Buttons[i].classList.remove(all_Buttons[i].classList[1]);
    all_Buttons[i].classList.add(colorchoices[randomNumber]);
  }
}

//Challenge 5: Black jack
let blackJackGame = {
  you: { scoreSpan: "#your-blackjack-result", div: "#your-box", score: 0 },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },
  cardImageDataBase: [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "A",
    "J",
    "K",
    "Q",
  ],

  cardMapping: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 10,
    K: 10,
    Q: 10,
    A: [1, 11],
  },
  wins: 0,
  losses: 0,
  draws: 0,
};

const YOU = blackJackGame["you"];
const DEALER = blackJackGame["dealer"];
const hitSound = new Audio("static/sounds/swish.m4a");
const winSound = new Audio("static/sounds/cash.mp3");
const lossSound = new Audio("static/sounds/aww.mp3");

document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackJackHit);

document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackJackDeal);

document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", dealerLogic);

function blackJackHit() {
  let card = randomCard();
  showCard(YOU, card);
  updateScore(YOU, card);
  showScore(YOU);
}

function showCard(activePlayer, card) {
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
}

function blackJackDeal() {
  let yourImages = document.querySelector("#your-box").querySelectorAll("img");
  let dealerImages = document
    .querySelector("#dealer-box")
    .querySelectorAll("img");
  for (let i = 0; i < yourImages.length; i++) {
    yourImages[i].remove();
  }
  for (let i = 0; i < dealerImages.length; i++) {
    dealerImages[i].remove();
  }

  YOU["score"] = 0;
  DEALER["score"] = 0;

  document.querySelector(YOU["scoreSpan"]).textContent = 0;
  document.querySelector(DEALER["scoreSpan"]).textContent = 0;
  document.querySelector(YOU["scoreSpan"]).style.color = "white";
  document.querySelector(DEALER["scoreSpan"]).style.color = "white";
  document.querySelector("#blackjack-result").textContent = "Lets Play";
  document.querySelector("#blackjack-result").style.color = "black";
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackJackGame["cardImageDataBase"][randomIndex];
}

function updateScore(activePlayer, card) {
  //if adding 11 keeps score below 21, then add 11, else add 1

  if (card === "A") {
    if (activePlayer["score"] + blackJackGame["cardMapping"][card][1] <= 21) {
      activePlayer["score"] += blackJackGame["cardMapping"][card][1];
    } else {
      activePlayer["score"] += blackJackGame["cardMapping"][card][0];
    }
  } else {
    activePlayer["score"] += blackJackGame["cardMapping"][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}

function dealerLogic() {
  let card = randomCard();
  showCard(DEALER, card);
  updateScore(DEALER, card);
  showScore(DEALER);

  if (DEALER["score"] > 15) {
    let winner = computeWinner();
    showResults(winner);
    showTable();
  }
}

function computeWinner() {
  let winner;
  if (YOU["score"] <= 21) {
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      winner = YOU;
      blackJackGame["wins"]++;
    } else if (YOU["score"] < DEALER["score"]) {
      winner = DEALER;
      blackJackGame["losses"]++;
    } else if (YOU["score"] == DEALER["score"]) {
      blackJackGame["draws"]++;
    }
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    winner = DEALER;
    blackJackGame["losses"]++;
  } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    blackJackGame["draws"]++;
  }
  return winner;
}

function showResults(winner) {
  let message, messagecolor;
  if (winner === YOU) {
    document.querySelector("#wins").textContent = blackJackGame["wins"];
    message = "YOU WON";
    messagecolor = "green";
    winSound.play();
  } else if (winner == DEALER) {
    document.querySelector("#losses").textContent = blackJackGame["losses"];
    message = "YOU LOST";
    messagecolor = "red";
    lossSound.play();
  } else {
    document.querySelector("#draws").textContent = blackJackGame["draws"];
    message = "YOU DREW";
    messagecolor = "black";
  }

  document.querySelector("#blackjack-result").textContent = message;
  document.querySelector("#blackjack-result").style.color = messagecolor;
}
