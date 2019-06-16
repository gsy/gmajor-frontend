import React, { Component } from 'react'
import {glyphnames} from '../utils/glyphnames'

export class Glyph extends Component {
  getCodePoint(name) {
    var codepoint = glyphnames[name]["codepoint"];
    codepoint = codepoint.replace(/U\+(\w+)/, "$1");
    return String.fromCharCode(parseInt(codepoint, 16));
  }

  render () {
    const {x, y, name, fontSize, id} = this.props
    const code = this.getCodePoint(name)

    return (
      <g>
        <text id={"glyph" + id} x={x} y={y} fontSize={fontSize} fontFamily="Bravura">
          {code}
        </text>
      </g>
    )
  }
}
