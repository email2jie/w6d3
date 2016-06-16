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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	let SnakeGame = __webpack_require__(2);
	let SnakeView = __webpack_require__(5);
	$( () => {
	  const rootEl = $('.game');
	  const game = new SnakeGame();
	  new SnakeView(game, rootEl);
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	let Coord = __webpack_require__(3);
	
	let Board = __webpack_require__(4);
	
	function Snake(){
	
	  this.directions = {
	    N:[1,  0],
	    S:[-1, 0],
	    E:[0,  1],
	    W:[0, -1]
	  };
	  this.dir = "N";
	  this.segments = [new Coord(12, 12)];
	  this.board = new Board(this);
	}
	
	
	Snake.prototype.move = function () {
	  let lastUpdatedCoord = this.segments[0].coord.slice();
	
	  let newHead = this.segments[0].plus(this.directions[this.dir]);
	
	  for (var i = 1; i < this.segments.length; i++){
	    let holder =  this.segments[i].coord.slice();
	    this.segments[i].coord = new Coord(lastUpdatedCoord[0], lastUpdatedCoord[1]);
	    lastUpdatedCoord = holder;
	  }
	
	
	};
	
	Snake.prototype.turn = function (dir) {
	  this.dir = dir;
	};
	
	module.exports = Snake;


/***/ },
/* 3 */
/***/ function(module, exports) {

	function Coord(row, col){
	  this.coord = [row, col];
	
	
	}
	
	Coord.prototype.plus= function (posArr) {
	  this.coord[0] += posArr[0];
	  this.coord[1] += posArr[1];
	};
	
	Coord.prototype.equals = function (posArr) {
	  if ((this.coord[0] === posArr[0]) && (this.coord[1] === posArr[1])) {
	    return true;
	  }
	  return false;
	};
	
	module.exports = Coord;


/***/ },
/* 4 */
/***/ function(module, exports) {

	function Board(snake) {
	  this.board = this.createGrid();
	  this.snake = snake;
	  this.applePos = this.randomPos();
	  this.change();
	
	
	}
	
	Board.prototype.createGrid = function () {
	  let grid = new Array(25);
	  for (var i = 0; i < grid.length; i++) {
	    grid[i] = new Array(25);
	  }
	  return grid;
	};
	
	Board.prototype.randomPos = function(snakeCoords){
	  snakeCoords = snakeCoords || this.snake.segments.map(function(segment){
	    return segment.coord;
	  });
	
	  let row = Math.floor(Math.random() * 25);
	  let col = Math.floor(Math.random() * 25);
	  let randomCoord = [row, col];
	
	  if (this.anyCoordsEqual(snakeCoords, randomCoord)){
	      return this.randomPos(snakeCoords);
	  }
	  else{
	       return randomCoord;
	  }
	};
	
	Board.prototype.anyCoordsEqual = function(snakeCoords, randomCoord){
	  return snakeCoords.some((snakeCoord) => {
	    return this.coordsEqual(snakeCoord, randomCoord);
	  });
	};
	
	Board.prototype.coordsEqual = function(coords1, coords2){
	  return ((coords1[0] === coords2[0]) && (coords1[1] === coords2[1]));
	};
	
	Board.prototype.change = function(){
	  /* render all snake coords as snake coords.  Render apples.  The rest are blank*/
	  this.board = this.createGrid();
	  this.snake.segments.forEach((coordObj) => {
	    let snakeCoord = coordObj.coord;
	    this.board[snakeCoord[0]][snakeCoord[1]] = "S";
	  });
	
	  this.board[this.applePos[0]][this.applePos[1]] = "A";
	};
	module.exports = Board;


/***/ },
/* 5 */
/***/ function(module, exports) {

	function View(game, $el){
	  this.game = game;
	  this.$el = $el;
	
	  this.setupBoard();
	  this.render();
	
	  setInterval(()=>{
	    this.game.move();
	    this.game.board.change();
	    this.render();
	  }, 1000);
	}
	
	View.prototype.setupBoard = function () {
	  const ul = $('<ul class="board"></ul>');
	  for (var i = 0; i < 625; i++) {
	    const li = $('<li class="square"></li>');
	    ul.append(li);
	  }
	  this.$el.append(ul);
	};
	
	View.prototype.render = function () {
	  let $lis = $('li.square');
	  $lis.attr('class', 'square');
	  let $ul = $('ul.board');
	
	  this.game.board.board.forEach(function(row, i){
	    row.forEach(function(col, j){
	      let n = i * row.length + j;
	      n++;
	      let $li = $("li:nth-child(" + n + ")");
	
	      if (col === undefined){
	
	      }
	      else if(col === "S"){
	        $li.addClass('snake');
	      }
	      else if (col === "A"){
	        $li.addClass('apple');
	      }
	    });
	  });
	};
	
	module.exports = View;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map