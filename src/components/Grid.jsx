import React, { Component } from 'react'

export class Grid extends Component {
  drawHorizentalLines(lines, length, lineHeight, x, y) {
    var result = []
    for (var i = 0; i < lines; i++) {
      var x1 = x
      var y1 = y + i * lineHeight
      var x2 = x + length
      var y2 = y1

      result.push(
        <line x1={x1} y1={y1} x2={x2} y2={y2}
          strokeWidth="2" stroke="grey"/>
      )
    }
    return result
  }

  drawVerticalLines(length, height, x, y) {
    var head = <line x1={x} y1={y} x2={x} y2={y + height}
    strokeWidth="2" stroke="grey"/>
    var tail = <line x1={x + length} y1={y} x2={x+length} y2={y + height}
                 strokeWidth="2" stroke="grey"/>

    return [head, tail]
  }

  render () {
    const {width, height} = this.props
    const lines = parseInt(this.props.lines, 10)
    const lineHeight = height / (lines - 1)

    return (
      <g>
        {this.drawHorizentalLines(lines, width, lineHeight, 0, 0)}
        {this.drawVerticalLines(width, height, 0, 0)}
      </g>
    )
  }
}
