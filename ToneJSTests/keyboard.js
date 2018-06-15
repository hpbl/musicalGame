let octave = 4;

const keys = [];
let prevKey = 0;

const gravity = 1;

let ball =    (() => { return document.getElementById('ball');   })();
let ball_x =  (() => { return parseInt(ball.getAttribute('cx')); })();
let ball_y =  (() => { return parseInt(ball.getAttribute('cy')); })();
let ball_vx = (() => { return parseInt(ball.getAttribute('vx')); })();
let ball_vy = (() => { return parseInt(ball.getAttribute('vy')); })();

const accelerateBall = () => {
  ball.setAttribute('vy', ball_vy + 1);
}

const updateBallPos = () => {
  var new_ball_x = ball_x + ball_vx
  var new_ball_y = ball_y + ball_vy
  var new_ball_vy = ball_vy + gravity
  ball.setAttribute('cx', new_ball_x)
  ball.setAttribute('cy', new_ball_y)
  ball.setAttribute('vy', new_ball_vy)
}

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
        accelerateBall();
        console.log('onKeyDown' + ball_vy);

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

function update() {
  // console.log('update');
  updateBallPos();

  const fps = 2
  setTimeout(update, (1/fps) * 1000);
}

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
  update();
})();
