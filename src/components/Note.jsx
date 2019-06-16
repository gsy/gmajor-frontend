import React, { Component } from 'react'
import {Glyph} from './Glyph'
import {Vector} from '../utils/Vector'
import {Rectangle} from '../utils/Rectangle'
import {ComposableGlyph} from './ComposableGlyph'


export class Note extends Component {
  rearrange(glyphs) {
    if (glyphs.length < 1) {
      return glyphs
    }

    var result = [glyphs[0]]
    var prior = glyphs[0]
    for (var i = 1; i < glyphs.length; i++) {
      var current = glyphs[i]
      var edge = prior.edge
      var source = edge['source']
      var destination = edge['destination']

      var innerBox = current.box.alignTo(
        prior.box.getPoint(source),
        destination
      )

      var glyph = new ComposableGlyph(
        current.codePoint,
        innerBox,
        current.edge
      )
      prior = glyph
      result.push(glyph)
    }

    console.log("rearrange:", result)
    return result
  }

  render8th(fontSize, origin) {
    /* 现在的 fontSize 对的上 glyph 的 fontSize */
    /* 矩形的大小是合适的，只要位置摆对了就 ok */
    var scale = 4.0
    var noteHead = new ComposableGlyph(
      "E0A4",
      new Rectangle(
        new Vector(1.18, 0.5),
        new Vector(0.0, -0.5)
      ).scale(fontSize / scale)
    )
    var stem = new ComposableGlyph(
      "E210",
      new Rectangle(
        new Vector(0.06, 3.5),
        new Vector(-0.06, 0.0)
      ).scale(fontSize / scale)
    )

    /* fontSize 和 bbox 之间是什么关系 */
    var flag8thUp = new ComposableGlyph(
      "E240",
      new Rectangle(
        new Vector(1.056, 0.036),
        new Vector(0.0, -3.244)
      ).scale(fontSize / scale)
    )

    /* linked */
    noteHead.edge = {"source": "northEast", "destination": "southWest"}
    stem.edge = {"source": "northEast", "destination": "northWest"}
    var glyphs = [noteHead, stem, flag8thUp]
    console.log("glyphs:", glyphs)
    var rearranged = this.rearrange(glyphs)

    /* render linkList */
    return this.renderGlyphs(rearranged, fontSize, origin)
  }

  /* bounding box 还要包含原点的信息？原点不一定在 box 里面，而且都要 * 10 */
  /* anchor 好像还有位移信息 */
  renderGlyphs(glyphs, fontSize, origin) {
    var result = []
    var x = origin.x
    var y = origin.y

    for (var i=0; i < glyphs.length; i++) {
      var glyph = glyphs[i]
      var boundingBox = glyph.box
      var codePoint = glyph.codePoint
      console.log("boundingbox: ", boundingBox.width(), boundingBox.height())
      console.log("x: " + x + "y: " + y)
      /* stem 不是配套的，说了要自己画 */
      result.push(<Glyph key={i} x={x} y={y} width={boundingBox.width()} height={boundingBox.height()} fontSize={fontSize} codePoint={codePoint} id={i} />)
      x = x + boundingBox.width()
      y = y - boundingBox.height()
    }
    /* fontHead 实际宽度是 14.75, 算出来的宽度是 59, 刚好是 4.0 倍 */
    /* stem 的实际宽度是 1.5，算出来的宽度是 6 */
    /* flag: 52.8 164 -> 13.2 41 */
    /* fontSize = 50 */
    /* 矩形 scale 成原来的 1/4 */
    /* TODO: stem 自动生成，stem 跟其他东西不是匹配的 */
    /* FIXME: fontSize 跟给出的矩形的关系为什么是 4 要看下 */
    /* 寻找自动对准的方式 */


    return (
      <svg  xmlns="http://www.w3.org/2000/svg"
        width="500" height="500" viewBox="0 0 500 500"
      >
        <g>
          {result}
        </g>
      </svg>
    )
  }

  render () {
    /* 根据信息生成提取 meta 信息 */
    var pitch = 'c4';
    var duration = 1;
    var type = 'eight';/* 8分音符 */
    var stem = 'up';/* 向上 */
    /* technical */
    var string = '2';
    var fret = '1';

    /* 位置信息 */
    var x = 100
    var y = 100
    var fontSize = 50
    var prior = new Vector(100, 100);

    switch (stem) {
      case 'up':
        var x1 = x
        var y1 = y
        return (
          this.render8th(fontSize, new Vector(100, 100))
        )
      case 'down':
        var x1 = x
        var y1 = y
        return (
          <svg  xmlns="http://www.w3.org/2000/svg">
            <g>
              <Glyph x={x1} y={y} fontSize={fontSize} codePoint="E210" />/* stem */
              <Glyph x={x} y={y1} fontSize={fontSize} codePoint="E0A4" />/* noteHead */

              <Glyph x={x1} y={y} fontSize={fontSize} codePoint="E241" />/* flag */
            </g>
          </svg>
      )
    }
  }
}
