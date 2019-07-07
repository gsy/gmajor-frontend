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
  KeyManager,
  Music,
} = Vex.Flow;


export default class SongPage extends Component {
  static defaultProps = {
    options: {
      font_face: "Arial",
      font_size: 10,
      font_style: null,
      bottom_spacing: 20,
      tab_stave_lower_spacing: 10,
      note_stave_lower_spacing: 0,
      scale: 1.0,
    },

    customizations: {
      "font-size": 10,
      "font-face": "Arial",
      "font-style": null,
      "annotation-position": "bottom",
      "scale": 1.0,
      "width": 800,
      "stave-distance": 0,
      "space": 0,
      "player": "false",
      "tempo": 120,
      "instrument": "acoustic_grand_piano",
      "accidentals": "standard",
      "tab-stems": "false",
      "tab-stem-direction": "up",
      "beam-rests": "true",
      "beam-stemlets": "true",
      "beam-middle-only": "false",
      "connector-space": 5,
    },
  }

  constructor(props) {
    super(props);
    this.state = {}
  }

  getNoteForFret = (fret, string) => {
    var tuning = new Tuning();
    var music_api = new Music();
    var spec = tuning.getNoteForFret(fret, string);
    console.log("spec", spec);

    var spec_props = keyProperties(spec);
    console.log("spec_props", spec_props);

    var key_manager = new KeyManager("C");
    var selected_note = key_manager.selectNote(spec_props.key)

    var new_note = selected_note.note;
    var new_octave = spec_props.octave;
    /* 这是个配置量，不知道是干什么的 */
    var accidentals = "standard"
    var accidental = null;
    switch (accidentals) {
      case "standard":
        if (selected_note.change) {
          accidental = (selected_note.accidental) ? selected_note.accidental : "n";
        }
      case "cautionary":
        if (selected_note.change) {
          accidental = (selected_note.accidental) ? selected_note.accidental : "n";
        } else if (selected_note.accidental) {
          accidental = selected_note.accidental + "_c";
        }
    }

    var old_root = music_api.getNoteParts(spec_props.key).root
    var new_root = music_api.getNoteParts(selected_note.note).root

    if (new_root == "b" && old_root == "c") {
      new_octave--;
    } else if (new_root == "c" && old_root == "b") {
      new_octave++;
    }

    return [new_note, new_octave, accidental]
  }

  renderNotes = () => {
    var frets = [
      {"value": 0, "string": 1},
      {"value": 1, "string": 2},
      {"value": 0, "string": 3},
      {"value": 3, "string": 5}
    ]
    var play_notes = [];
    frets.forEach((fret) => {
      var play_note = this.getNoteForFret(fret.value, fret.string);
      console.log(play_note)
      play_notes.push(play_note);
    })
  };

  addChord = (chord, chord_articulation, chord_decorator) => {
    if (chord == null || chord.length === 0) {
      return;
    }

    /* 从 staves 列表里找到最后一个 stave */
    var stave = null;
    var specs = [];
    var play_notes = [];
    var accidentals = [];
    var articulations = [];
    var decorators = [];
    var tab_specs = [];
    var durations = [];
    var num_notes = 0;

    var note;
    for(note in chord) {
      if (note.abc !== null) {
        var octave;
        octave = note.octave !== null ? note.octave : note.string;

      }
    }


  }

  addNote = (note) => {
    this.addChord([note]);
  }

  addStave = (element) => {
    /* 默认配置 */
    const {x, y, width, connector_space, options} = this.props;

    var note_stave = new Stave(10, 10, 400);
    note_stave.addClef(options.clef);
    note_stave.addKeySignature(options.key);
    note_stave.addTimeSignature(options.time);

    var tab_stave = new TabStave(10, 100, 400, {num_lines: options.strings});
    tab_stave.addTabGlyph(options.clef);
    tab_stave.setNoteStartX(10);

    /* 修改全局变量 staves */
    var staves = [];

    staves.push({
      tab: tab_stave,
      note: note_stave,
      tab_voices: [],
      note_voices: [],
      note_notes: [],
      text_voices: [],
    })

    return
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

    this.renderNotes();

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
        duration: "w"
      })
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

    this.refs.outer.appendChild(container);
  }


  render() {

    return (
      <div ref="outer"></div>
    )
  }
}

SongPage.defaultProps = {

}
