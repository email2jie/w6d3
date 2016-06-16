let HanoiGame = require('./game.js');
let HanoiView = require('./hanoi-view.js');
$( () => {
  const rootEl = $('.hanoi');
  const game = new HanoiGame();
  new HanoiView(game, rootEl);
});
