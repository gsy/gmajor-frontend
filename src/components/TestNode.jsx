import React, { Component } from 'react'
import {Glyph} from './Glyph'
import {Vector} from '../utils/Vector'
import {bravura} from '../utils/bravura_metadata'


export class Note extends Component {

  getNoteHeadName() {
    const {type} = this.props

    switch (type) {
      case "whole":
        return "noteheadWhole"
      case "half":
        return "noteheadHalf"
      default:
        return "noteheadBlack"
    }
  }

  getFlagName() {
    const {stem, type, beam} = this.props

    var duration;
    switch (type) {
      case "eighth":
        duration = "8th"
        break
      case "16th":
        duration = "16th"
        break
      default:
        duration = type
    }

    var direction = (stem === "up") ? "Up" : "Down"
    return "flag" + duration + direction
  }

  getNoteHeadCoordination() {
    const {pitch, spacing} = this.props
    const {octave} = pitch
    const step = pitch.step.toLowerCase()

    var baseLine;
    var offset;
    /* c4 是中央 c, 位置是下加一线 */
    /* 是不是跟 key 的位置有关的啊？只有 5 条线，不可能画完全部的8度 */
    switch(octave) {
      case "3":
        baseLine = 5;
      default:
        baseLine = 5;
    }

    switch(step) {
      case "c":
        offset = 0
        break
      case "d":
        offset = 0.5
        break
      case "e":
        offset = 1
        break
      case "f":
        offset = 1.5
        break
      case "g":
        offset = 2
        break
      case "a":
        offset = 2.5
        break
      case "b":
        offset = 3
        break
    }

    /* FIXME: x 的坐标怎么算？ */
    return new Vector(0, (baseLine - offset) * spacing)
  }

  getStemCoordination(origin, noteHead, staffSpace) {
    const {stem, spacing} = this.props

    var result;
    var anchorCoordination
    switch (stem) {
      case "up":
        var anchor = bravura['glyphsWithAnchors'][noteHead]['stemUpSE']
        anchorCoordination = new Vector(anchor[0], anchor[1]).multiply(spacing)
        break
      case "down":
        var anchor = bravura['glyphsWithAnchors'][noteHead]['stemDownNW']
        anchorCoordination = new Vector(anchor[0], anchor[1]).multiply(spacing)
        break
    }

    /* 减掉 stem 本身的 width */
    const width = 2
    return new Vector(origin.x + anchorCoordination.x - width, origin.y - anchorCoordination.y)
  }

  getFlagCoordination(stemCoordination, flag) {
    const {spacing, stem} = this.props
    const length = spacing * 3.5
    switch (stem) {
      case "up":
        var anchor = bravura['glyphsWithAnchors'][flag]['stemUpNW']
        var anchorCoordination = new Vector(anchor[0], anchor[1]).multiply(spacing)
        return new Vector(stemCoordination.x + anchorCoordination.x, stemCoordination.y - length - anchorCoordination.y)
      case "down":
        return new Vector(stemCoordination.x, stemCoordination.y + length)
    }
  }

  drawNoteHead(coordinate, fontSize, noteHeadName) {
    return (
      <Glyph x={coordinate.x} y={coordinate.y} fontSize={fontSize} name={noteHeadName} />
    )
  }

  drawStem(coordination) {
    const {stem, spacing} = this.props
    const length = 3.5 * spacing

    switch(stem) {
      case "up":
        return (
          <line x1={coordination.x} y1={coordination.y} x2={coordination.x} y2={coordination.y - length} strokeWidth="2" stroke="black"/>
        )
      case "down":
        return (
          <line x1={coordination.x} y1={coordination.y} x2={coordination.x} y2={coordination.y + length} strokeWidth="3" stroke="black"/>
        )
    }
  }

  drawFlag(coordination, fontSize, flagName) {
    /* 假设是 beam 的话，flag 就是直的，否则是弯的 */
    return (
      <Glyph x={coordination.x} y={coordination.y} fontSize={fontSize} name={flagName} />
    )
  }

  render () {
    const { x, y, spacing } = this.props

    const staffSpace = spacing * 4
    const noteHeadName = this.getNoteHeadName()
    const noteHeadCoordination = this.getNoteHeadCoordination()
    const stemCoordination = this.getStemCoordination(noteHeadCoordination, noteHeadName, staffSpace)
    const flagName = this.getFlagName()
    const flagCoordination = this.getFlagCoordination(stemCoordination, flagName)
    console.log("note coordinate:", noteHeadCoordination)
    console.log("stemCoordination:", stemCoordination)
    console.log("flag name:", flagName)
    console.log("flagCoordination:", flagCoordination)

    return (
      <g>
        {this.drawNoteHead(noteHeadCoordination, staffSpace, noteHeadName)}
        {this.drawStem(stemCoordination)}
        {this.drawFlag(flagCoordination, staffSpace, flagName)}
      </g>
    )
  }
}
