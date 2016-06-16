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
