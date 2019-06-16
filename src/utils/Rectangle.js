import {Vector} from './Vector'

export class Rectangle {
  /* 东北角和西南角来定义矩形 */
  constructor(northEastPoint, southWestPoint) {
    this.ne = northEastPoint
    this.sw = southWestPoint
  }

  northWest() {
    return new Vector(this.sw.x, this.ne.y)
  }

  northEast() {
    return this.ne
  }

  southEast() {
    return new Vector(this.ne.x, this.sw.y)
  }

  southWest() {
    return this.sw
  }

  width() {
    return this.ne.x - this.sw.x
  }

  height() {
    return this.ne.y - this.sw.y
  }

  origin() {
    return new Vector(this.sw.x + (this.width() / 2), this.sw.y + (this.height() / 2))
  }

  shift(delta) {
    return new Rectangle(
      this.ne.add(delta), this.sw.add(delta)
    )
  }

  /* 缩放 */
  scale(m) {
    return new Rectangle(
      this.ne.multiply(m),
      this.sw.multiply(m)
    )
  }

  getPoint(direction) {
    switch(direction) {
      case "northWest":
        return this.northWest()
      case "northEast":
        return this.northEast()
      case "southEast":
        return this.southEast()
      case "southWest":
        return this.southWest()
    }
  }

  /* 给定一个点的坐标，作为新的矩形的某个起点，然后返回新的矩形 */
  alignTo(point, direction) {
    switch(direction) {
      case "northWest":
        var ne = new Vector(point.x + this.width(), point.y)
        var sw = new Vector(point.x, point.y - this.height())
        return new Rectangle(ne, sw)

      case "northEast":
        var delta = point - this.nortEast()
        var sw = this.southWest() + delta
        return new Rectangle(point, sw)

      case "southEast":
        var ne = new Vector(point.x, point.y + this.height())
        var sw = new Vector(point.x - this.width(), point.y)
        return new Rectangle(ne, sw)

      case "southWest":
        var ne = new Vector(point.x + this.width(), point.y + this.height())
        return new Rectangle(ne, point)
    }
  }
}
