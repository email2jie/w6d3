/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	let TTTView = __webpack_require__(1);// require appropriate file
	let TTTGame = __webpack_require__(2); // require appropriate file
	
	$( () => {
	  // Your code here
	  const rootEl = $('.ttt');
	  const game = new TTTGame();
	  new TTTView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	var View = function (game, $el) {
	  this.game = game;
	  this.$el = $el;
	  this.setupBoard();
	  this.bindEvents();
	};
	
	View.prototype.bindEvents = function () {
	  $("li.square").on('click', makeMove);
	  let that = this;
	  function makeMove(event){
	    let clickedSquare = event.currentTarget;
	    let pos = $(clickedSquare).data('pos');
	    try {
	      that.game.playMove(pos);
	      $(clickedSquare).text(`${that.game.board.grid[pos[0]][pos[1]]}`);
	      $(clickedSquare).addClass("clicked");
	    }
	    catch(err){
	      alert("Invalid Move!");
	    }
	
	    if (that.game.board.isOver()) {
	      if (that.game.winner()) {
	        alert(`${that.game.winner()} has won!`);
	      } else {
	        alert('NO ONE WINS!');
	      }
	    }
	  }
	};
	
	// View.prototype.makeMove = function ($square) {
	// };
	// View.prototype.renderBoard = function(){
	//   let board = $('ul.board');
	//   board.text = "";
	//   this.game.board
	// }
	
	View.prototype.setupBoard = function () {
	  let board = $('<ul class="board"></ul>');
	  for (var i = 0; i < 9; i++){
	    var row = Math.floor(i / 3);
	    var col = i % 3;
	
	    var square = $('<li class="square"></li>');
	    square.data('pos', [row, col]); //checkout type
	    board.append(square);
	  }
	
	  this.$el.append(board);
	};
	
	
	module.exports = View;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(3);
	const MoveError = __webpack_require__(4);
	
	function Game () {
	  this.board = new Board();
	  this.currentPlayer = Board.marks[0];
	}
	
	Game.prototype.isOver = function () {
	  this.board.isOver;
	};
	
	Game.prototype.playMove = function(pos) {
	  this.board.placeMark(pos, this.currentPlayer);
	  this.swapTurn();
	};
	
	// TODO: are these "const" uses okay?
	Game.prototype.promptMove = function(reader, callback) {
	  const game = this;
	
	  this.board.print();
	  console.log(`Current Turn: ${this.currentPlayer}`)
	
	  reader.question('Enter rowIdx: ', rowIdxStr => {
	    const rowIdx = parseInt(rowIdxStr);
	    reader.question('Enter colIdx: ', colIdxStr => {
	      const colIdx = parseInt(colIdxStr);
	      callback([rowIdx, colIdx]);
	    });
	  });
	}
	
	Game.prototype.run = function(reader, gameCompletionCallback) {
	  this.promptMove(reader, move => {
	    try {
	      this.playMove(move);
	    } catch (e) {
	      if (e instanceof MoveError) {
	        console.log(e.msg);
	      } else {
	        throw e;
	      }
	    }
	
	    if (this.isOver()) {
	      this.board.print();
	      if (this.winner()) {
	        console.log(`${this.winner()} has won!`);
	      } else {
	        console.log('NO ONE WINS!');
	      }
	      gameCompletionCallback();
	    } else {
	      // continue loop
	      this.run(reader, gameCompletionCallback);
	    }
	  });
	}
	
	Game.prototype.swapTurn = function() {
	  if (this.currentPlayer === Board.marks[0]) {
	    this.currentPlayer = Board.marks[1];
	  } else {
	    this.currentPlayer = Board.marks[0];
	  }
	}
	
	Game.prototype.winner = function() {
	  return this.board.winner();
	}
	
	
	
	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const MoveError = __webpack_require__(4);
	
	function Board () {
	  this.grid = Board.makeGrid();
	}
	
	Board.prototype.isEmptyPos = function(pos) {
	  if (!Board.isValidPos(pos)) {
	    throw new MoveError('Is not valid position!');
	  }
	
	  return (this.grid[pos[0]][pos[1]] === null);
	}
	
	Board.prototype.isOver = function() {
	  if (this.winner() != null) {
	    return true;
	  }
	
	  for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
	    for (let colIdx = 0; colIdx < 3; colIdx++) {
	      if (this.isEmptyPos([rowIdx, colIdx])) {
	        return false;
	      }
	    }
	  }
	
	  return true;
	}
	
	Board.prototype.placeMark = function(pos, mark) {
	  if (!this.isEmptyPos(pos)) {
	    throw new MoveError('Is not an empty position!');
	  }
	
	  this.grid[pos[0]][pos[1]] = mark;
	}
	
	
	Board.prototype.print = function() {
	  const strs = [];
	  for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
	    const marks = [];
	    for (let colIdx = 0; colIdx < 3; colIdx++) {
	      marks.push(
	        this.grid[rowIdx][colIdx] ? this.grid[rowIdx][colIdx] : " "
	      );
	    }
	    strs.push(`${marks.join('|')}\n`);
	  }
	
	  console.log(strs.join('-----\n'));
	}
	
	Board.prototype.winner = function() {
	  const posSeqs = [
	    // horizontals
	    [[0, 0], [0, 1], [0, 2]],
	    [[1, 0], [1, 1], [1, 2]],
	    [[2, 0], [2, 1], [2, 2]],
	    // verticals
	    [[0, 0], [1, 0], [2, 0]],
	    [[0, 1], [1, 1], [2, 1]],
	    [[0, 2], [1, 2], [2, 2]],
	    // diagonals
	    [[0, 0], [1, 1], [2, 2]],
	    [[2, 0], [1, 1], [0, 2]]
	  ];
	
	  for (let i = 0; i < posSeqs.length; i++) {
	    const winner = this.winnerHelper(posSeqs[i]);
	    if (winner != null) {
	      return winner;
	    }
	  }
	
	  return null;
	}
	
	
	Board.prototype.winnerHelper = function(posSeq) {
	  for (let markIdx = 0; markIdx < Board.marks.length; markIdx++) {
	    const targetMark = Board.marks[markIdx];
	    let winner = true;
	    for (let posIdx = 0; posIdx < 3; posIdx++) {
	      const pos = posSeq[posIdx];
	      const mark = this.grid[pos[0]][pos[1]];
	
	      if (mark != targetMark) {
	        winner = false;
	      }
	    }
	
	    if (winner) {
	      return targetMark;
	    }
	  }
	
	  return null;
	}
	
	Board.isValidPos = pos =>
	  {return (0 <= pos[0]) &&
	  (pos[0] < 3) &&
	  (0 <= pos[1]) &&
	  (pos[1] < 3);}
	
	Board.makeGrid = () => {
	  const grid = [];
	
	  for (let i = 0; i < 3; i++) {
	    grid.push([]);
	    for (let j = 0; j < 3; j++) {
	      grid[i].push(null);
	    }
	  }
	
	  return grid;
	};
	
	Board.isValidPos = function(pos) {
	  return (0 <= pos[0]) &&
	  (pos[0] < 3) &&
	  (0 <= pos[1]) &&
	  (pos[1] < 3);
	};
	
	Board.makeGrid = function() {
	  const grid = [];
	
	  for (let i = 0; i < 3; i++) {
	    grid.push([]);
	    for (let j = 0; j < 3; j++) {
	      grid[i].push(null);
	    }
	  }
	
	  return grid;
	};
	
	Board.marks = ['x', 'o'];
	
	module.exports = Board;


/***/ },
/* 4 */
/***/ function(module, exports) {

	const MoveError = function (msg) { this.msg = msg; };
	
	module.exports = MoveError;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map