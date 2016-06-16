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
