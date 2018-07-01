import Tone from 'tone'

import { SampleLibrary } from './tonejs-instruments'

export class Sound {
  constructor () {
    // NProgress.start()

    this.instruments = ['piano-weak']

    this.samples = SampleLibrary.load({
      instruments: this.instruments,
      baseUrl: 'assets/samples/'
    })

    Tone.Buffer.on('load', () => {
      // document.querySelector('#loading').style.display = 'none'
      // document.querySelector('#content').style.display = 'none'
      // NProgress.done()

      // loop through instruments and set release, connect to master output
      for (var property in this.samples) {
        if (this.samples.hasOwnProperty(property)) {
          console.log(this.samples[property])
          this.samples[property].release = 0.5
          this.samples[property].toMaster()
        }
      }

      this.current = this.samples[this.instruments[0]]
      this.current.chain(new Tone.Volume(20), Tone.Master)
    })

    Tone.Buffer.on('error', function (e) {
      document.querySelector('#loading').innerHTML = 'I\'m sorry, there has been an error loading the samples. This demo works best on on the most up-to-date version of Chrome.'
    })

    this.scales = [
      'AMinor', 'AMajor',
      'BbMinor', 'BbMajor',
      'BMinor', 'BMajor',
      'CMinor', 'CMajor',
      'DbMinor', 'DbMajor',
      'DMinor', 'DMajor',
      'EbMinor', 'EbMajor',
      'EMinor', 'EMajor',
      'FMinor', 'FMajor',
      'GbMinor', 'GbMajor',
      'GMinor', 'GMajor',
      'AbMinor', 'AbMajor'
    ]

    this.allPianoNotes = [
      'Bb0', 'B0',
      'C1', 'Db1', 'D1', 'Eb1', 'E1', 'F1', 'Gb1', 'G1', 'Ab1', 'A1', 'Bb1', 'B1',
      'C2', 'Db2', 'D2', 'Eb2', 'E2', 'F2', 'Gb2', 'G2', 'Ab2', 'A2', 'Bb2', 'B2',
      'C3', 'Db3', 'D3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3',
      'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4',
      'C5', 'Db5', 'D5', 'Eb5', 'E5', 'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5',
      'C6', 'Db6', 'D6', 'Eb6', 'E6', 'F6', 'Gb6', 'G6', 'Ab6', 'A6', 'Bb6', 'B6',
      'C7', 'Db7', 'D7', 'Eb7', 'E7', 'F7', 'Gb7', 'G7', 'Ab7', 'A7', 'Bb7', 'B7',
      'C8'
    ]

    this.allNotes = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab']

    this.fullPianoWeak = {}
    for (var i in this.allNotes) {
      this.fullPianoWeak[this.allNotes[i] + 'Minor'] = this.getNotesFromPiano(this.getScaleNotes(this.allNotes[i], 'Minor'))
      this.fullPianoWeak[this.allNotes[i] + 'Major'] = this.getNotesFromPiano(this.getScaleNotes(this.allNotes[i], 'Major'))
    }
  }

  getScaleNotes (tone, variation) {
    var jumps = {
      'Minor': [2, 1, 2, 2, 1, 2],
      'Major': [2, 2, 1, 2, 2, 2]
    }

    var currIndex = this.allNotes.indexOf(tone)
    var nextCurrIndex
    this.scaleNotes = [this.allNotes[currIndex]]
    for (var i in jumps[variation]) {
      nextCurrIndex = currIndex + jumps[variation][i]
      if (nextCurrIndex - (this.allNotes.length - 1) > 0) {
        currIndex = nextCurrIndex - (this.allNotes.length - 1) - 1
      } else {
        currIndex = nextCurrIndex
      }
      this.scaleNotes.push(this.allNotes[currIndex])
    }

    console.log(tone + ', ' + variation + ', ' + this.scaleNotes)
    return this.scaleNotes
  }

  getNotesFromPiano (scaleNotes) {
    function isInScale (note, scaleNotes) {
      for (var i in scaleNotes) {
        if (note.includes(scaleNotes[i])) {
          if (note[1] === 'b' && scaleNotes[i].length > 1) {
            return true
          } else if (note[1] !== 'b' && scaleNotes[i].length === 1) {
            return true
          }
        }
      }
      return false
    }

    this.scalePianoNotes = []
    for (var i in this.allPianoNotes) {
      if (isInScale(this.allPianoNotes[i], scaleNotes)) {
        this.scalePianoNotes.push(this.allPianoNotes[i])
      }
    }

    return this.scalePianoNotes
  }

  playNote (height, instrument, scale = 'CMajor') {
    var note
    switch (instrument) {
      // case 'saxophone':
      //   note = AminorScale[height]
      //   break

      // case 'guitar-electric':
      //   note = GminorScale[height]
      //   break

      case 'piano-weak':
        note = this.fullPianoWeak[scale][height]
        break
    }
    console.log(note)
    // current.triggerAttack(note)
    this.current.triggerAttackRelease(note, '1')
  }
}
