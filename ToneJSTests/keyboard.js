let octave = 4;

const keys = [];
let prevKey = 0;


const notes = [
  'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'
];

// const Instruments = {
//   // https://github.com/stuartmemo/qwerty-hancock
//   keyboard: {
//     // Lower octave.
//     a: 'Cl',
//     b: 'C#l',
//     s: 'Dl',
//     e: 'D#l',
//     d: 'El',
//     f: 'Fl',
//     t: 'F#l',
//     g: 'Gl',
//     y: 'G#l',
//     h: 'Al',
//     u: 'A#l',
//     j: 'Bl',
//     // Upper octave.
//     k: 'Cu',
//     o: 'C#u',
//     l: 'Du',
//     p: 'D#u',
//     ';': 'Eu',
//     "'": 'Fu',
//     ']': 'F#u',
//     '\\': 'Gu',
//   },
// };

// let instrument = Instruments.keyboard;

const heightToNote = height => {
  const note = notes[ height ];

  return Tone.Frequency(
    note
      // .replace( 'l', octave )
      // .replace( 'u', octave + 1 )
  ).toNote();
};

const onKeyDown = (() => {
  let listener;

  return synth => {
    document.removeEventListener( 'keydown', listener );

    listener = event => {
      const { key } = event;

      // Only trigger once per keydown event.
      if ( !keys[ key ] ) {
        keys[ key ] = true;

        // TODO: get height here
        let height = 1
        const note = heightToNote( height );
        if ( note ) {
          synth.triggerAttack( note );
          prevKey = key;
        }
      }
    };

    document.addEventListener( 'keydown', listener );
  };
})();

const onKeyUp = (() => {
  let listener;
  let prev;

  return synth => {
    // Clean-up.
    if ( prev ) {
      prev.triggerRelease();
    }

    document.removeEventListener( 'keyup', listener );

    prev = synth;
    listener = event => {
      const { key } = event;
      if ( keys[ key ] ) {
        keys[ key ] = false;

        // TODO:
        // const note = heightToNote( 1 );
        if ( synth instanceof Tone.PolySynth ) {
          synth.triggerRelease( notes );
        } else if ( note && key === prevKey ) {
          // Trigger release if this is the previous note played.
          synth.triggerRelease();
        }
      }
    };

    document.addEventListener( 'keyup', listener );
  };
})();

// Octave controls.
document.addEventListener( 'keydown', event => {
  // Decrease octave range (min: 0).
  if ( event.key === 'z' ) { octave = Math.max( octave - 1, 0 ); }
  // Increase octave range (max: 10).
  if ( event.key === 'x' ) { octave = Math.min( octave + 1, 9 ); }
});

// Init.
(() => {
  const synth = new Tone.PolySynth( 10 );
  synth.toMaster();

  onKeyDown( synth );
  onKeyUp( synth );
})();

