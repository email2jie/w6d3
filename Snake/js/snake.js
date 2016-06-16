let Coord = require('./coord.js');

let Board = require('./board.js');

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
