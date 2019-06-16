export class ComposableGlyph {
  constructor(codePoint, box, edge) {
    /* 应该是 em 作为单位的 scale */
    /* get glyph bounding box from json */
    /* var bBoxNE = new Vector(1.18, 0.5);
     * var bBoxSW = new Vector(0.0, -0.5);
     * var box = new Rectangle(bBoxNE, bBoxSW);*/

    this.codePoint = codePoint
    this.box = box
    this.edge = edge || {"source": "", "destination": ""}
  }

  codePoint() {
    return this.codePoint
  }

  boundingBox() {
    return this.box
  }

  edge() {
    return this.edge
  }
}
