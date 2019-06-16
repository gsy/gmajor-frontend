import React, { Component } from 'react'

import {Meta} from './Meta'
import {Measure} from './Measure'
import {GuitarMeasure} from './GuitarMeasure'
import {FlexLayout} from './Layout'
import {Grid} from './Grid'
import {Note} from './TestNode'
import {Test} from '../ast/xmlParser'


class FakeMeasure extends Component {
  render () {
    const {number, layout} = this.props
    const transformation = `translate(${layout.layout.left},${layout.layout.top})`;
    const {width, height} = layout
    return (
      <g transform={transformation}>
        <Grid width={width} height={height} lines="5" />
        <FlexLayout width={layout.width} height={layout.height}>
          <BeatBox key="11"/>
          <BeatBox key="21" />
          <BeatBox key="31" />
          <BeatBox key="41" />
        </FlexLayout>
      </g>
    )
  }
}

class BeatBox extends Component {
  render () {
    const {layout} = this.props
    const transformation = `translate(${layout.layout.left},${layout.layout.top})`;
    /* g key，然后 c3 是怎么确定的？ */
    const info = {
      /* "type": "eighth",*/
      "type": "16th",
      "pitch": {
        "step": "G",
        "octave": "3",
      },
      "duration": 1,
      "stem": "up",
      "beam": {
        "number": "1",
        "type": "begin"
      },
      "spacing": 20,/* 行间距离 */
    }

    return (
      <g transform={transformation}>
        <Note {...info} />
      </g>
    )
  }
}

export class Score extends Component {

  componentWillMount() {
    console.log("score component will mount");
    /* Test();*/
  }



  render() {
    const {doc} = this.props

    // if (doc == null) {
    //   return null
    // }

    // var measures = doc.getElementsByTagName("measure")
    // var measure = measures[0]

    // var noteElements = measure.getElementsByTagName("note")
    // var notes = []

    // for (var i=0; i<noteElements.length; i++) {
    //   var note = noteElements[i];
    //   var chordElements = note.getElementsByTagName("chord")
    //   var technicalElement = note.getElementsByTagName("technical")[0]
    //   var stringElements = technicalElement.getElementsByTagName("string")
    //   var fretElements = technicalElement.getElementsByTagName("fret")

    //   var chord = false
    //   var string = ""
    //   var fret = ""

    //   if (chordElements.length > 0) {
    //     chord = true
    //   }

    //   if (stringElements.length > 0 && fretElements.length > 0) {
    //     console.log("string element:", stringElements[0])
    //     string = stringElements[0].childNodes[0].nodeValue
    //     fret = fretElements[0].childNodes[0].nodeValue
    //   }

    //   notes.push({
    //     "chord": chord,
    //     "string": string,
    //     "fret": fret
    //   })
    // }

    return (
      <div>
        {/* <Meta /> */}
        <svg  xmlns="http://www.w3.org/2000/svg"
          width="1000" height="600" viewBox="-10 -20 1000 600">
          {<FlexLayout width="1000" height="600" isRoot={true}>
            <FakeMeasure key="1" />
            <FakeMeasure key="2" />
            <FakeMeasure key="3" />
          </FlexLayout>}
        </svg>
      </div>
    )
  }
}
