import React, { Component } from 'react'
import {Vector} from '../utils/Vector'
import './GuitarMeasure.css'

/* 吉他的一个小节 */

/* 组成: 6 条线 */
class Line extends Component {
  render() {
    const {x, y, length, direction} = this.props

    if (direction === "horizontal") {
      return (
        <line x1={x} y1={y} x2={x+length} y2={y} className="string"/>
      )
    }
    return (
      <line x1={x} y1={y} x2={x} y2={y + length} className="string"/>
    )
  }
}


export class GuitarMeasure extends Component {
  drawStrings(origin, spacing, length, lineNumber) {
    var x = origin.x
    var y = origin.y

    var result = []
    for (var i=0; i<lineNumber; i++) {
      result.push(<Line x={x} y={y} length={length} direction="horizontal" key={i} />)
      y = y + spacing
    }

    return result
  }

  drawBarLine(point, length, fontSize) {
    var x = point.x
    var y = point.y

    return (
      <Line x={x} y={y} length={length} direction="vertical" />
    )
  }

  drawTab(origin, spacing, fontSize) {
    var padding = 10

    return (
      <text x={origin.x + padding} y={origin.y + 2.5 * spacing } fontSize={fontSize.toString()} fontFamily="Bravura" textAnchor="middle">
        &#xE06D;
      </text>
    )
  }

  drawNotes(origin, fontSize, spacing, length, notes) {
    var x = origin.x
    var padding = 40
    var yoffset = spacing / 2;
    // 假设都是均分的情况
    // grid 有没有，根据 class 来做 offset 和 step
    var step = (length - padding * 2) / (notes.length - 2)
    var result = []

    x = x + padding
    for (var i=0; i<notes.length; i++) {
      var note = notes[i]
      var string = note['string']
      var fret = note['fret']

      if (note['chord'] === false && i !== 0) {
        x = x + step
      }
      // 1 弦最高，y 最小
      var y = origin.y - yoffset + parseInt(string, 10) * spacing

      // 后面加一个白色的矩形
      result.push(
        <g>
          <rect
             x={x - spacing / 2}
             y={y - spacing}
             width={spacing * 1.5}
                height={spacing}
                fill="white"
                stokeWidth="1"
                stroke="white"  />
          <text x={x} y={y} fontSize={fontSize.toString()} >
            {fret}
          </text>
        </g>
      )
    }

    return result
  }

  render () {
    /* 组成部分 */
    /* staff-details: 调弦 */
    /* transpose: 转调 */
    /* note -> notations -> technical(string, fret) */
    /* chord 要对齐 */

    // 假设都是均分的 note
    const notes = [
      {chord: false, string: "2", fret: "1"},
      {chord: true, string: "5", fret: "3"},
      {chord: false, string: "3", fret: "0"},
      {chord: false, string: "2", fret: "1"},
      {chord: false, string: "3", fret: "0"},
      {chord: false, string: "1", fret: "3"},
      {chord: true, string: "4", fret: "2"},
      {chord: false, string: "3", fret: "0"},
      {chord: false, string: "1", fret: "3"},
      {chord: false, string: "3", fret: "0"}
    ]

    const origin = new Vector(20, 200)
    const origin2 = new Vector(420, 200)
    const spacing = 10
    const fontSize = spacing * 5
    const length = 400
    const lineSpacing = 10
    const {key, time, measureNo, clef, layout} = this.props
    const transformation = `translate(${layout.layout.left},${layout.layout.top})`;

    return (
      <g transform={transformation}>
          {this.drawBarLine(origin, fontSize)}
          {this.drawTab(origin, spacing, spacing * 3)}
          {this.drawStrings(origin, spacing, length, 6)}
          {this.drawNotes(origin, spacing * 1.2, spacing, length, notes)}
          {this.drawBarLine(new Vector(origin.x + length, origin.y), fontSize)}
        </g>

    )
  }
}
