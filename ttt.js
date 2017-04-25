var prompt = require('prompt');
var board = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
var letters = ['A', 'B', 'C'];

var renderBoard = function(board) {
  console.log('  1 2 3');
  for (var i = 0; i < board.length; i++) {
    var str = letters[i] + ' ';
    for (var j = 0; j < board[i].length; j++) {
      str += (board[i][j] + ' ')
    }
    console.log(str);
  }
}

var userSelection = function (player) {
  console.log('Player ' + player + ', please choose placement (e.g., "A1")')
  var properties = [
    {
      name: 'placement', 
      validator: /^[a-cA-C1-3\s\-]+$/,
      warning: 'Please choose letter and number corresponding to row and column of board, e.g., "A1".'
    }
  ];
  prompt.start();
  prompt.get(properties, function (err, result) {
    if (err) { return onErr(err); }
    placePiece(result.placement, player);
  });

  function onErr(err) {
    console.log(err);
    return 1;
  }
}

var findWinner = function(player) {
  var rowCount = 0;
  var colCount = 0;
  for (var i = 0; i < board.length; i++) {
    if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
      return true;
    } else if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
      return true;
    } 
  } 
  if ((board[0][0] === player && board[1][1] === player && board[2][2] === player) || (board[0][2] === player && board[1][1] === player && board[2][0] === player)) {
  return true;
}
  return false;
};

var placePiece = function(placement, player) {
  if (placement.toLowerCase().includes('a')) {
    var row = 0;
  } else if (placement.toLowerCase().includes('b')) {
    var row = 1;
  } else if (placement.toLowerCase().includes('c')) {
    var row = 2;
  }
  if (placement.includes(1))  {
    var col = 0;
  } else if (placement.includes(2))  {
    var col = 1;
  } else if (placement.includes(3))  {
    var col = 2;
  }
  if (board[row][col] === '-') {
    board[row][col] = player;
    if (findWinner(player)) {
      console.log ('Player ' + player + ' wins!');
      return;
    }
    if (player === "X") {
      renderBoard(board);
      userSelection("O");
    } else {
      renderBoard(board);
      userSelection("X");
    }
  } else {
    console.log("this piece has already been selected, please try again!");
    userSelection(player);
  }
}

renderBoard(board);
userSelection('X');


