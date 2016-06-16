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
