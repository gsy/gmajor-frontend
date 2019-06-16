/* 二维向量 */
export class Vector {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  toString() {
    return '<' + this.x + ', '  + this.y + '>'
  }

  negative() {
    return new Vector(-this.x, -this.y);
  }

  add(v) {
    if (v instanceof Vector) {
      return new Vector(this.x + v.x, this.y + v.y);
    }
    else {
      return new Vector(this.x + v, this.y + v);
    }
  }

  subtract(v) {
    if (v instanceof Vector) {
      return new Vector(this.x - v.x, this.y - v.y,);
    }
    else {
      return new Vector(this.x - v, this.y - v);
    }
  }

  multiply(v){
    if (v instanceof Vector){
      return new Vector(this.x * v.x, this.y * v.y);
    }
    else {
      return new Vector(this.x * v, this.y * v);
    }
  }

  divide(v) {
    if (v instanceof Vector) {
      return new Vector(this.x / v.x, this.y / v.y);
    }
    else {
      return new Vector(this.x / v, this.y / v);
    }
  }

  equals(v) {
    return this.x === v.x && this.y === v.y;
  }

  dot(v) {
    return this.x * v.x + this.y * v.y;
  }
}
