/* This is a soundengine with the ToneJS components*/
var synth;
var synthPoly;
var playButton;
var lfo;
var pattern;
var pulse;
class SoundClass {
    constructor() {}

    initTone() {
        Tone.start();

        pulse.start();
        Tone.Transport.start();
      }
      
      initSound() {
        

        //create an autofilter and start it's LFO
        // var autoFilter = new Tone.AutoFilter("4n").toMaster().start();
        //route an oscillator through the filter and start it
        //var oscillator = new Tone.Oscillator().connect(autoFilter).start();
        
        //create a synth and connect it to the master output (your speakers)
        synth = new Tone.MonoSynth({
        "oscillator" : {
            "type" : "sine"
        },
        "envelope" : {
            "attack" : 0.1
        }
        }).toMaster();

        //a polysynth composed of 6 Voices of Synth
        synthPoly = new Tone.PolySynth(4, Tone.FMSynth, {
            oscillator : {
                type : "sine"
            },
            "envelope" : {
            "attack" : 0.1,
            "release": 0.1
            }
        }).toMaster();
        
        //set the attributes using the set interface
        synthPoly.set("detune", -500);
        pulse = new Tone.Loop((time) => {
            console.log(time);
            synth.triggerAttackRelease(440, "4n");
        }, "4n");
      }
}
