import React, { Component } from 'react';
import Vex from 'vexflow';

const {
  Accidental,
  Formatter,
  Stave,
  StaveNote,
  Renderer,
  Voice,
  TabNote,
  Bend,
  Vibrato,
} = Vex.Flow;


export default class SongPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    const container =  document.createElement('div');
    const renderer = new Renderer(container, Renderer.Backends.SVG);
    renderer.resize(500, 500);
    const ctx = renderer.getContext();
    const stave = new Stave(10, 40, 400);
    stave.addClef("treble").addTimeSignature("4/4");
    stave.setContext(ctx).draw();

    var notes = [
      new StaveNote({clef: "treble", keys: ["c/5"], duration: "q"}),
      new StaveNote({clef: "treble", keys: ["d/4"], duration: "q"}),
      new StaveNote({clef: "treble", keys: ["b/4"], duration: "qr"}),
      new StaveNote({clef: "treble", keys: ["b/4", "e/4", "g/4"], duration: "q"}),
    ];

    var notes2 = [
      new StaveNote({clef: "treble", keys: ["c/4"], duration: "w"})
    ];

    var notes3 = [
      new StaveNote({clef: "treble", keys: ["e##/5"], duration: "8d"})
        .addAccidental(0, new Accidental("##")).addDotToAll(),
      new StaveNote({clef: "treble", keys: ["eb/5"], duration: "16"})
        .addAccidental(0, new Accidental("b")),
      new StaveNote({clef: "treble", keys: ["d/5", "eb/4"], duration: "h"})
        .addDot(0),
      new StaveNote({clef: "treble", keys: ["c/5", "eb/5", "g#/5"], duration: "q"})
        .addAccidental(1, new Accidental("b"))
        .addAccidental(2, new Accidental("#")).addDotToAll()
    ];

    var notes4 = [
      new TabNote({
        positions: [{str: 3, fret: 7}],
        duration: "q"
      }),

      new TabNote({
        positions: [{str: 2, fret: 10},
          {str: 3, fret: 9}],
        duration: "q"
      })
        .addModifier(new Bend("Full"), 1),

      new TabNote({
        positions: [{str: 2, fret: 5}],
        duration: "h"
      }).addModifier(new Vibrato().setHarsh(true).setVibratoWidth(70), 0)
    ];

    var voices = [
      new Voice({num_beats: 4, beat_value: 4}).addTickables(notes),
      new Voice({num_beats: 4, beat_value: 4}).addTickables(notes2),
    ];

    var fromatter = new Formatter().joinVoices(voices).format(voices, 400);
    // render voices
    /* voices.forEach(function (v) { v.draw(ctx, stave) });
     * Formatter.FormatAndDraw(ctx, stave, notes3);*/
    Formatter.FormatAndDraw(ctx, stave, notes4);

    this.refs.outer.appendChild(container);
  }


  render() {
    return (
      <div ref="outer"></div>
    )
  }
}
