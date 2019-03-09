// Constants
var PLAYER_ONE = "X";
var PLAYER_TWO = "O";

// Selecting elements of board by id
var zeroZero = document.querySelector("#zero_zero");
var zeroOne = document.querySelector("#zero_one");
var zeroTwo = document.querySelector("#zero_two");

var oneZero = document.querySelector("#one_zero");
var oneOne = document.querySelector("#one_one");
var oneTwo = document.querySelector("#one_two");

var twoZero = document.querySelector("#two_zero");
var twoOne = document.querySelector("#two_one");
var twoTwo = document.querySelector("#two_two");

// Selecting players by id
var playerOne = document.querySelector("#player_one");
var playerTwo = document.querySelector("#player_two");

// Selecting score by id
var playerOneScore = document.querySelector("#player_one_score");
var playerTwoScore = document.querySelector("#player_two_score");

// Selecting game control buttons by id
var resetScore = document.querySelector("#reset_score");
var restartGame = document.querySelector("#restart_game");

// Player active state control variables
var playerOneActive = false;
var playerTwoActive = false;

// First time player select state contol variable
var firstTime = true;

// Players winning count
var playerOneVictoryCount = 0;
var playerTwoVictoryCount = 0;

// Board cell selected control variable
zeroZeroSelected = false;
zeroOneSelected = false;
zeroTwoSelected = false;

oneZeroSelected = false;
oneOneSelected = false;
oneTwoSelected = false;

twoZeroSelected = false;
twoOneSelected = false;
twoTwoSelected = false;

// Board cell filled value
zeroZeroValue = "";
zeroOneValue = "";
zeroTwoValue = "";

oneZeroValue = "";
oneOneValue = "";
oneTwoValue = "";

twoZeroValue = "";
twoOneValue = "";
twoTwoValue = "";

// Setting default as player 1 if user starts game without selecting player
function selectPlayerOne(){
  playerOneActive = true;
  firstTime = false;
}

// Fills board cell according to selected player
function fillBoard(){
  if(playerOneActive)
    return PLAYER_ONE;
  else if(playerTwoActive)
    return PLAYER_TWO;
};

// Sets next player as active after previous players turn
function nextPlayer(){
  if(playerOneActive){
    playerOneActive = false;
    playerTwoActive = true;
  }
  else if(playerTwoActive){
    playerTwoActive = false;
    playerOneActive = true;
  }
}

// Increments victory count
function incrementVictory(value){
  if(value == PLAYER_ONE){
    playerOneVictoryCount += 1;
    playerOneScore.innerHTML = "Score: " + playerOneVictoryCount.toString();
  }
  else if (value == PLAYER_TWO){
    playerTwoVictoryCount += 1;
    console.log(playerTwoVictoryCount)
    playerTwoScore.innerHTML = "Score: " + playerTwoVictoryCount.toString();
  }
}

// Checks victory status
function checkVictoryStatus(){
  if(zeroZeroValue === zeroOneValue && zeroOneValue === zeroTwoValue)
    incrementVictory(zeroZeroValue)
  else if(oneZeroValue === oneOneValue && oneOneValue === oneTwoValue)
    incrementVictory(oneZeroValue)
  else if(twoZeroValue === twoOneValue && twoOneValue === twoTwoValue)
    incrementVictory(twoZeroValue)
  else if(zeroZeroValue === oneZeroValue && oneZeroValue === twoZeroValue)
    incrementVictory(zeroZeroValue)
  else if(zeroOneValue === oneOneValue && oneOneValue === twoOneValue)
    incrementVictory(zeroOneValue)
  else if(zeroTwoValue === oneOneValue && oneOneValue === twoTwoValue)
    incrementVictory(zeroTwoValue)
  else if(zeroZeroValue === oneOneValue && oneOneValue === twoTwoValue)
    incrementVictory(zeroZeroValue)
  else if(zeroTwoValue === oneOneValue && oneOneValue === twoZeroValue)
    incrementVictory(zeroTwoValue)
}

// Setting active state based on selected player
playerOne.addEventListener("click", function(){
  if(firstTime)
    playerOneActive = true;
    firstTime = false;
});

// If user starts game without selecting player
playerTwo.addEventListener("click", function(){
  if(firstTime)
    playerTwoActive = true;
    firstTime = false;
});

zeroZero.addEventListener("click", function(){
  if(!zeroZeroSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne()

    // Storing the value of cell and putting value in cell according to selected player
    zeroZeroValue = fillBoard()
    zeroZero.innerHTML = zeroZeroValue;

    // Setting next player as active after response
    nextPlayer()

    // Setting that this board cell has been selected
    zeroZeroSelected = true;

    // Checking winning status
    checkVictoryStatus()

}});

zeroOne.addEventListener("click", function(){
  if(!zeroOneSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne()

    // Storing the value of cell and putting value in cell according to selected player
    zeroOneValue = fillBoard()
    zeroOne.innerHTML = zeroOneValue;

    // Setting next player as active after response
    nextPlayer()

    // Setting that this board cell has been selected
    zeroOneSelected = true;

    // Checking winning status
    checkVictoryStatus()

}});

zeroTwo.addEventListener("click", function(){
  if(!zeroTwoSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne()

    // Storing the value of cell and putting value in cell according to selected player
    zeroTwoValue = fillBoard()
    zeroTwo.innerHTML = zeroTwoValue;

    // Setting next player as active after response
    nextPlayer()

    // Setting that this board cell has been selected
    zeroTwoSelected = true;

    // Checking winning status
    checkVictoryStatus()

}});

oneZero.addEventListener("click", function(){
  if(!oneZeroSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne()

    // Storing the value of cell and putting value in cell according to selected player
    oneZeroValue = fillBoard()
    oneZero.innerHTML = oneZeroValue;

    // Setting next player as active after response
    nextPlayer()

    // Setting that this board cell has been selected
    oneZeroSelected = true;

    // Checking winning status
    checkVictoryStatus()

}});

oneOne.addEventListener("click", function(){
  if(!oneOneSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne()

    // Storing the value of cell and putting value in cell according to selected player
    oneOneValue = fillBoard()
    oneOne.innerHTML = oneOneValue;

    // Setting next player as active after response
    nextPlayer()

    // Setting that this board cell has been selected
    oneOneSelected = true;

    // Checking winning status
    checkVictoryStatus()

}});

oneTwo.addEventListener("click", function(){
  if(!oneTwoSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne()

    // Storing the value of cell and putting value in cell according to selected player
    oneTwoValue = fillBoard()
    oneTwo.innerHTML = oneTwoValue;

    // Setting next player as active after response
    nextPlayer()

    // Setting that this board cell has been selected
    oneTwoSelected = true;

    // Checking winning status
    checkVictoryStatus()

}});

twoZero.addEventListener("click", function(){
  if(!twoZeroSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne()

    // Storing the value of cell and putting value in cell according to selected player
    twoZeroValue = fillBoard()
    twoZero.innerHTML = twoZeroValue;

    // Setting next player as active after response
    nextPlayer()

    // Setting that this board cell has been selected
    twoZeroSelected = true;

    // Checking winning status
    checkVictoryStatus()

}});

twoOne.addEventListener("click", function(){
  if(!twoOneSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne()

    // Storing the value of cell and putting value in cell according to selected player
    twoOneValue = fillBoard()
    twoOne.innerHTML = twoOneValue;

    // Setting next player as active after response
    nextPlayer()

    // Setting that this board cell has been selected
    twoOneSelected = true;

    // Checking winning status
    checkVictoryStatus()

}});

twoTwo.addEventListener("click", function(){
  if(!twoTwoSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne()

    // Storing the value of cell and putting value in cell according to selected player
    twoTwoValue = fillBoard()
    twoTwo.innerHTML = twoTwoValue;

    // Setting next player as active after response
    nextPlayer()

    // Setting that this board cell has been selected
    twoTwoSelected = true;

    // Checking winning status
    checkVictoryStatus()

}});
