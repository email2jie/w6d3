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

	let HanoiGame = __webpack_require__(2);
	let HanoiView = __webpack_require__(3);
	$( () => {
	  const rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  new HanoiView(game, rootEl);
	});


/***/ },
/* 2 */
/***/ function(module, exports) {

	function Game () {
	  this.towers = [[3, 2, 1], [], []];
	};
	
	Game.prototype.isValidMove = function(startTowerIdx, endTowerIdx) {
	    const startTower = this.towers[startTowerIdx];
	    const endTower = this.towers[endTowerIdx];
	
	    if (startTower.length === 0) {
	      return false;
	    } else if (endTower.length == 0) {
	      return true;
	    } else {
	      const topStartDisc = startTower[startTower.length - 1];
	      const topEndDisc = endTower[endTower.length - 1];
	      return topStartDisc < topEndDisc;
	    }
	};
	
	Game.prototype.isWon = function(){
	    // move all the discs to the last or second tower
	    return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	};
	
	
	Game.prototype.move = function(startTowerIdx, endTowerIdx) {
	    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	      return true;
	    } else {
	      return false;
	    }
	};
	
	
	Game.prototype.print = function(){
	    console.log(JSON.stringify(this.towers));
	};
	
	
	Game.prototype.promptMove = function(reader, callback) {
	    this.print();
	    reader.question("Enter a starting tower: ", start => {
	      const startTowerIdx = parseInt(start);
	      reader.question("Enter an ending tower: ", end => {
	        const endTowerIdx = parseInt(end);
	        callback(startTowerIdx, endTowerIdx)
	      });
	    });
	};
	
	Game.prototype.run = function(reader, gameCompletionCallback) {
	    this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	      if (!this.move(startTowerIdx, endTowerIdx)) {
	        console.log("Invalid move!");
	      }
	
	      if (!this.isWon()) {
	        // Continue to play!
	        this.run(reader, gameCompletionCallback);
	      } else {
	        this.print();
	        console.log("You win!");
	        gameCompletionCallback();
	      }
	    });
	};
	
	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports) {

	function HanoiView(HanoiGame, DOM){
	  this.DOM = DOM;
	  this.Game = HanoiGame;
	
	  this.TowerI = undefined;
	
	  this.setupTowers();
	  this.render();
	
	  let towers = $('ul.towers');
	  let fromTowerI = undefined;
	  let that = this;
	  towers.each(function(i){
	    let tower = $(this);
	    // debugger;
	    tower.on('click', clickTower);
	
	
	    function clickTower(event){
	
	      if (fromTowerI !== undefined) {//second click
	        var toTower = event.currentTarget;
	        var toTowerI = $(toTower).data("id");
	
	        if(that.Game.move(fromTowerI, toTowerI)===false){
	          alert("Invalid Move!");
	        }
	        if(that.Game.isWon()){
	          alert("You Win!");
	          
	        }
	        $('ul.towers').eq(fromTowerI).toggleClass("highlighted");
	        that.render();
	        fromTowerI = undefined;
	      }
	      else{
	        var fromTower = event.currentTarget;
	        $(fromTower).toggleClass("highlighted");
	        fromTowerI = $(fromTower).data("id");
	      }
	    }
	  });
	}
	
	HanoiView.prototype.setupTowers = function () {
	  const $towers = $("<section class='towers'></section>");
	
	  const $tower1 = $("<ul class='towers'>:</ul>");
	  const $tower2 = $("<ul class='towers'>:</ul>");
	  const $tower3 = $("<ul class='towers'>:</ul>");
	  $tower1.data("id", 0);
	  $tower2.data("id", 1);
	  $tower3.data("id", 2);
	
	  let towers = [$tower1, $tower2, $tower3];
	
	  this.Game.towers[0].forEach(function (disk, i) {
	    const $disk = $("<li></li>");
	    disk = `__${disk}__`;
	    if (i === 0) {
	      disk = `__` + disk;
	    }
	    if (i===2) {
	      disk = disk + `__`;
	    }
	    $disk.text(disk);
	    $tower1.append($disk);
	  });
	
	  towers.forEach(function(tower){
	    $towers.append(tower);
	  });
	
	  this.DOM.append($towers);
	};
	
	
	
	HanoiView.prototype.render = function () {
	  const $towers = $('ul.towers');
	  $towers.each(function(tower){
	    $(this).text(":");
	  });
	
	  this.Game.towers.forEach(function (tower, i) {
	
	
	    tower.forEach(function (disk, j) {
	      let $disk = $("<li></li>");
	      disk = `__${disk}__`;
	      if (j === 0) {
	        disk = `__` + disk;
	      }
	      if (j === tower.length - 1) {
	        disk = disk + `__`;
	      }
	      $disk.text(disk);
	      $($towers[i]).append($disk);
	    });
	  });
	};
	
	module.exports = HanoiView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map