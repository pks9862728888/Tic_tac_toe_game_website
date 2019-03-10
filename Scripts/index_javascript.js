// Constants
var PLAYER_ONE = "X";
var PLAYER_TWO = "O";
var VICTORY_SCORE = 5;

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
var resetGame = document.querySelector("#reset_game");
var restartGame = document.querySelector("#restart_game");

// Selecting winner status model by Id
var winnerModalTitle = document.querySelector("#winner_modal_title");
var playerVictoryText = document.querySelector("#player_victory_text");
var startNextRound = document.querySelector("#start_next_round");

// Selecting squares of board
var squares = document.querySelectorAll("td");

// Player active state control variables
var playerOneActive = false;
var playerTwoActive = false;

// First time player select state contol variable
var firstTime = true;

// Contains information about which player started the Round
var playerStart = "";

// Players winning count
var playerOneVictoryCount = 0;
var playerTwoVictoryCount = 0;

// Game round count
var gameRound = 0;

// Whether game is over or not.
var gameOver = false;

// Initializes cell selection variables, cells values
function initializeBoardAndValues(){
  // Hiding modal so that it does not get triggered accidentally
  $('#player_victory_display').modal('hide');

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
}

// Initializing the game variables
initializeBoardAndValues();

// Setting default as player 1 if user starts game without selecting player
function selectPlayerOne(){
  // Activating player one
  playerOneActive = true;
  firstTime = false;

  // Focussing player one button
  playerOne.focus()
  playerTwo.disabled = true;

  // Storing information about which player started the round
  playerStart = PLAYER_ONE;
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

    // Focussing player one button
    playerTwo.disabled = false;
    playerTwo.focus();
    playerOne.disabled = true;
  }
  else if(playerTwoActive){
    playerTwoActive = false;
    playerOneActive = true;

    // Focussing player one button
    playerOne.disabled = false;
    playerOne.focus();
    playerTwo.disabled = true;
  }
}

// Shows modal
function modalShow(player_no){
  winnerModalTitle.innerHTML = "Winner for Round: " + gameRound.toString();
  playerVictoryText.innerHTML = "Player " + player_no.toString() + " won this round!";
  $('#player_victory_display').modal('show');
}

// ******************** WINNER **********************
// Player who is first to score 10 wins
function checkWinner(){
  if(playerOneVictoryCount === VICTORY_SCORE){
    gameOver = true;
    winnerModalTitle.innerHTML = "Player 1 wins!!";
    playerVictoryText.innerHTML = "Congratulations! Well played.";
    startNextRound.innerHTML = "Start a new match";
    $('#player_victory_display').modal('show');
  }else if (playerTwoVictoryCount === VICTORY_SCORE) {
    gameOver = true;
    winnerModalTitle.innerHTML = "Player 2 wins!!";
    playerVictoryText.innerHTML = "Congratulations! Well played.";
    startNextRound.innerHTML = "Start a new match";
    $('#player_victory_display').modal('show');
  }
}

// Increments victory count and shows modal
function incrementVictoryShowModal(value){
  if(value == PLAYER_ONE){
    playerOneVictoryCount += 1;
    gameRound += 1;
    playerOneScore.innerHTML = "Score: " + playerOneVictoryCount.toString();

    // Displaying winner of game
    checkWinner();

    // Displaying winner of round
    if(!gameOver)
      modalShow(1);
  }
  else if (value == PLAYER_TWO){
    playerTwoVictoryCount += 1;
    gameRound += 1;
    playerTwoScore.innerHTML = "Score: " + playerTwoVictoryCount.toString();

    // Displaying winner of game
    checkWinner();

    // Displaying winner of round
    if(!gameOver)
      modalShow(2);
  }

  // Setting who should start next Round
  if(playerStart == PLAYER_ONE)
    playerStart = PLAYER_TWO;
  else if(playerStart == PLAYER_TWO)
    playerStart = PLAYER_ONE;
}

// Checks victory status
function checkVictoryStatus(){
  if(zeroZeroValue === zeroOneValue && zeroOneValue === zeroTwoValue && zeroZeroValue !== "")
    incrementVictoryShowModal(zeroZeroValue);
  else if(oneZeroValue === oneOneValue && oneOneValue === oneTwoValue && oneZeroValue !== "")
    incrementVictoryShowModal(oneZeroValue);
  else if(twoZeroValue === twoOneValue && twoOneValue === twoTwoValue && twoZeroValue !== "")
    incrementVictoryShowModal(twoZeroValue);
  else if(zeroZeroValue === oneZeroValue && oneZeroValue === twoZeroValue && zeroZeroValue !== "")
    incrementVictoryShowModal(zeroZeroValue);
  else if(zeroOneValue === oneOneValue && oneOneValue === twoOneValue && zeroOneValue !== "")
    incrementVictoryShowModal(zeroOneValue);
  else if(zeroTwoValue === oneTwoValue && oneTwoValue === twoTwoValue && zeroTwoValue !== "")
    incrementVictoryShowModal(zeroTwoValue);
  else if(zeroZeroValue === oneOneValue && oneOneValue === twoTwoValue && zeroZeroValue !== "")
    incrementVictoryShowModal(zeroZeroValue);
  else if(zeroTwoValue === oneOneValue && oneOneValue === twoZeroValue && zeroTwoValue !== "")
    incrementVictoryShowModal(zeroTwoValue);
}

// Checking, displaying message, and clearing board in case the match is draw
function checkFilledStatus(){
  if(!(zeroZeroValue === zeroOneValue && zeroOneValue === zeroTwoValue && zeroZeroValue !== "")
    && !(oneZeroValue === oneOneValue && oneOneValue === oneTwoValue && oneZeroValue !== "")
    && !(twoZeroValue === twoOneValue && twoOneValue === twoTwoValue && twoZeroValue !== "")
    && !(zeroZeroValue === oneZeroValue && oneZeroValue === twoZeroValue && zeroZeroValue !== "")
    && !(zeroOneValue === oneOneValue && oneOneValue === twoOneValue && zeroOneValue !== "")
    && !(zeroTwoValue === oneTwoValue && oneTwoValue === twoTwoValue && zeroTwoValue !== "")
    && !(zeroZeroValue === oneOneValue && oneOneValue === twoTwoValue && zeroZeroValue !== "")
    && !(zeroTwoValue === oneOneValue && oneOneValue === twoZeroValue && zeroTwoValue !== "")
    &&(zeroZeroSelected && zeroOneSelected && zeroTwoSelected && oneZeroSelected
      && oneOneSelected && oneTwoSelected && twoZeroSelected && twoOneSelected && twoTwoSelected)){
       // Setting the player whose turn should be first for this Round
       if(playerStart == PLAYER_ONE){
         playerOneActive = false;
         playerTwoActive = true;
         playerStart = PLAYER_TWO;
       }else if (playerStart == PLAYER_TWO) {
         playerTwoActive = false;
         playerOneActive = true;
         playerStart = PLAYER_ONE;
       }

       // Incrementing Game Round
       gameRound += 1;

       // Displaying Draw match information in modal
       winnerModalTitle.innerHTML = "Winner for Round: " + gameRound.toString();
       playerVictoryText.innerHTML = "No winner for this round. Draw Match!";
       $('#player_victory_display').modal('show');
     }
}

// Clears board values of previous game
function clearBoard(){
  for(var i=0; i < squares.length; i++){
    squares[i].textContent = "";
  }
};

// Setting active state based on selected player
playerOne.addEventListener("click", function(){
  if(firstTime){
    playerOneActive = true;
    firstTime = false;
    playerStart = PLAYER_ONE;
}});

// If user starts game without selecting player
playerTwo.addEventListener("click", function(){
  if(firstTime){
    playerTwoActive = true;
    firstTime = false;
    playerStart = PLAYER_TWO;
}});

zeroZero.addEventListener("click", function(){
  if(!zeroZeroSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne();

    // Storing the value of cell and putting value in cell according to selected player
    zeroZeroValue = fillBoard();
    zeroZero.innerHTML = zeroZeroValue;

    // Setting next player as active after response
    nextPlayer();

    // Setting that this board cell has been selected
    zeroZeroSelected = true;

    // Checking winning status
    checkVictoryStatus();

    // Checking whether all cells are filled
    checkFilledStatus();
}});

zeroOne.addEventListener("click", function(){
  if(!zeroOneSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne();

    // Storing the value of cell and putting value in cell according to selected player
    zeroOneValue = fillBoard();
    zeroOne.innerHTML = zeroOneValue;

    // Setting next player as active after response
    nextPlayer();

    // Setting that this board cell has been selected
    zeroOneSelected = true;

    // Checking winning status
    checkVictoryStatus();

    // Checking whether all cells are filled
    checkFilledStatus();
}});

zeroTwo.addEventListener("click", function(){
  if(!zeroTwoSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne();

    // Storing the value of cell and putting value in cell according to selected player
    zeroTwoValue = fillBoard();
    zeroTwo.innerHTML = zeroTwoValue;

    // Setting next player as active after response
    nextPlayer();

    // Setting that this board cell has been selected
    zeroTwoSelected = true;

    // Checking winning status
    checkVictoryStatus();

    // Checking whether all cells are filled
    checkFilledStatus();
}});

oneZero.addEventListener("click", function(){
  if(!oneZeroSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne();

    // Storing the value of cell and putting value in cell according to selected player
    oneZeroValue = fillBoard();
    oneZero.innerHTML = oneZeroValue;

    // Setting next player as active after response
    nextPlayer();

    // Setting that this board cell has been selected
    oneZeroSelected = true;

    // Checking winning status
    checkVictoryStatus();

    // Checking whether all cells are filled
    checkFilledStatus();
}});

oneOne.addEventListener("click", function(){
  if(!oneOneSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne();

    // Storing the value of cell and putting value in cell according to selected player
    oneOneValue = fillBoard()
    oneOne.innerHTML = oneOneValue;

    // Setting next player as active after response
    nextPlayer();

    // Setting that this board cell has been selected
    oneOneSelected = true;

    // Checking winning status
    checkVictoryStatus();

    // Checking whether all cells are filled
    checkFilledStatus();
}});

oneTwo.addEventListener("click", function(){
  if(!oneTwoSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne();

    // Storing the value of cell and putting value in cell according to selected player
    oneTwoValue = fillBoard();
    oneTwo.innerHTML = oneTwoValue;

    // Setting next player as active after response
    nextPlayer();

    // Setting that this board cell has been selected
    oneTwoSelected = true;

    // Checking winning status
    checkVictoryStatus();

    // Checking whether all cells are filled
    checkFilledStatus();
}});

twoZero.addEventListener("click", function(){
  if(!twoZeroSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne();

    // Storing the value of cell and putting value in cell according to selected player
    twoZeroValue = fillBoard();
    twoZero.innerHTML = twoZeroValue;

    // Setting next player as active after response
    nextPlayer();

    // Setting that this board cell has been selected
    twoZeroSelected = true;

    // Checking winning status
    checkVictoryStatus();

    // Checking whether all cells are filled
    checkFilledStatus();
}});

twoOne.addEventListener("click", function(){
  if(!twoOneSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne();

    // Storing the value of cell and putting value in cell according to selected player
    twoOneValue = fillBoard();
    twoOne.innerHTML = twoOneValue;

    // Setting next player as active after response
    nextPlayer();

    // Setting that this board cell has been selected
    twoOneSelected = true;

    // Checking winning status
    checkVictoryStatus();

    // Checking whether all cells are filled
    checkFilledStatus();
}});

twoTwo.addEventListener("click", function(){
  if(!twoTwoSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne();

    // Storing the value of cell and putting value in cell according to selected player
    twoTwoValue = fillBoard();
    twoTwo.innerHTML = twoTwoValue;

    // Setting next player as active after response
    nextPlayer();

    // Setting that this board cell has been selected
    twoTwoSelected = true;

    // Checking winning status
    checkVictoryStatus();

    // Checking whether all cells are filled
    checkFilledStatus();
}});

// If clear score button is clicked
resetGame.addEventListener("click", function(){
  // Clear displaying scores
  playerOneScore.innerHTML = "Score: 0";
  playerTwoScore.innerHTML = "Score: 0";

  // Clearing Board
  clearBoard();

  // Player active state control variables
  playerOneActive = false;
  playerTwoActive = false;

  // First time player select state contol variable
  firstTime = true;

  // Contains information about which player started the Round
  playerStart = "";

  // Players winning count
  playerOneVictoryCount = 0;
  playerTwoVictoryCount = 0;

  // Game round count
  gameRound = 0;

  // Initializing board values
  initializeBoardAndValues();

  // Activating player selection buttons
  playerOne.disabled = false;
  playerTwo.disabled = false;

  // Setting game over status
  gameOver = false;
});

// If restart game button is clicked
restartGame.addEventListener("click", function(){
  // Setting the player whose turn should be first for this Round
  if(playerStart == PLAYER_ONE){
    playerOneActive = true;
    playerTwoActive = false;
  }else if (playerStart == PLAYER_TWO) {
    playerTwoActive = true;
    playerOneActive = false;
  }

  // Initializing board and values
  initializeBoardAndValues();

  // Clearing Board
  clearBoard();
});

// If start next round is selected in modal
startNextRound.addEventListener("click", function(){
  if(!gameOver){
    // Setting the player whose turn should be first for this Round
    if(playerStart == PLAYER_ONE){
      playerOneActive = true;
      playerTwoActive = false;
    }else if (playerStart == PLAYER_TWO) {
      playerTwoActive = true;
      playerOneActive = false;
    }

    // Initializing board and values
    initializeBoardAndValues();

    // Clearing Board
    clearBoard();
  }else{
    // Clear displaying scores
    playerOneScore.innerHTML = "Score: 0";
    playerTwoScore.innerHTML = "Score: 0";

    // Clearing Board
    clearBoard();

    // Player active state control variables
    playerOneActive = false;
    playerTwoActive = false;

    // First time player select state contol variable
    firstTime = true;

    // Contains information about which player started the Round
    playerStart = "";

    // Players winning count
    playerOneVictoryCount = 0;
    playerTwoVictoryCount = 0;

    // Game round count
    gameRound = 0;

    // Initializing board values
    initializeBoardAndValues();

    // Setting game over to false to indicate start of game
    gameOver = false;

    // Changing text which was prechanged when a player wins
    startNextRound.innerHTML = "Start Next Round";

    // Activating player selection buttons
    playerOne.disabled = false;
    playerTwo.disabled = false;
  }
});

// ********************** Touch sensitivity for mobiles ************************
// Setting active state based on selected player
playerOne.addEventListener("touchstart", function(){
  if(firstTime){
    playerOneActive = true;
    firstTime = false;
    playerStart = PLAYER_ONE;
  }});

// If user starts game without selecting player
playerTwo.addEventListener("touchstart", function(){
  if(firstTime){
    playerTwoActive = true;
    firstTime = false;
    playerStart = PLAYER_TWO;
}});

zeroZero.addEventListener("touchstart", function(){
  if(!zeroZeroSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne();

    // Storing the value of cell and putting value in cell according to selected player
    zeroZeroValue = fillBoard();
    zeroZero.innerHTML = zeroZeroValue;

    // Setting next player as active after response
    nextPlayer();

    // Setting that this board cell has been selected
    zeroZeroSelected = true;

    // Checking winning status
    checkVictoryStatus();

    // Checking whether all cells are filled
    checkFilledStatus();
}});

zeroOne.addEventListener("touchstart", function(){
  if(!zeroOneSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne();

    // Storing the value of cell and putting value in cell according to selected player
    zeroOneValue = fillBoard();
    zeroOne.innerHTML = zeroOneValue;

    // Setting next player as active after response
    nextPlayer();

    // Setting that this board cell has been selected
    zeroOneSelected = true;

    // Checking winning status
    checkVictoryStatus();

    // Checking whether all cells are filled
    checkFilledStatus();
}});

zeroTwo.addEventListener("touchstart", function(){
  if(!zeroTwoSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne();

    // Storing the value of cell and putting value in cell according to selected player
    zeroTwoValue = fillBoard();
    zeroTwo.innerHTML = zeroTwoValue;

    // Setting next player as active after response
    nextPlayer();

    // Setting that this board cell has been selected
    zeroTwoSelected = true;

    // Checking winning status
    checkVictoryStatus();

    // Checking whether all cells are filled
    checkFilledStatus();
}});

oneZero.addEventListener("touchstart", function(){
  if(!oneZeroSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne();

    // Storing the value of cell and putting value in cell according to selected player
    oneZeroValue = fillBoard();
    oneZero.innerHTML = oneZeroValue;

    // Setting next player as active after response
    nextPlayer();

    // Setting that this board cell has been selected
    oneZeroSelected = true;

    // Checking winning status
    checkVictoryStatus();

    // Checking whether all cells are filled
    checkFilledStatus();
}});

oneOne.addEventListener("touchstart", function(){
  if(!oneOneSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne();

    // Storing the value of cell and putting value in cell according to selected player
    oneOneValue = fillBoard()
    oneOne.innerHTML = oneOneValue;

    // Setting next player as active after response
    nextPlayer();

    // Setting that this board cell has been selected
    oneOneSelected = true;

    // Checking winning status
    checkVictoryStatus();

    // Checking whether all cells are filled
    checkFilledStatus();
}});

oneTwo.addEventListener("touchstart", function(){
  if(!oneTwoSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne();

    // Storing the value of cell and putting value in cell according to selected player
    oneTwoValue = fillBoard();
    oneTwo.innerHTML = oneTwoValue;

    // Setting next player as active after response
    nextPlayer();

    // Setting that this board cell has been selected
    oneTwoSelected = true;

    // Checking winning status
    checkVictoryStatus();

    // Checking whether all cells are filled
    checkFilledStatus();
}});

twoZero.addEventListener("touchstart", function(){
  if(!twoZeroSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne();

    // Storing the value of cell and putting value in cell according to selected player
    twoZeroValue = fillBoard();
    twoZero.innerHTML = twoZeroValue;

    // Setting next player as active after response
    nextPlayer();

    // Setting that this board cell has been selected
    twoZeroSelected = true;

    // Checking winning status
    checkVictoryStatus();

    // Checking whether all cells are filled
    checkFilledStatus();
}});

twoOne.addEventListener("touchstart", function(){
  if(!twoOneSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne();

    // Storing the value of cell and putting value in cell according to selected player
    twoOneValue = fillBoard();
    twoOne.innerHTML = twoOneValue;

    // Setting next player as active after response
    nextPlayer();

    // Setting that this board cell has been selected
    twoOneSelected = true;

    // Checking winning status
    checkVictoryStatus();

    // Checking whether all cells are filled
    checkFilledStatus();
}});

twoTwo.addEventListener("touchstart", function(){
  if(!twoTwoSelected){
    // Setting default as player 1 if user starts game without selecting player
    if(playerOneActive === false && playerTwoActive === false)
      selectPlayerOne();

    // Storing the value of cell and putting value in cell according to selected player
    twoTwoValue = fillBoard();
    twoTwo.innerHTML = twoTwoValue;

    // Setting next player as active after response
    nextPlayer();

    // Setting that this board cell has been selected
    twoTwoSelected = true;

    // Checking winning status
    checkVictoryStatus();

    // Checking whether all cells are filled
    checkFilledStatus();
}});

// If clear score button is clicked
resetGame.addEventListener("touchstart", function(){
  // Clear displaying scores
  playerOneScore.innerHTML = "Score: 0";
  playerTwoScore.innerHTML = "Score: 0";

  // Clearing Board
  clearBoard();

  // Player active state control variables
  playerOneActive = false;
  playerTwoActive = false;

  // First time player select state contol variable
  firstTime = true;

  // Contains information about which player started the Round
  playerStart = "";

  // Players winning count
  playerOneVictoryCount = 0;
  playerTwoVictoryCount = 0;

  // Game round count
  gameRound = 0;

  // Initializing board values
  initializeBoardAndValues();
});

// If restart game button is clicked
restartGame.addEventListener("touchstart", function(){
  // Setting the player whose turn should be first for this Round
  if(playerStart == PLAYER_ONE){
    playerOneActive = true;
    playerTwoActive = false;
  }else if (playerStart == PLAYER_TWO) {
    playerTwoActive = true;
    playerOneActive = false;
  }

  // Initializing board and values
  initializeBoardAndValues();

  // Clearing Board
  clearBoard();
});

// If start next round is selected in modal
startNextRound.addEventListener("touchstart", function(){
  // Setting the player whose turn should be first for this Round
  if(playerStart == PLAYER_ONE){
    playerOneActive = true;
    playerTwoActive = false;
  }else if (playerStart == PLAYER_TWO) {
    playerTwoActive = true;
    playerOneActive = false;
  }

  // Initializing board and values
  initializeBoardAndValues();

  // Clearing Board
  clearBoard();
});
