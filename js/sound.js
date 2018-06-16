NProgress.start();
// load samples / choose 4 random instruments from the list //
//chooseFour = ['piano', 'bass-electric', 'bassoon', 'cello', 'clarinet', 'contrabass', 'flute', 'french-horn', 'guitar-acoustic', 'guitar-electric', 'harmonium', 'harp', 'organ', 'saxophone', 'trombone', 'trumpet', 'tuba', 'violin', 'xylophone']
instruments = ['saxophone'];

var samples = SampleLibrary.load({
    instruments: instruments,
    baseUrl: "/flappy/sax/samples/"
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

    current = samples[instruments[0]];

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
var notes = [
  'A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'A4'
];

function playNote(height) {
    var note = notes[height];
    console.log(note);
    // current.triggerAttack(note);
    current.triggerAttackRelease(note, "0.3")
}

