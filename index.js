const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

var container = document.querySelector('.text');

//screen size
canvas.width = 523;
canvas.height = 703;

ctx.fillStyle = 'white';

const parkerImg = new Image();
parkerImg.src = './img/parker.png'; //referencing image of the parker

//background
const bgImg = new Image();
bgImg.src = './img/space_station.jpg'; //referencing background image
bgImg.onload = () => {
    ctx.drawImage(bgImg, 0,0); //position of image
    ctx.drawImage(parkerImg, 55, 50);
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "black";
    ctx.rect(-1,514,525,200);
    ctx.fillStyle='white';
    ctx.fillRect(-1,514,525,200);
    ctx.stroke();
};


var speeds = {
    pause: 500,
    slow: 150,
    normal: 100,
};

var textLines = [
        { string: "Hey queens! ", speed: speeds.slow},
        { string: "we need to discover more about the sun. ", speed: speeds.normal},
        { string: "The plan? ", speed: speeds.slow},
        { string: "We finna create a probe that can withstand the heat of the sun and the treacherous journey it will take. ", speed: speeds.normal},
        { string: "We got this fam.", speed: speeds.slow}
];

var characters = [];

textLines.forEach((line, index) => {
        line.string.split("").forEach((character) => {
            var span = document.createElement("span");
            span.textContent = character;
                container.appendChild(span);
                characters.push({
                    span: span,
                    isSpace: character === " " && !line.pause,
                    delayAfter: line.speed,
                    classes: line.classes || []
                });
        });
});

function revealOneCharacter(list) {
    var next = list.splice(0, 1)[0];
    next.span.classList.add("revealed");
    next.classes.forEach((c) => {
        next.span.classList.add(c);
    });

    var delay = next.isSpace && !next.pause ? 0 : next.delayAfter;

    if(list.length > 0){
        setTimeout(function() {
            revealOneCharacter(list);
        }, delay)
    }
}

setTimeout(() => {
    revealOneCharacter(characters);
}, 600)

function confirmFunction(){
    if(window.confirm("Big L. We must complete the puzzle of the Parker Solar Probe to prepare for the takeoff to the sun!")){
        window.location.href='https://c1phan.github.io/slide_game/';
    }
    else{
        window.location.href='https://c1phan.github.io/dialogue1/'
    }
}

