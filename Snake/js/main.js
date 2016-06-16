let SnakeGame = require('./snake.js');
let SnakeView = require('./snake-view.js');
$( () => {
  const rootEl = $('.game');
  const game = new SnakeGame();
  new SnakeView(game, rootEl);
});
