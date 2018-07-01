/**
* @fileoverview A sample library and quick-loader for tone.js
* 
* @author N.P. Brosowsky (nbrosowsky@gmail.com)
* https://github.com/nbrosowsky/tonejs-instruments
*/

import Tone from 'tone';

export let SampleLibrary = {
    minify: false,
    ext: '.[mp3|ogg]', // use setExt to change the extensions on all files // do not change this variable //
    baseUrl: '/samples/',
    list: ['bass-electric','bassoon','cello','clarinet','contrabass','flute','french-horn','guitar-acoustic','guitar-electric','harmonium','harp','organ','piano','piano-weak','saxophone','trombone','trumpet','tuba','violin','xylophone'],

    setExt: function (newExt) {
        var i
        for (i = 0; i <= this.list.length - 1; i++) {
            for (var property in this[this.list[i]]) {

                this[this.list[i]][property] = this[this.list[i]][property].replace(this.ext, newExt)
            }


        }
        this.ext = newExt;
        return console.log("sample extensions set to " + this.ext)
    },

    load: function (arg) {
        var t, rt, i;
        (arg) ? t = arg: t = {};
        t.instruments = t.instruments || this.list;
        t.baseUrl = t.baseUrl || this.baseUrl;

        // update extensions if arg given
        if (t.ext) {
            if (t.ext != this.ext) {
                this.setExt(t.ext)
            }
            t.ext = this.ext
        }

        rt = {};

        // if an array of instruments is passed...
        if (Array.isArray(t.instruments)) {
            for (i = 0; i <= t.instruments.length - 1; i++) {
                var newT = this[t.instruments[i]];
                //Minimize the number of samples to load
                if (this.minify === true || t.minify === true) {
                    var minBy = 1;
                    if (Object.keys(newT).length >= 17) {
                        minBy = 2
                    }
                    if (Object.keys(newT).length >= 33) {
                        minBy = 4
                    }
                    if (Object.keys(newT).length >= 49) {
                        minBy = 6
                    }

                    var filtered = Object.keys(newT).filter(function (_, i) {
                        return i % minBy != 0;
                    })
                    filtered.forEach(function (f) {
                        delete newT[f]
                    })

                }




                rt[t.instruments[i]] = new Tone.Sampler(
                    newT, {
                        baseUrl: t.baseUrl + t.instruments[i] + "/"
                    }

                )
            }

            console.log(rt)
            return rt

            // if a single instrument name is passed...
        } else {
            newT = this[t.instruments];

            //Minimize the number of samples to load
            if (this.minify === true || t.minify === true) {
                minBy = 1;
                if (Object.keys(newT).length >= 17) {
                    minBy = 2
                }
                if (Object.keys(newT).length >= 33) {
                    minBy = 4
                }
                if (Object.keys(newT).length >= 49) {
                    minBy = 6
                }

                filtered = Object.keys(newT).filter(function (_, i) {
                    return i % minBy != 0;
                })
                filtered.forEach(function (f) {
                    delete newT[f]
                })
            }




            var s = new Tone.Sampler(
                newT, {
                    baseUrl: t.baseUrl + t.instruments + "/"
                }
            )

            return s
        }

    },

    'bass-electric': {
        'A3': 'A3.[mp3|ogg]',
        'C1': 'C1.[mp3|ogg]',
        'C2': 'C2.[mp3|ogg]',
        'C3': 'C3.[mp3|ogg]',
        'C4': 'C4.[mp3|ogg]',
        'D1': 'D1.[mp3|ogg]',
        'D2': 'D2.[mp3|ogg]',
        'D3': 'D3.[mp3|ogg]',
        'D4': 'D4.[mp3|ogg]',
        'E1': 'E1.[mp3|ogg]',
        'E2': 'E2.[mp3|ogg]',
        'E3': 'E3.[mp3|ogg]',
        'E4': 'E4.[mp3|ogg]',
        'G1': 'G1.[mp3|ogg]',
        'G2': 'G2.[mp3|ogg]',
        'G3': 'G3.[mp3|ogg]',
        'G4': 'G4.[mp3|ogg]',
        'A1': 'A1.[mp3|ogg]',
        'A2': 'A2.[mp3|ogg]'

    },

    'bassoon': {
        'A3': 'A3.[mp3|ogg]',
        'C2': 'C2.[mp3|ogg]',
        'C3': 'C3.[mp3|ogg]',
        'C4': 'C4.[mp3|ogg]',
        'E3': 'E3.[mp3|ogg]',
        'G1': 'G1.[mp3|ogg]',
        'G2': 'G2.[mp3|ogg]',
        'G3': 'G3.[mp3|ogg]',
        'A1': 'A1.[mp3|ogg]',
        'A2': 'A2.[mp3|ogg]'

    },

    'cello': {
        'E3': 'E3.[mp3|ogg]',
        'E4': 'E4.[mp3|ogg]',
        'F2': 'F2.[mp3|ogg]',
        'F3': 'F3.[mp3|ogg]',
        'F4': 'F4.[mp3|ogg]',
        'F#2': 'Fs2.[mp3|ogg]',
        'F#3': 'Fs3.[mp3|ogg]',
        'F#4': 'Fs4.[mp3|ogg]',
        'G2': 'G2.[mp3|ogg]',
        'G3': 'G3.[mp3|ogg]',
        'G4': 'G4.[mp3|ogg]',
        'G#2': 'Gs2.[mp3|ogg]',
        'G#3': 'Gs3.[mp3|ogg]',
        'G#4': 'Gs4.[mp3|ogg]',
        'A2': 'A2.[mp3|ogg]',
        'A3': 'A3.[mp3|ogg]',
        'A#2': 'As2.[mp3|ogg]',
        'A#3': 'As3.[mp3|ogg]',
        'B2': 'B2.[mp3|ogg]',
        'B3': 'B3.[mp3|ogg]',
        'C2': 'C2.[mp3|ogg]',
        'C3': 'C3.[mp3|ogg]',
        'C4': 'C4.[mp3|ogg]',
        'C#2': 'Cs2.[mp3|ogg]',
        'C#3': 'Cs3.[mp3|ogg]',
        'C#4': 'Cs4.[mp3|ogg]',
        'D2': 'D2.[mp3|ogg]',
        'D3': 'D3.[mp3|ogg]',
        'D4': 'D4.[mp3|ogg]',
        'D#2': 'Ds2.[mp3|ogg]',
        'D#3': 'Ds3.[mp3|ogg]',
        'D#4': 'Ds4.[mp3|ogg]',
        'E2': 'E2.[mp3|ogg]'

    },

    'clarinet': {
        'D3': 'D3.[mp3|ogg]',
        'D4': 'D4.[mp3|ogg]',
        'D5': 'D5.[mp3|ogg]',
        'F2': 'F2.[mp3|ogg]',
        'F3': 'F3.[mp3|ogg]',
        'F4': 'F4.[mp3|ogg]',
        'F#5': 'Fs5.[mp3|ogg]',
        'A#2': 'As2.[mp3|ogg]',
        'A#3': 'As3.[mp3|ogg]',
        'A#4': 'As4.[mp3|ogg]',
        'D2': 'D2.[mp3|ogg]'

    },

    'contrabass': {
        'C1': 'C1.[mp3|ogg]',
        'C#2': 'Cs2.[mp3|ogg]',
        'D1': 'D1.[mp3|ogg]',
        'E1': 'E1.[mp3|ogg]',
        'E2': 'E2.[mp3|ogg]',
        'F#0': 'Fs0.[mp3|ogg]',
        'F#1': 'Fs1.[mp3|ogg]',
        'G0': 'G0.[mp3|ogg]',
        'G#1': 'Gs1.[mp3|ogg]',
        'G#2': 'Gs2.[mp3|ogg]',
        'A1': 'A1.[mp3|ogg]',
        'A#0': 'As0.[mp3|ogg]',
        'B2': 'B2.[mp3|ogg]'

    },

    'flute': {
        'A5': 'A5.[mp3|ogg]',
        'C3': 'C3.[mp3|ogg]',
        'C4': 'C4.[mp3|ogg]',
        'C5': 'C5.[mp3|ogg]',
        'C6': 'C6.[mp3|ogg]',
        'E3': 'E3.[mp3|ogg]',
        'E4': 'E4.[mp3|ogg]',
        'E5': 'E5.[mp3|ogg]',
        'A3': 'A3.[mp3|ogg]',
        'A4': 'A4.[mp3|ogg]'

    },

    'french-horn': {
        'D2': 'D2.[mp3|ogg]',
        'D4': 'D4.[mp3|ogg]',
        'D#1': 'Ds1.[mp3|ogg]',
        'F2': 'F2.[mp3|ogg]',
        'F4': 'F4.[mp3|ogg]',
        'G1': 'G1.[mp3|ogg]',
        'A0': 'A0.[mp3|ogg]',
        'A2': 'A2.[mp3|ogg]',
        'C1': 'C1.[mp3|ogg]',
        'C3': 'C3.[mp3|ogg]',

    },

    'guitar-acoustic': {
        'F3': 'F3.[mp3|ogg]',
        'F#1': 'Fs1.[mp3|ogg]',
        'F#2': 'Fs2.[mp3|ogg]',
        'F#3': 'Fs3.[mp3|ogg]',
        'G1': 'G1.[mp3|ogg]',
        'G2': 'G2.[mp3|ogg]',
        'G3': 'G3.[mp3|ogg]',
        'G#1': 'Gs1.[mp3|ogg]',
        'G#2': 'Gs2.[mp3|ogg]',
        'G#3': 'Gs3.[mp3|ogg]',
        'A1': 'A1.[mp3|ogg]',
        'A2': 'A2.[mp3|ogg]',
        'A3': 'A3.[mp3|ogg]',
        'A#1': 'As1.[mp3|ogg]',
        'A#2': 'As2.[mp3|ogg]',
        'A#3': 'As3.[mp3|ogg]',
        'B1': 'B1.[mp3|ogg]',
        'B2': 'B2.[mp3|ogg]',
        'B3': 'B3.[mp3|ogg]',
        'C2': 'C2.[mp3|ogg]',
        'C3': 'C3.[mp3|ogg]',
        'C4': 'C4.[mp3|ogg]',
        'C#2': 'Cs2.[mp3|ogg]',
        'C#3': 'Cs3.[mp3|ogg]',
        'C#4': 'Cs4.[mp3|ogg]',
        'D1': 'D1.[mp3|ogg]',
        'D2': 'D2.[mp3|ogg]',
        'D3': 'D3.[mp3|ogg]',
        'D4': 'D4.[mp3|ogg]',
        'D#1': 'Ds1.[mp3|ogg]',
        'D#2': 'Ds2.[mp3|ogg]',
        'D#3': 'Ds3.[mp3|ogg]',
        'E1': 'E1.[mp3|ogg]',
        'E2': 'E2.[mp3|ogg]',
        'E3': 'E3.[mp3|ogg]',
        'F1': 'F1.[mp3|ogg]',
        'F2': 'F2.[mp3|ogg]'

    },


    'guitar-electric': {
        'D4': 'D4.[mp3|ogg]',
        'D#1': 'Ds1.[mp3|ogg]',
        'D#2': 'Ds2.[mp3|ogg]',
        'D#3': 'Ds3.[mp3|ogg]',
        'D#4': 'Ds4.[mp3|ogg]',
        'E1': 'E1.[mp3|ogg]',
        'E2': 'E2.[mp3|ogg]',
        'E3': 'E3.[mp3|ogg]',
        'E4': 'E4.[mp3|ogg]',
        'F1': 'F1.[mp3|ogg]',
        'F2': 'F2.[mp3|ogg]',
        'F3': 'F3.[mp3|ogg]',
        'F#1': 'Fs1.[mp3|ogg]',
        'F#2': 'Fs2.[mp3|ogg]',
        'F#3': 'Fs3.[mp3|ogg]',
        'G1': 'G1.[mp3|ogg]',
        'G2': 'G2.[mp3|ogg]',
        'G3': 'G3.[mp3|ogg]',
        'G#1': 'Gs1.[mp3|ogg]',
        'G#2': 'Gs2.[mp3|ogg]',
        'G#3': 'Gs3.[mp3|ogg]',
        'A1': 'A1.[mp3|ogg]',
        'A2': 'A2.[mp3|ogg]',
        'A3': 'A3.[mp3|ogg]',
        'A#1': 'As1.[mp3|ogg]',
        'A#2': 'As2.[mp3|ogg]',
        'A#3': 'As3.[mp3|ogg]',
        'B1': 'B1.[mp3|ogg]',
        'B2': 'B2.[mp3|ogg]',
        'B3': 'B3.[mp3|ogg]',
        'C2': 'C2.[mp3|ogg]',
        'C3': 'C3.[mp3|ogg]',
        'C4': 'C4.[mp3|ogg]',
        'C#2': 'Cs2.[mp3|ogg]',
        'C#3': 'Cs3.[mp3|ogg]',
        'C#4': 'Cs4.[mp3|ogg]',
        'D1': 'D1.[mp3|ogg]'
    },

    'harmonium': {
        'C1': 'C1.[mp3|ogg]',
        'C2': 'C2.[mp3|ogg]',
        'C3': 'C3.[mp3|ogg]',
        'C4': 'C4.[mp3|ogg]',
        'D#0': 'Ds0.[mp3|ogg]',
        'D#1': 'Ds1.[mp3|ogg]',
        'D#2': 'Ds2.[mp3|ogg]',
        'D#3': 'Ds3.[mp3|ogg]',
        'F#1': 'Fs1.[mp3|ogg]',
        'F#2': 'Fs2.[mp3|ogg]',
        'F#3': 'Fs3.[mp3|ogg]',
        'F#4': 'Fs4.[mp3|ogg]',
        'A0': 'A0.[mp3|ogg]',
        'A1': 'A1.[mp3|ogg]',
        'A2': 'A2.[mp3|ogg]',
        'A3': 'A3.[mp3|ogg]',
        'A4': 'A4.[mp3|ogg]',
        'C0': 'C0.[mp3|ogg]'

    },

    'harp': {
        'C5': 'C5.[mp3|ogg]',
        'D2': 'D2.[mp3|ogg]',
        'D4': 'D4.[mp3|ogg]',
        'D6': 'D6.[mp3|ogg]',
        'D7': 'D7.[mp3|ogg]',
        'E1': 'E1.[mp3|ogg]',
        'E3': 'E3.[mp3|ogg]',
        'E5': 'E5.[mp3|ogg]',
        'F2': 'F2.[mp3|ogg]',
        'F4': 'F4.[mp3|ogg]',
        'F6': 'F6.[mp3|ogg]',
        'F7': 'F7.[mp3|ogg]',
        'G1': 'G1.[mp3|ogg]',
        'G3': 'G3.[mp3|ogg]',
        'G5': 'G5.[mp3|ogg]',
        'A2': 'A2.[mp3|ogg]',
        'A4': 'A4.[mp3|ogg]',
        'A6': 'A6.[mp3|ogg]',
        'B1': 'B1.[mp3|ogg]',
        'B3': 'B3.[mp3|ogg]',
        'B5': 'B5.[mp3|ogg]',
        'B6': 'B6.[mp3|ogg]',
        'C3': 'C3.[mp3|ogg]'

    },

    'organ': {
        'C3': 'C3.[mp3|ogg]',
        'C4': 'C4.[mp3|ogg]',
        'C5': 'C5.[mp3|ogg]',
        'C6': 'C6.[mp3|ogg]',
        'D#1': 'Ds1.[mp3|ogg]',
        'D#2': 'Ds2.[mp3|ogg]',
        'D#3': 'Ds3.[mp3|ogg]',
        'D#4': 'Ds4.[mp3|ogg]',
        'D#5': 'Ds5.[mp3|ogg]',
        'F#1': 'Fs1.[mp3|ogg]',
        'F#2': 'Fs2.[mp3|ogg]',
        'F#3': 'Fs3.[mp3|ogg]',
        'F#4': 'Fs4.[mp3|ogg]',
        'F#5': 'Fs5.[mp3|ogg]',
        'A1': 'A1.[mp3|ogg]',
        'A2': 'A2.[mp3|ogg]',
        'A3': 'A3.[mp3|ogg]',
        'A4': 'A4.[mp3|ogg]',
        'A5': 'A5.[mp3|ogg]',
        'C1': 'C1.[mp3|ogg]',
        'C2': 'C2.[mp3|ogg]'
    },

    'piano': {
        'A0': 'A0.[mp3|ogg]',
        'A1': 'A1.[mp3|ogg]',
        'A2': 'A2.[mp3|ogg]',
        'A3': 'A3.[mp3|ogg]',
        'A4': 'A4.[mp3|ogg]',
        'A5': 'A5.[mp3|ogg]',
        'A6': 'A6.[mp3|ogg]',
        'A#0': 'As0.[mp3|ogg]',
        'A#1': 'As1.[mp3|ogg]',
        'A#2': 'As2.[mp3|ogg]',
        'A#3': 'As3.[mp3|ogg]',
        'A#4': 'As4.[mp3|ogg]',
        'A#5': 'As5.[mp3|ogg]',
        'A#6': 'As6.[mp3|ogg]',
        'B0': 'B0.[mp3|ogg]',
        'B1': 'B1.[mp3|ogg]',
        'B2': 'B2.[mp3|ogg]',
        'B3': 'B3.[mp3|ogg]',
        'B4': 'B4.[mp3|ogg]',
        'B5': 'B5.[mp3|ogg]',
        'B6': 'B6.[mp3|ogg]',
        'C0': 'C0.[mp3|ogg]',
        'C1': 'C1.[mp3|ogg]',
        'C2': 'C2.[mp3|ogg]',
        'C3': 'C3.[mp3|ogg]',
        'C4': 'C4.[mp3|ogg]',
        'C5': 'C5.[mp3|ogg]',
        'C6': 'C6.[mp3|ogg]',
        'C7': 'C7.[mp3|ogg]',
        'C#0': 'Cs0.[mp3|ogg]',
        'C#1': 'Cs1.[mp3|ogg]',
        'C#2': 'Cs2.[mp3|ogg]',
        'C#3': 'Cs3.[mp3|ogg]',
        'C#4': 'Cs4.[mp3|ogg]',
        'C#5': 'Cs5.[mp3|ogg]',
        'C#6': 'Cs6.[mp3|ogg]',
        'D0': 'D0.[mp3|ogg]',
        'D1': 'D1.[mp3|ogg]',
        'D2': 'D2.[mp3|ogg]',
        'D3': 'D3.[mp3|ogg]',
        'D4': 'D4.[mp3|ogg]',
        'D5': 'D5.[mp3|ogg]',
        'D6': 'D6.[mp3|ogg]',
        'D#0': 'Ds0.[mp3|ogg]',
        'D#1': 'Ds1.[mp3|ogg]',
        'D#2': 'Ds2.[mp3|ogg]',
        'D#3': 'Ds3.[mp3|ogg]',
        'D#4': 'Ds4.[mp3|ogg]',
        'D#5': 'Ds5.[mp3|ogg]',
        'D#6': 'Ds6.[mp3|ogg]',
        'E0': 'E0.[mp3|ogg]',
        'E1': 'E1.[mp3|ogg]',
        'E2': 'E2.[mp3|ogg]',
        'E3': 'E3.[mp3|ogg]',
        'E4': 'E4.[mp3|ogg]',
        'E5': 'E5.[mp3|ogg]',
        'E6': 'E6.[mp3|ogg]',
        'F0': 'F0.[mp3|ogg]',
        'F1': 'F1.[mp3|ogg]',
        'F2': 'F2.[mp3|ogg]',
        'F3': 'F3.[mp3|ogg]',
        'F4': 'F4.[mp3|ogg]',
        'F5': 'F5.[mp3|ogg]',
        'F6': 'F6.[mp3|ogg]',
        'F#0': 'Fs0.[mp3|ogg]',
        'F#1': 'Fs1.[mp3|ogg]',
        'F#2': 'Fs2.[mp3|ogg]',
        'F#3': 'Fs3.[mp3|ogg]',
        'F#4': 'Fs4.[mp3|ogg]',
        'F#5': 'Fs5.[mp3|ogg]',
        'F#6': 'Fs6.[mp3|ogg]',
        'G0': 'G0.[mp3|ogg]',
        'G1': 'G1.[mp3|ogg]',
        'G2': 'G2.[mp3|ogg]',
        'G3': 'G3.[mp3|ogg]',
        'G4': 'G4.[mp3|ogg]',
        'G5': 'G5.[mp3|ogg]',
        'G6': 'G6.[mp3|ogg]',
        'G#0': 'Gs0.[mp3|ogg]',
        'G#1': 'Gs1.[mp3|ogg]',
        'G#2': 'Gs2.[mp3|ogg]',
        'G#3': 'Gs3.[mp3|ogg]',
        'G#4': 'Gs4.[mp3|ogg]',
        'G#5': 'Gs5.[mp3|ogg]',
        'G#6': 'Gs6.[mp3|ogg]',
    },

    // 'piano-weak': {
    //     'A1': 'A1.mp3'
    // },

    'piano-weak': {
        'A1': 'A1.mp3',
        'A2': 'A2.mp3',
        'A3': 'A3.mp3',
        'A4': 'A4.mp3',
        'A5': 'A5.mp3',
        'A6': 'A6.mp3',
        'A7': 'A7.mp3',
        'Bb0': 'Bb0.mp3',
        'Bb1': 'Bb1.mp3',
        'Bb2': 'Bb2.mp3',
        'Bb3': 'Bb3.mp3',
        'Bb4': 'Bb4.mp3',
        'Bb5': 'Bb5.mp3',
        'Bb6': 'Bb6.mp3',
        'Bb7': 'Bb7.mp3',
        'B0': 'B0.mp3',
        'B1': 'B1.mp3',
        'B2': 'B2.mp3',
        'B3': 'B3.mp3',
        'B4': 'B4.mp3',
        'B5': 'B5.mp3',
        'B6': 'B6.mp3',
        'B7': 'B7.mp3',
        'C1': 'C1.mp3',
        'C2': 'C2.mp3',
        'C3': 'C3.mp3',
        'C4': 'C4.mp3',
        'C5': 'C5.mp3',
        'C6': 'C6.mp3',
        'C7': 'C7.mp3',
        'Db1': 'Db1.mp3',
        'Db2': 'Db2.mp3',
        'Db3': 'Db3.mp3',
        'Db4': 'Db4.mp3',
        'Db5': 'Db5.mp3',
        'Db6': 'Db6.mp3',
        'Db7': 'Db7.mp3',
        'D1': 'D1.mp3',
        'D2': 'D2.mp3',
        'D3': 'D3.mp3',
        'D4': 'D4.mp3',
        'D5': 'D5.mp3',
        'D6': 'D6.mp3',
        'D7': 'D7.mp3',
        'Eb1': 'Eb1.mp3',
        'Eb2': 'Eb2.mp3',
        'Eb3': 'Eb3.mp3',
        'Eb4': 'Eb4.mp3',
        'Eb5': 'Eb5.mp3',
        'Eb6': 'Eb6.mp3',
        'Eb7': 'Eb7.mp3',
        'E1': 'E1.mp3',
        'E2': 'E2.mp3',
        'E3': 'E3.mp3',
        'E4': 'E4.mp3',
        'E5': 'E5.mp3',
        'E6': 'E6.mp3',
        'E7': 'E7.mp3',
        'F1': 'F1.mp3',
        'F2': 'F2.mp3',
        'F3': 'F3.mp3',
        'F4': 'F4.mp3',
        'F5': 'F5.mp3',
        'F6': 'F6.mp3',
        'F7': 'F7.mp3',
        'Gb1': 'Gb1.mp3',
        'Gb2': 'Gb2.mp3',
        'Gb3': 'Gb3.mp3',
        'Gb4': 'Gb4.mp3',
        'Gb5': 'Gb5.mp3',
        'Gb6': 'Gb6.mp3',
        'Gb7': 'Gb7.mp3',
        'G1': 'G1.mp3',
        'G2': 'G2.mp3',
        'G3': 'G3.mp3',
        'G4': 'G4.mp3',
        'G5': 'G5.mp3',
        'G6': 'G6.mp3',
        'G7': 'G7.mp3',
        'Ab1': 'Ab1.mp3',
        'Ab2': 'Ab2.mp3',
        'Ab3': 'Ab3.mp3',
        'Ab4': 'Ab4.mp3',
        'Ab5': 'Ab5.mp3',
        'Ab6': 'Ab6.mp3',
        'Ab7': 'Ab7.mp3'
    },

    'saxophone': {
        'D#4': 'Ds4.[mp3|ogg]',
        'E2': 'E2.[mp3|ogg]',
        'E3': 'E3.[mp3|ogg]',
        'E4': 'E4.[mp3|ogg]',
        'F2': 'F2.[mp3|ogg]',
        'F3': 'F3.[mp3|ogg]',
        'F4': 'F4.[mp3|ogg]',
        'F#2': 'Fs2.[mp3|ogg]',
        'F#3': 'Fs3.[mp3|ogg]',
        'F#4': 'Fs4.[mp3|ogg]',
        'G2': 'G2.[mp3|ogg]',
        'G3': 'G3.[mp3|ogg]',
        'G4': 'G4.[mp3|ogg]',
        'G#2': 'Gs2.[mp3|ogg]',
        'G#3': 'Gs3.[mp3|ogg]',
        'G#4': 'Gs4.[mp3|ogg]',
        'A3': 'A3.[mp3|ogg]',
        'A4': 'A4.[mp3|ogg]',
        'A#2': 'As2.[mp3|ogg]',
        'A#3': 'As3.[mp3|ogg]',
        'B2': 'B2.[mp3|ogg]',
        'B3': 'B3.[mp3|ogg]',
        'C3': 'C3.[mp3|ogg]',
        'C4': 'C4.[mp3|ogg]',
        'C#2': 'Cs2.[mp3|ogg]',
        'C#3': 'Cs3.[mp3|ogg]',
        'C#4': 'Cs4.[mp3|ogg]',
        'D2': 'D2.[mp3|ogg]',
        'D3': 'D3.[mp3|ogg]',
        'D4': 'D4.[mp3|ogg]',
        'D#2': 'Ds2.[mp3|ogg]',
        'D#3': 'Ds3.[mp3|ogg]'

    },

    'trombone': {
        'A#2': 'As2.[mp3|ogg]',
        'C2': 'C2.[mp3|ogg]',
        'C3': 'C3.[mp3|ogg]',
        'C#1': 'Cs1.[mp3|ogg]',
        'C#3': 'Cs3.[mp3|ogg]',
        'D2': 'D2.[mp3|ogg]',
        'D3': 'D3.[mp3|ogg]',
        'D#1': 'Ds1.[mp3|ogg]',
        'D#2': 'Ds2.[mp3|ogg]',
        'D#3': 'Ds3.[mp3|ogg]',
        'F1': 'F1.[mp3|ogg]',
        'F2': 'F2.[mp3|ogg]',
        'F3': 'F3.[mp3|ogg]',
        'G#1': 'Gs1.[mp3|ogg]',
        'G#2': 'Gs2.[mp3|ogg]',
        'A#0': 'As0.[mp3|ogg]',
        'A#1': 'As1.[mp3|ogg]'

    },

    'trumpet': {
        'C5': 'C5.[mp3|ogg]',
        'D4': 'D4.[mp3|ogg]',
        'D#3': 'Ds3.[mp3|ogg]',
        'F2': 'F2.[mp3|ogg]',
        'F3': 'F3.[mp3|ogg]',
        'F4': 'F4.[mp3|ogg]',
        'G3': 'G3.[mp3|ogg]',
        'A2': 'A2.[mp3|ogg]',
        'A4': 'A4.[mp3|ogg]',
        'A#3': 'As3.[mp3|ogg]',
        'C3': 'C3.[mp3|ogg]'

    },

    'tuba': {
        'A#1': 'As1.[mp3|ogg]',
        'A#2': 'As2.[mp3|ogg]',
        'D2': 'D2.[mp3|ogg]',
        'D3': 'D3.[mp3|ogg]',
        'D#1': 'Ds1.[mp3|ogg]',
        'F0': 'F0.[mp3|ogg]',
        'F1': 'F1.[mp3|ogg]',
        'F2': 'F2.[mp3|ogg]',
        'A#0': 'As0.[mp3|ogg]'

    },

    'violin': {
        'C#1': 'Cs1.[mp3|ogg]',
        'D#1': 'Ds1.[mp3|ogg]',
        'F1': 'F1.[mp3|ogg]',
        'G1': 'G1.[mp3|ogg]',
        'A1': 'A1.[mp3|ogg]',
        'B1': 'B1.[mp3|ogg]',
        'C#2': 'Cs2.[mp3|ogg]',
        'D#2': 'Ds2.[mp3|ogg]',
        'F2': 'F2.[mp3|ogg]',
        'G2': 'G2.[mp3|ogg]',
        'A2': 'A2.[mp3|ogg]',
        'C#3': 'Cs3.[mp3|ogg]',
        'D#3': 'Ds3.[mp3|ogg]',
        'F3': 'F3.[mp3|ogg]',
        'G3': 'G3.[mp3|ogg]',
        'A3': 'A3.[mp3|ogg]',
        'B3': 'B3.[mp3|ogg]',
        'C#4': 'Cs4.[mp3|ogg]',
        'D#4': 'Ds4.[mp3|ogg]',
        'G4': 'G4.[mp3|ogg]'

    },

    'xylophone': {
        'C7': 'C7.[mp3|ogg]',
        'G3': 'G3.[mp3|ogg]',
        'G4': 'G4.[mp3|ogg]',
        'G5': 'G5.[mp3|ogg]',
        'G6': 'G6.[mp3|ogg]',
        'C4': 'C4.[mp3|ogg]',
        'C5': 'C5.[mp3|ogg]',
        'C6': 'C6.[mp3|ogg]'

    }


}