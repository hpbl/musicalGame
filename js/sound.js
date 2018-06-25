NProgress.start();
// load samples / choose 4 random instruments from the list //
//chooseFour = ['piano', 'bass-electric', 'bassoon', 'cello', 'clarinet', 'contrabass', 'flute', 'french-horn', 'guitar-acoustic', 'guitar-electric', 'harmonium', 'harp', 'organ', 'saxophone', 'trombone', 'trumpet', 'tuba', 'violin', 'xylophone']
instruments = ['saxophone', 'guitar-electric', 'piano-weak'];

var samples = SampleLibrary.load({
    instruments: instruments,
    baseUrl: "/resources/samples/"
});

var current
// show keyboard on load //
Tone.Buffer.on('load', function() {
    document.querySelector("#loading").style.display = 'none';
    document.querySelector("#content").style.display = 'none';
    NProgress.done();

    // loop through instruments and set release, connect to master output
    for (var property in samples) {
        if (samples.hasOwnProperty(property)) {
            console.log(samples[property])
            samples[property].release = .5;
            samples[property].toMaster();
        }
    }

    current = samples[instruments[2]];

    startGame()
})


// show error message on loading error //
Tone.Buffer.on('error', function() {
    document.querySelector("#loading").innerHTML = "I'm sorry, there has been an error loading the samples. This demo works best on on the most up-to-date version of Chrome.";
})

// Listener
// document.body.onkeyup = function(e){
//     if (e.keyCode === 32 || e.key === ' ') {
//         console.log("pressedSpace");
//         playNote(1)
//     }
// }

// Am scale
// Lá, Si, Dó, Ré, Mi, Fá, Sol, Lá
var AminorScale = [
  'A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'A4'
];

// Gm scale
// Sol, Lá, Si♭, Dó, Ré, Mi♭, Fá, Sol
var GminorScale = [
    'G2', 'A2', 'A#2', 'C2', 'D1', 'D#2', 'F2', 'G2'
];

var fullPianoWeak = [
    // 'Bb0', 'B0',
    // 'C1', 'Db1', 'D1', 'Eb1', 'E1', 'F1', 'Gb1', 'G1', 'Ab1', 'A1', 'Bb1', 'B1',
    'C2', 'Db2', 'D2', 'Eb2', 'E2', 'F2', 'Gb2', 'G2', 'Ab2', 'A2', 'Bb2', 'B2',
    'C3', 'Db3', 'D3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3',
    'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4',
    'C5', 'Db5', 'D5', 'Eb5', 'E5', 'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5',
    // 'C6', 'Db6', 'D6', 'Eb6', 'E6', 'F6', 'Gb6', 'G6', 'Ab6', 'A6', 'Bb6', 'B6',
    // 'C7', 'Db7', 'D7', 'Eb7', 'E7', 'F7', 'Gb7', 'G7', 'Ab7', 'A7', 'Bb7', 'B7',
    // 'C8'
]

function playNote(height, instrument) {
    var note;
    switch (instrument) {
        case 'saxophone':
            note = AminorScale[height];
            break;

        case 'guitar-electric':
            note = GminorScale[height];
            break;

        case 'piano-weak':
            note = fullPianoWeak[height];
            break;
    }
    console.log(note);
    // current.triggerAttack(note);
    current.triggerAttackRelease(note, "0.6")
}

