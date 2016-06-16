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
