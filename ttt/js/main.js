let TTTView = require('./ttt-view.js');// require appropriate file
let TTTGame = require('./game.js'); // require appropriate file

$( () => {
  // Your code here
  const rootEl = $('.ttt');
  const game = new TTTGame();
  new TTTView(game, rootEl);
});
