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
