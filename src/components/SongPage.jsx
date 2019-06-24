import React, { Component } from 'react';
import Vex from 'vexflow';

const {
  Accidental,
  Formatter,
  TabStave,
  Stave,
  StaveNote,
  Renderer,
  Voice,
  TabNote,
  Bend,
  Vibrato,
  Tuning,
  keyProperties,
} = Vex.Flow;


export default class SongPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    /* 需要的参数 */
    /* var tab_voices = [];
     * var score_voices = [];
     * var text_voices = [];
     * var beams = [];*/

    const container =  document.createElement('div');
    const renderer = new Renderer(container, Renderer.Backends.SVG);
    renderer.resize(500, 500);
    const ctx = renderer.getContext();
    const stave = new Stave(10, 40, 400);
    const tabStave = new TabStave(10, 120, 400);
    stave.addClef("treble").addTimeSignature("4/4");
    tabStave.addClef("treble").addTimeSignature("4/4");
    stave.setContext(ctx).draw();
    tabStave.setContext(ctx).draw();

    var tab_voices = [];
    var score_voices = [];
    var format_stave = null;
    var beams = [];

    var tab_voices = [];/* 输入 */
    var score_voices = [];


    for(var notes in tab_voices) {
      if (typeof notes === 'undefined' || notes.length == 0) {
        continue;
      }
      for (var note in notes) {
        note.setStave(tabStave);
      }
      var voice = new Vex.Flow.Voice(Vex.Flow.TIME4_4).setMode(Vex.Flow.Voice.Mode.SOFT);
      voice.addTickables(notes);
      tab_voices.push(voice);
    }

    for(var notes in score_voices) {
      if (typeof notes === 'undefined' || notes.length == 0) {
        continue;
      }
      for (var note in notes) {
        note.setStave(stave);
      }
      var voice = new Vex.Flow.Voice(Vex.Flow.TIME4_4).setMode(Vex.Flow.Voice.Mode.SOFT);
      voice.addTickables(notes);
      score_voices.push(voice);
    }

    var format_voices = [];
    var formatter = new Vex.Flow.Formatter();

    if (tab_voices.length > 0) {
      formatter.joinVoices(tab_voices);
      format_voices = tab_voices;
    }

    if (score_voices.length > 0) {
      formatter.joinVoices(score_voices);
      format_voices = format_voices.concat(score_voices);
    }

    if (format_voices.length > 0) {
      formatter.formatToStave(format_voices, stave);
    }
    tab_voices.forEach(function(voice) {voice.draw(ctx, tabStave);});
    score_voices.forEach(function(voice) {voice.draw(ctx, stave);});
    var connector = new Vex.Flow.StaveConnector(stave, tabStave);
    connector.setType(Vex.Flow.StaveConnector.type.BRACKET)
      .setContext(ctx).draw();


    var canon_notes = [
      new TabNote({
        positions: [{str: 1, fret: 0}, {str: 2, fret: 1}, {str: 3, fret: 0}, {str: 5, fret: 3}],
        duration: "h"
      }),
      /* new StaveNote({clef: "treble", keys: ["c/4", "c/5"], duration: "h"}),*/
      new StaveNote({clef: "treble", keys: ["a#/3", "e/4", "g/4", "a/4"], duration: "h"}),
    ];

    var canon = [
      new Voice({num_beats: 4, beat_value: 4}).addTickables(canon_notes)
    ];

    /* var fromatter = new Formatter().joinVoices(voices).format(voices, 400);*/
    var fromatter = new Formatter().joinVoices(canon).format(canon, 400);
    // render voices
    /* voices.forEach(function (v) { v.draw(ctx, stave) });
     * Formatter.FormatAndDraw(ctx, stave, notes3);*/
    Formatter.FormatAndDraw(ctx, stave, canon_notes);

    var tuning = new Tuning();
    var spec = tuning.getNoteForFret("1", "1");
    console.log("spec", spec);
    var spec_props = keyProperties(spec);
    console.log("spec_props", spec_props);

    this.refs.outer.appendChild(container);
  }


  render() {

    return (
      <div ref="outer"></div>
    )
  }
}
