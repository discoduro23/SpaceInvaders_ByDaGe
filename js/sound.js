//Sound JS
//Path: js\sound.js

let isSoundBGTone = true;
let toneIterator = 0;

class sound {
    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }
    play() {
        this.sound.play();
    }
    stop() {
        this.sound.pause();
    }
    volume(vol) {
        this.sound.volume = vol;
    }
}

