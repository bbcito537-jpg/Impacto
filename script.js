/* ================================================= */
/* ELEMENTOS */
/* ================================================= */

const bondScene =
    document.getElementById("bondScene");

const lilyScene =
    document.getElementById("lilyScene");

const waterScene =
    document.getElementById("waterScene");

const skyScene =
    document.getElementById("skyScene");

const finalScene =
    document.getElementById("finalScene");


const bondArea =
    document.getElementById("bondArea");

const orbA =
    document.getElementById("orbA");

const orbB =
    document.getElementById("orbB");

const bondDNA =
    document.getElementById("bondDNA");

const dnaWaveOne =
    document.getElementById("dnaWaveOne");

const dnaWaveTwo =
    document.getElementById("dnaWaveTwo");

const dnaRungs =
    document.getElementById("dnaRungs");

const bondText =
    document.getElementById("bondText");

const bondHint =
    document.getElementById("bondHint");


const guideOrb =
    document.getElementById("guideOrb");

const guideRipple =
    document.getElementById("guideRipple");


const lilies =
    Array.from(
        document.querySelectorAll(".garden-lily")
    );

const lilyParticles =
    document.getElementById("lilyParticles");

const lilyMeaning =
    document.getElementById("lilyMeaning");

const nextSceneButton =
    document.getElementById("nextSceneButton");


const waterWaitingText =
    document.getElementById("waterWaitingText");

const pond =
    document.getElementById("pond");

const pondInteraction =
    document.getElementById("pondInteraction");

const waterInstruction =
    document.getElementById("waterInstruction");

const waterMeaning =
    document.getElementById("waterMeaning");

const continueFromWater =
    document.getElementById("continueFromWater");


const skyWaitingText =
    document.getElementById("skyWaitingText");

const skyInstruction =
    document.getElementById("skyInstruction");

const skyInstructionTitle =
    document.getElementById("skyInstructionTitle");

const skyInstructionText =
    document.getElementById("skyInstructionText");

const starField =
    document.getElementById("starField");

const starChoices =
    Array.from(
        document.querySelectorAll(".star-choice")
    );

const skyMeaning =
    document.getElementById("skyMeaning");


const constellationLines = {
    "1": document.getElementById("line1"),
    "2": document.getElementById("line2"),
    "3": document.getElementById("line3"),
    "4": document.getElementById("line4")
};


const turtleConstellation =
    document.getElementById("turtleConstellation");

const turtleStars =
    Array.from(
        document.querySelectorAll(".turtle-star")
    );

const turtleLines =
    Array.from(
        document.querySelectorAll(".turtle-line")
    );


const finalMoon =
    document.getElementById("finalMoon");

const finalReflectionText =
    document.getElementById("finalReflectionText");

const finalLake =
    document.getElementById("finalLake");

const finalGarden =
    document.getElementById("finalGarden");

const finalStars =
    document.getElementById("finalStars");

const finalConstellations =
    document.getElementById("finalConstellations");

const moonReflection =
    document.getElementById("moonReflection");

const petalLayer =
    document.getElementById("petalLayer");


const soundToggle =
    document.getElementById("soundToggle");


/* ================================================= */
/* ESTADO */
/* ================================================= */

let stage = "bond";

let activeOrb = null;

let activePointerId = null;

let readyToMerge = false;

let merged = false;

let lilyParticlesMade = false;

let waterTouched = false;

let fishAnimationStarted = false;

let selectedSkyStar = null;

const completedSkyPairs =
    new Set();

let turtleStarted = false;

let finalStarted = false;


const orbState = {
    aX: 39,
    aY: 50,

    bX: 61,
    bY: 50
};


/* ================================================= */
/* AUDIO */
/* ================================================= */

let audioContext = null;

let masterGain = null;

let musicGain = null;

let soundMuted = false;

let musicStarted = false;

let musicInterval = null;

let musicStep = 0;


/* ================================================= */
/* CREAR / REANUDAR AUDIO */
/* ================================================= */

async function ensureAudio() {

    if (!audioContext) {

        const Context =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!Context) {
            return;
        }


        audioContext =
            new Context();


        masterGain =
            audioContext.createGain();


        masterGain.gain.value =
            0.72;


        masterGain.connect(
            audioContext.destination
        );


        musicGain =
            audioContext.createGain();


        musicGain.gain.value =
            0.18;


        musicGain.connect(
            masterGain
        );
    }


    if (
        audioContext.state ===
        "suspended"
    ) {

        try {

            await audioContext.resume();

        } catch (error) {

            console.log(error);
        }
    }


    if (
        audioContext.state === "running"
        &&
        !musicStarted
    ) {

        startBackgroundMusic();
    }
}


window.addEventListener(
    "pointerdown",
    ensureAudio
);


window.addEventListener(
    "keydown",
    ensureAudio
);


/* ================================================= */
/* MÚSICA AMBIENTAL */
/* ================================================= */

function startBackgroundMusic() {

    if (
        !audioContext ||
        musicStarted
    ) {
        return;
    }


    musicStarted = true;


    playAmbientChord();


    musicInterval =
        setInterval(
            playAmbientChord,
            3200
        );
}


function playAmbientChord() {

    if (
        !audioContext ||
        soundMuted
    ) {
        return;
    }


    const progressions = [

        [130.81, 196.00, 261.63],

        [146.83, 220.00, 293.66],

        [164.81, 246.94, 329.63],

        [146.83, 196.00, 293.66]

    ];


    const chord =
        progressions[
            musicStep %
            progressions.length
        ];


    chord.forEach(
        (
            frequency,
            index
        ) => {

            playMusicTone(
                frequency,
                3.7,
                index === 0
                    ? 0.13
                    : 0.085,
                index * 0.08
            );

        }
    );


    playMusicTone(
        chord[2] * 2,
        1.4,
        0.045,
        0.8
    );


    musicStep++;
}


function playMusicTone(
    frequency,
    duration,
    volume,
    delay = 0
) {

    if (
        !audioContext ||
        soundMuted
    ) {
        return;
    }


    const oscillator =
        audioContext.createOscillator();


    const gain =
        audioContext.createGain();


    const filter =
        audioContext.createBiquadFilter();


    const now =
        audioContext.currentTime +
        delay;


    oscillator.type =
        "sine";


    oscillator.frequency.setValueAtTime(
        frequency,
        now
    );


    filter.type =
        "lowpass";


    filter.frequency.value =
        1400;


    gain.gain.setValueAtTime(
        0.001,
        now
    );


    gain.gain.linearRampToValueAtTime(
        volume,
        now + 0.5
    );


    gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + duration
    );


    oscillator.connect(
        filter
    );


    filter.connect(
        gain
    );


    gain.connect(
        musicGain
    );


    oscillator.start(
        now
    );


    oscillator.stop(
        now +
        duration +
        0.1
    );
}


/* ================================================= */
/* EFECTOS DE SONIDO */
/* ================================================= */

function playEffectTone(
    frequency,
    duration = 0.7,
    volume = 0.15,
    delay = 0,
    type = "sine"
) {

    if (
        !audioContext ||
        soundMuted
    ) {
        return;
    }


    const oscillator =
        audioContext.createOscillator();


    const gain =
        audioContext.createGain();


    const now =
        audioContext.currentTime +
        delay;


    oscillator.type =
        type;


    oscillator.frequency.setValueAtTime(
        frequency,
        now
    );


    gain.gain.setValueAtTime(
        0.001,
        now
    );


    gain.gain.linearRampToValueAtTime(
        volume,
        now + 0.035
    );


    gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + duration
    );


    oscillator.connect(
        gain
    );


    gain.connect(
        masterGain
    );


    oscillator.start(
        now
    );


    oscillator.stop(
        now +
        duration +
        0.1
    );
}


function playOrbSound() {

    playEffectTone(
        523.25,
        0.85,
        0.18
    );


    playEffectTone(
        659.25,
        1,
        0.11,
        0.08
    );


    playEffectTone(
        783.99,
        1.15,
        0.07,
        0.16
    );
}


function playWaveSound() {

    if (
        !audioContext ||
        soundMuted
    ) {
        return;
    }


    const oscillator =
        audioContext.createOscillator();


    const gain =
        audioContext.createGain();


    const now =
        audioContext.currentTime;


    oscillator.type =
        "sine";


    oscillator.frequency.setValueAtTime(
        430,
        now
    );


    oscillator.frequency.exponentialRampToValueAtTime(
        115,
        now + 1.5
    );


    gain.gain.setValueAtTime(
        0.13,
        now
    );


    gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 1.5
    );


    oscillator.connect(
        gain
    );


    gain.connect(
        masterGain
    );


    oscillator.start(
        now
    );


    oscillator.stop(
        now + 1.6
    );
}


function playFlowerSound(
    index
) {

    const flowerNotes = [

        659.25,
        698.46,
        783.99,
        880,
        987.77,
        1046.5,
        1174.66

    ];


    playEffectTone(

        flowerNotes[
            index %
            flowerNotes.length
        ],

        0.75,

        0.075
    );
}


function playWaterSound() {

    playEffectTone(
        329.63,
        0.45,
        0.1
    );


    playEffectTone(
        220,
        0.9,
        0.055,
        0.05
    );
}


function playStarSound(
    number
) {

    const notes = [

        523.25,
        659.25,
        783.99,
        1046.5

    ];


    const note =
        notes[
            Math.min(
                number,
                3
            )
        ];


    playEffectTone(
        note,
        0.8,
        0.14
    );


    playEffectTone(
        note * 1.5,
        0.9,
        0.055,
        0.08,
        "triangle"
    );
}


function playWrongStarSound() {

    playEffectTone(
        240,
        0.2,
        0.055
    );
}


function playTurtleSound() {

    const notes = [

        392,
        523.25,
        659.25,
        783.99,
        1046.5

    ];


    notes.forEach(
        (
            note,
            index
        ) => {

            playEffectTone(
                note,
                1.15,
                0.095,
                index * 0.13
            );

        }
    );
}


function playFinalSound() {

    const notes = [

        261.63,
        329.63,
        392,
        523.25

    ];


    notes.forEach(
        (
            note,
            index
        ) => {

            playEffectTone(
                note,
                4,
                0.075,
                index * 0.18
            );

        }
    );
}


/* ================================================= */
/* BOTÓN DE SONIDO */
/* ================================================= */

soundToggle.addEventListener(
    "click",
    async event => {

        event.stopPropagation();


        if (!audioContext) {

            await ensureAudio();


            soundMuted =
                false;


            soundToggle.classList.remove(
                "muted"
            );


            soundToggle.textContent =
                "♪";


            playEffectTone(
                659.25,
                0.5,
                0.17
            );


            return;
        }


        soundMuted =
            !soundMuted;


        if (soundMuted) {

            masterGain.gain.setTargetAtTime(
                0,
                audioContext.currentTime,
                0.06
            );


            soundToggle.classList.add(
                "muted"
            );


            soundToggle.textContent =
                "×";

        } else {

            masterGain.gain.setTargetAtTime(
                0.72,
                audioContext.currentTime,
                0.06
            );


            soundToggle.classList.remove(
                "muted"
            );


            soundToggle.textContent =
                "♪";


            playEffectTone(
                659.25,
                0.5,
                0.17
            );
        }
    }
);


/* ================================================= */
/* BOLAS INICIALES */
/* ================================================= */

orbA.addEventListener(
    "pointerdown",
    event => {

        startDrag(
            event,
            "a"
        );
    }
);


orbB.addEventListener(
    "pointerdown",
    event => {

        startDrag(
            event,
            "b"
        );
    }
);


async function startDrag(
    event,
    whichOrb
) {

    await ensureAudio();


    if (merged) {
        return;
    }


    activeOrb =
        whichOrb;


    activePointerId =
        event.pointerId;


    event.currentTarget
        .setPointerCapture?.(
            event.pointerId
        );
}


window.addEventListener(
    "pointermove",
    event => {

        if (
            !activeOrb ||
            event.pointerId !==
            activePointerId
        ) {
            return;
        }


        const rect =
            bondArea
                .getBoundingClientRect();


        let x =
            (
                event.clientX -
                rect.left
            )
            /
            rect.width
            *
            100;


        let y =
            (
                event.clientY -
                rect.top
            )
            /
            rect.height
            *
            100;


        x =
            Math.max(
                7,
                Math.min(
                    93,
                    x
                )
            );


        y =
            Math.max(
                20,
                Math.min(
                    80,
                    y
                )
            );


        if (
            activeOrb === "a"
        ) {

            orbState.aX = x;
            orbState.aY = y;

        } else {

            orbState.bX = x;
            orbState.bY = y;
        }


        limitSeparation();

        updateOrbPositions();

        drawDNA();

        checkMerge();
    }
);


window.addEventListener(
    "pointerup",
    event => {

        if (
            event.pointerId !==
            activePointerId
        ) {
            return;
        }


        activeOrb =
            null;


        activePointerId =
            null;
    }
);


/* ================================================= */
/* RESTRICCIÓN */
/* ================================================= */

function limitSeparation() {

    const dx =
        orbState.bX -
        orbState.aX;


    const dy =
        orbState.bY -
        orbState.aY;


    const distance =
        Math.hypot(
            dx,
            dy
        );


    const maximum =
        43;


    if (
        distance >
        maximum
    ) {

        const excess =
            distance -
            maximum;


        const nx =
            dx /
            distance;


        const ny =
            dy /
            distance;


        if (
            activeOrb === "a"
        ) {

            orbState.aX +=
                nx *
                excess *
                0.84;


            orbState.aY +=
                ny *
                excess *
                0.84;

        } else {

            orbState.bX -=
                nx *
                excess *
                0.84;


            orbState.bY -=
                ny *
                excess *
                0.84;
        }


        showMergeHint();
    }
}


function updateOrbPositions() {

    orbA.style.left =
        `${orbState.aX}%`;


    orbA.style.top =
        `${orbState.aY}%`;


    orbB.style.left =
        `${orbState.bX}%`;


    orbB.style.top =
        `${orbState.bY}%`;
}


/* ================================================= */
/* ADN */
/* ================================================= */

function drawDNA() {

    const width =
        1000;


    const height =
        220;


    const ax =
        orbState.aX /
        100 *
        width;


    const ay =
        orbState.aY /
        100 *
        height;


    const bx =
        orbState.bX /
        100 *
        width;


    const by =
        orbState.bY /
        100 *
        height;


    const dx =
        bx -
        ax;


    const dy =
        by -
        ay;


    const distance =
        Math.max(
            Math.hypot(
                dx,
                dy
            ),
            0.001
        );


    const normalX =
        -dy /
        distance;


    const normalY =
        dx /
        distance;


    const amplitude =
        Math.min(
            17,
            distance *
            0.07
        );


    const samples =
        80;


    const turns =
        4.5;


    const wave1 = [];

    const wave2 = [];


    dnaRungs.innerHTML =
        "";


    for (
        let i = 0;
        i <= samples;
        i++
    ) {

        const t =
            i /
            samples;


        const cx =
            ax +
            dx *
            t;


        const cy =
            ay +
            dy *
            t;


        const wave =
            Math.sin(
                t *
                Math.PI *
                2 *
                turns
            );


        const offset =
            wave *
            amplitude;


        const x1 =
            cx +
            normalX *
            offset;


        const y1 =
            cy +
            normalY *
            offset;


        const x2 =
            cx -
            normalX *
            offset;


        const y2 =
            cy -
            normalY *
            offset;


        wave1.push(
            `${x1},${y1}`
        );


        wave2.push(
            `${x2},${y2}`
        );


        if (
            i % 8 === 0 &&
            i !== 0 &&
            i !== samples
        ) {

            const line =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "line"
                );


            line.setAttribute(
                "x1",
                x1
            );


            line.setAttribute(
                "y1",
                y1
            );


            line.setAttribute(
                "x2",
                x2
            );


            line.setAttribute(
                "y2",
                y2
            );


            line.setAttribute(
                "class",
                "dna-rung"
            );


            dnaRungs.appendChild(
                line
            );
        }
    }


    dnaWaveOne.setAttribute(
        "d",
        "M " +
        wave1.join(
            " L "
        )
    );


    dnaWaveTwo.setAttribute(
        "d",
        "M " +
        wave2.join(
            " L "
        )
    );
}


/* ================================================= */
/* UNIÓN */
/* ================================================= */

function showMergeHint() {

    if (
        readyToMerge
    ) {
        return;
    }


    readyToMerge =
        true;


    bondHint.textContent =
        "Ahora intenta juntarlas.";


    bondHint.animate(
        [
            {
                opacity: 0
            },

            {
                opacity: 1
            }
        ],
        {
            duration: 700,

            fill:
                "forwards"
        }
    );
}


function checkMerge() {

    if (
        !readyToMerge ||
        merged
    ) {
        return;
    }


    const distance =
        Math.hypot(

            orbState.bX -
            orbState.aX,

            orbState.bY -
            orbState.aY
        );


    if (
        distance <
        9
    ) {

        mergeOrbs();
    }
}


function mergeOrbs() {

    merged =
        true;


    activeOrb =
        null;


    const centerX =
        (
            orbState.aX +
            orbState.bX
        )
        /
        2;


    const centerY =
        (
            orbState.aY +
            orbState.bY
        )
        /
        2;


    playEffectTone(
        392,
        1,
        0.11
    );


    playEffectTone(
        523.25,
        1.2,
        0.075,
        0.08
    );


    bondDNA.animate(
        [
            {
                opacity: 1
            },

            {
                opacity: 0
            }
        ],
        {
            duration: 650,

            fill:
                "forwards"
        }
    );


    orbA.animate(
        [
            {
                left:
                    `${orbState.aX}%`,

                top:
                    `${orbState.aY}%`
            },

            {
                left:
                    `${centerX}%`,

                top:
                    `${centerY}%`
            },

            {
                opacity: 0,

                transform:
                    "translate(-50%,-50%) scale(.2)"
            }
        ],
        {
            duration: 900,

            easing:
                "cubic-bezier(.2,.75,.2,1)",

            fill:
                "forwards"
        }
    );


    const secondAnimation =
        orbB.animate(
            [
                {
                    left:
                        `${orbState.bX}%`,

                    top:
                        `${orbState.bY}%`
                },

                {
                    left:
                        `${centerX}%`,

                    top:
                        `${centerY}%`
                },

                {
                    opacity: 0,

                    transform:
                        "translate(-50%,-50%) scale(.2)"
                }
            ],
            {
                duration: 900,

                easing:
                    "cubic-bezier(.2,.75,.2,1)",

                fill:
                    "forwards"
            }
        );


    secondAnimation.onfinish =
        createGuideOrb;
}


/* ================================================= */
/* BOLA GUÍA */
/* ================================================= */

function createGuideOrb() {

    guideOrb.classList.add(
        "visible"
    );


    guideOrb.animate(
        [
            {
                opacity: 0,

                transform:
                    "translate(-50%,-50%) scale(.2)"
            },

            {
                opacity: 1,

                transform:
                    "translate(-50%,-50%) scale(1.15)"
            },

            {
                opacity: 1,

                transform:
                    "translate(-50%,-50%) scale(1)"
            }
        ],
        {
            duration: 1250,

            fill:
                "forwards",

            easing:
                "cubic-bezier(.2,.8,.2,1)"
        }
    );


    setTimeout(
        openLilyScene,
        850
    );
}


guideOrb.addEventListener(
    "click",
    async () => {

        await ensureAudio();


        playOrbSound();


        setTimeout(
            playWaveSound,
            80
        );


        if (
            stage ===
            "lilyWaiting"
        ) {

            revealLilies();

        } else if (
            stage ===
            "waterWaiting"
        ) {

            revealWater();

        } else if (
            stage ===
            "skyWaiting"
        ) {

            revealSky();
        }
    }
);


function pulseGuideOrb() {

    guideOrb.animate(
        [
            {
                transform:
                    "translate(-50%,-50%) scale(1)"
            },

            {
                transform:
                    "translate(-50%,-50%) scale(1.5)"
            },

            {
                transform:
                    "translate(-50%,-50%) scale(1)"
            }
        ],
        {
            duration: 1000,

            easing:
                "ease-out"
        }
    );


    guideRipple.animate(
        [
            {
                opacity: 0.8,

                transform:
                    "translate(-50%,-50%) scale(.3)"
            },

            {
                opacity: 0.35,

                transform:
                    "translate(-50%,-50%) scale(8)"
            },

            {
                opacity: 0,

                transform:
                    "translate(-50%,-50%) scale(16)"
            }
        ],
        {
            duration: 1800,

            easing:
                "ease-out"
        }
    );
}


/* ================================================= */
/* FLORES */
/* ================================================= */

function openLilyScene() {

    stage =
        "lilyWaiting";


    bondScene.classList.remove(
        "active"
    );


    setTimeout(
        () => {

            lilyScene.classList.add(
                "active"
            );

        },
        400
    );
}


function revealLilies() {

    if (
        stage !==
        "lilyWaiting"
    ) {
        return;
    }


    stage =
        "lilyShown";


    pulseGuideOrb();


    createLilyParticles();


    lilies.forEach(
        (
            lily,
            index
        ) => {

            setTimeout(
                () => {

                    lily.animate(
                        [
                            {
                                opacity: 0,

                                transform:
                                    "translate(-50%,-50%) scale(.18)"
                            },

                            {
                                opacity: 1,

                                transform:
                                    "translate(-50%,-50%) scale(1.05)"
                            },

                            {
                                opacity: 1,

                                transform:
                                    "translate(-50%,-50%) scale(1)"
                            }
                        ],
                        {
                            duration: 1250,

                            fill:
                                "forwards",

                            easing:
                                "cubic-bezier(.2,.75,.2,1)"
                        }
                    );


                    playFlowerSound(
                        index
                    );

                },
                250 +
                index *
                145
            );
        }
    );


    setTimeout(
        () => {

            revealElement(
                lilyMeaning,
                1300
            );

        },
        1450
    );


    setTimeout(
        () => {

            revealElement(
                nextSceneButton,
                800
            );

        },
        3300
    );
}


function createLilyParticles() {

    if (
        lilyParticlesMade
    ) {
        return;
    }


    lilyParticlesMade =
        true;


    for (
        let i = 0;
        i < 34;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "lily-particle";


        const size =
            1 +
            Math.random() *
            3;


        particle.style.width =
            `${size}px`;


        particle.style.height =
            `${size}px`;


        particle.style.left =
            `${
                5 +
                Math.random() *
                90
            }%`;


        particle.style.top =
            `${
                10 +
                Math.random() *
                80
            }%`;


        lilyParticles.appendChild(
            particle
        );


        particle.animate(
            [
                {
                    opacity: 0,

                    transform:
                        "translateY(8px) scale(.3)"
                },

                {
                    opacity: 0.8,

                    transform:
                        "translateY(0) scale(1)"
                },

                {
                    opacity: 0.3,

                    transform:
                        "translateY(-13px) scale(.8)"
                }
            ],
            {
                duration:
                    2500 +
                    Math.random() *
                    1400,

                delay:
                    Math.random() *
                    900,

                iterations:
                    Infinity,

                direction:
                    "alternate"
            }
        );
    }
}


nextSceneButton.addEventListener(
    "click",
    () => {

        lilyScene.classList.remove(
            "active"
        );


        stage =
            "waterWaiting";


        setTimeout(
            () => {

                waterScene.classList.add(
                    "active"
                );


                revealElement(
                    waterWaitingText,
                    900
                );

            },
            450
        );
    }
);


/* ================================================= */
/* AGUA */
/* ================================================= */

function revealWater() {

    if (
        stage !==
        "waterWaiting"
    ) {
        return;
    }


    stage =
        "waterInteractive";


    pulseGuideOrb();


    fadeOutElement(
        waterWaitingText,
        550
    );


    pond.animate(
        [
            {
                opacity: 0,

                transform:
                    "translate(-50%,-50%) scale(.88)"
            },

            {
                opacity: 1,

                transform:
                    "translate(-50%,-50%) scale(1)"
            }
        ],
        {
            duration: 1700,

            fill:
                "forwards",

            easing:
                "cubic-bezier(.2,.72,.2,1)"
        }
    );


    setTimeout(
        () => {

            pond.classList.add(
                "ready"
            );


            fishData.forEach(
                fish => {

                    fish.el.animate(
                        [
                            {
                                opacity: 0
                            },

                            {
                                opacity: 0.96
                            }
                        ],
                        {
                            duration: 850,

                            fill:
                                "forwards"
                        }
                    );
                }
            );


            revealElement(
                waterInstruction,
                800
            );


            startFishAnimation();

        },
        1400
    );
}


/* ================================================= */
/* PECES */
/* ================================================= */

const fishData = [

    {
        el:
            document.getElementById("fish1"),

        x: 20,
        y: 43,

        vx: 0.055,
        vy: 0.018,

        scale: 1,

        phase: 0
    },


    {
        el:
            document.getElementById("fish2"),

        x: 74,
        y: 58,

        vx: -0.05,
        vy: 0.02,

        scale: 0.9,

        phase: 0.7
    },


    {
        el:
            document.getElementById("fish3"),

        x: 43,
        y: 69,

        vx: 0.04,
        vy: -0.025,

        scale: 0.8,

        phase: 1.5
    },


    {
        el:
            document.getElementById("fish4"),

        x: 64,
        y: 35,

        vx: -0.035,
        vy: 0.018,

        scale: 0.72,

        phase: 2.3
    },


    {
        el:
            document.getElementById("fish5"),

        x: 29,
        y: 58,

        vx: 0.045,
        vy: -0.018,

        scale: 0.86,

        phase: 3
    }
];


let previousFishTime =
    performance.now();


function startFishAnimation() {

    if (
        fishAnimationStarted
    ) {
        return;
    }


    fishAnimationStarted =
        true;


    previousFishTime =
        performance.now();


    requestAnimationFrame(
        updateFish
    );
}


function updateFish(
    time
) {

    if (
        !fishAnimationStarted
    ) {
        return;
    }


    const delta =
        Math.min(
            (
                time -
                previousFishTime
            )
            /
            16.67,
            2
        );


    previousFishTime =
        time;


    fishData.forEach(
        (
            fish,
            index
        ) => {

            fish.phase +=
                0.02 *
                delta;


            fish.x +=
                fish.vx *
                delta;


            fish.y +=
                fish.vy *
                delta;


            fish.vx +=
                Math.sin(
                    fish.phase +
                    index
                ) *
                0.0015;


            fish.vy +=
                Math.cos(
                    fish.phase *
                    1.3 +
                    index
                ) *
                0.001;


            const speed =
                Math.hypot(
                    fish.vx,
                    fish.vy
                );


            if (
                speed >
                0.2
            ) {

                fish.vx =
                    fish.vx /
                    speed *
                    0.2;


                fish.vy =
                    fish.vy /
                    speed *
                    0.2;
            }


            if (
                fish.x <
                10
            ) {

                fish.x =
                    10;


                fish.vx =
                    Math.abs(
                        fish.vx
                    );
            }


            if (
                fish.x >
                90
            ) {

                fish.x =
                    90;


                fish.vx =
                    -Math.abs(
                        fish.vx
                    );
            }


            if (
                fish.y <
                18
            ) {

                fish.y =
                    18;


                fish.vy =
                    Math.abs(
                        fish.vy
                    );
            }


            if (
                fish.y >
                82
            ) {

                fish.y =
                    82;


                fish.vy =
                    -Math.abs(
                        fish.vy
                    );
            }


            renderFish(
                fish
            );
        }
    );


    requestAnimationFrame(
        updateFish
    );
}


function renderFish(
    fish
) {

    const angle =
        Math.atan2(
            fish.vy,
            fish.vx
        )
        *
        180
        /
        Math.PI;


    const wobble =
        Math.sin(
            fish.phase *
            5
        )
        *
        2;


    fish.el.style.left =
        `${fish.x}%`;


    fish.el.style.top =
        `${fish.y}%`;


    fish.el.style.transform =
        `
        translate(-50%,-50%)
        rotate(${angle}deg)
        scale(${fish.scale})
        translateY(${wobble}px)
        `;
}


pondInteraction.addEventListener(
    "pointerdown",
    async event => {

        if (
            stage !==
            "waterInteractive"
            &&
            stage !==
            "waterShown"
        ) {
            return;
        }


        await ensureAudio();


        playWaterSound();


        const rect =
            pondInteraction
                .getBoundingClientRect();


        const localX =
            event.clientX -
            rect.left;


        const localY =
            event.clientY -
            rect.top;


        createWaterRipple(
            localX,
            localY
        );


        pushFishAway(

            localX /
            rect.width *
            100,

            localY /
            rect.height *
            100
        );


        if (
            !waterTouched
        ) {

            waterTouched =
                true;


            stage =
                "waterShown";


            fadeOutElement(
                waterInstruction,
                400
            );


            setTimeout(
                () => {

                    revealElement(
                        waterMeaning,
                        1200
                    );

                },
                600
            );


            setTimeout(
                () => {

                    revealElement(
                        continueFromWater,
                        800
                    );

                },
                2600
            );
        }
    }
);


function createWaterRipple(
    x,
    y
) {

    const ripple =
        document.createElement(
            "span"
        );


    ripple.className =
        "pond-ripple";


    ripple.style.left =
        `${x}px`;


    ripple.style.top =
        `${y}px`;


    pondInteraction.appendChild(
        ripple
    );


    ripple.animate(
        [
            {
                width: "16px",
                height: "7px",
                opacity: 0.9
            },

            {
                width: "130px",
                height: "45px",
                opacity: 0.4
            },

            {
                width: "260px",
                height: "88px",
                opacity: 0
            }
        ],
        {
            duration: 1600,

            easing:
                "ease-out"
        }
    );


    setTimeout(
        () => {

            ripple.remove();

        },
        1700
    );
}


function pushFishAway(
    touchX,
    touchY
) {

    fishData.forEach(
        fish => {

            const dx =
                fish.x -
                touchX;


            const dy =
                fish.y -
                touchY;


            const distance =
                Math.max(
                    Math.hypot(
                        dx,
                        dy
                    ),
                    0.01
                );


            if (
                distance <
                38
            ) {

                const force =
                    (
                        38 -
                        distance
                    )
                    /
                    38;


                fish.vx +=
                    dx /
                    distance *
                    force *
                    0.2;


                fish.vy +=
                    dy /
                    distance *
                    force *
                    0.13;
            }
        }
    );
}


/* ================================================= */
/* PASAR AL CIELO */
/* ================================================= */

continueFromWater.addEventListener(
    "click",
    () => {

        waterScene.classList.remove(
            "active"
        );


        stage =
            "skyWaiting";


        setTimeout(
            () => {

                skyScene.classList.add(
                    "active"
                );


                revealElement(
                    skyWaitingText,
                    900
                );

            },
            450
        );
    }
);


/* ================================================= */
/* CIELO */
/* ================================================= */

function revealSky() {

    if (
        stage !==
        "skyWaiting"
    ) {
        return;
    }


    stage =
        "skyPuzzle";


    pulseGuideOrb();


    fadeOutElement(
        skyWaitingText,
        500
    );


    starField.animate(
        [
            {
                opacity: 0
            },

            {
                opacity: 1
            }
        ],
        {
            duration: 1200,

            fill:
                "forwards"
        }
    );


    revealElement(
        skyInstruction,
        1000
    );


    setTimeout(
        () => {

            starField.classList.add(
                "playable"
            );


            starChoices.forEach(
                (
                    star,
                    index
                ) => {

                    star.animate(
                        [
                            {
                                opacity: 0,

                                transform:
                                    "translate(-50%,-50%) scale(.3)"
                            },

                            {
                                opacity: 1,

                                transform:
                                    "translate(-50%,-50%) scale(1)"
                            }
                        ],
                        {
                            duration: 650,

                            delay:
                                index *
                                90,

                            fill:
                                "forwards"
                        }
                    );

                }
            );

        },
        600
    );
}


/* ================================================= */
/* CONSTELACIONES */
/* ================================================= */

starChoices.forEach(
    star => {

        star.addEventListener(
            "pointerdown",
            async event => {

                event.preventDefault();

                event.stopPropagation();


                if (
                    stage !==
                    "skyPuzzle"
                ) {
                    return;
                }


                await ensureAudio();


                chooseStar(
                    star
                );
            }
        );
    }
);


function chooseStar(
    star
) {

    if (
        star.classList.contains(
            "complete"
        )
    ) {
        return;
    }


    if (
        selectedSkyStar ===
        star
    ) {

        star.classList.remove(
            "chosen"
        );


        selectedSkyStar =
            null;


        return;
    }


    if (
        !selectedSkyStar
    ) {

        selectedSkyStar =
            star;


        star.classList.add(
            "chosen"
        );


        playEffectTone(
            880,
            0.25,
            0.06
        );


        return;
    }


    const first =
        selectedSkyStar;


    const firstPair =
        first.dataset.pair;


    const secondPair =
        star.dataset.pair;


    first.classList.remove(
        "chosen"
    );


    if (
        firstPair ===
        secondPair
        &&
        !completedSkyPairs.has(
            firstPair
        )
    ) {

        finishConstellationPair(
            firstPair,
            first,
            star
        );

    } else {

        wrongConstellationPair(
            first,
            star
        );
    }


    selectedSkyStar =
        null;
}


function finishConstellationPair(
    pair,
    first,
    second
) {

    completedSkyPairs.add(
        pair
    );


    first.classList.add(
        "complete"
    );


    second.classList.add(
        "complete"
    );


    animateConstellationLine(
        constellationLines[
            pair
        ]
    );


    const total =
        completedSkyPairs.size;


    playStarSound(
        total - 1
    );


    if (
        total <
        4
    ) {

        skyInstructionTitle.textContent =
            `${total} de 4 constelaciones`;


        skyInstructionText.textContent =
            "Muy bien. Sigue buscando cuáles estrellas pertenecen juntas.";

    } else {

        skyInstructionTitle.textContent =
            "Las encontraste todas.";


        skyInstructionText.textContent =
            "Ahora mira lo que forman juntas...";


        starField.classList.remove(
            "playable"
        );


        setTimeout(
            revealTurtle,
            900
        );
    }
}


function wrongConstellationPair(
    first,
    second
) {

    playWrongStarSound();


    first.animate(
        [
            {
                transform:
                    "translate(-50%,-50%) translateX(0)"
            },

            {
                transform:
                    "translate(-50%,-50%) translateX(-5px)"
            },

            {
                transform:
                    "translate(-50%,-50%) translateX(5px)"
            },

            {
                transform:
                    "translate(-50%,-50%) translateX(0)"
            }
        ],
        {
            duration:
                260
        }
    );


    second.animate(
        [
            {
                transform:
                    "translate(-50%,-50%) translateX(0)"
            },

            {
                transform:
                    "translate(-50%,-50%) translateX(5px)"
            },

            {
                transform:
                    "translate(-50%,-50%) translateX(-5px)"
            },

            {
                transform:
                    "translate(-50%,-50%) translateX(0)"
            }
        ],
        {
            duration:
                260
        }
    );
}


function animateConstellationLine(
    line
) {

    if (!line) {
        return;
    }


    const length =
        line.getTotalLength();


    line.style.strokeDasharray =
        length;


    line.style.strokeDashoffset =
        length;


    line.animate(
        [
            {
                strokeDashoffset:
                    length,

                opacity: 0
            },

            {
                strokeDashoffset:
                    0,

                opacity: 1
            }
        ],
        {
            duration: 850,

            fill:
                "forwards",

            easing:
                "ease-out"
        }
    );
}


/* ================================================= */
/* TORTUGUITA */
/* ================================================= */

function revealTurtle() {

    if (
        turtleStarted
    ) {
        return;
    }


    turtleStarted =
        true;


    stage =
        "turtle";


    playTurtleSound();


    turtleConstellation.animate(
        [
            {
                opacity: 0
            },

            {
                opacity: 1
            }
        ],
        {
            duration: 900,

            fill:
                "forwards"
        }
    );


    turtleStars.forEach(
        (
            star,
            index
        ) => {

            star.animate(
                [
                    {
                        opacity: 0,

                        transform:
                            "translate(-50%,-50%) scale(.2)"
                    },

                    {
                        opacity: 1,

                        transform:
                            "translate(-50%,-50%) scale(1.3)"
                    },

                    {
                        opacity: 1,

                        transform:
                            "translate(-50%,-50%) scale(1)"
                    }
                ],
                {
                    duration: 600,

                    delay:
                        index *
                        90,

                    fill:
                        "forwards"
                }
            );
        }
    );


    turtleLines.forEach(
        (
            line,
            index
        ) => {

            setTimeout(
                () => {

                    animateConstellationLine(
                        line
                    );

                },
                400 +
                index *
                90
            );
        }
    );


    setTimeout(
        () => {

            fadeOutElement(
                skyInstruction,
                600
            );


            revealElement(
                skyMeaning,
                1100
            );

        },
        1100
    );


    setTimeout(
        transitionToFinal,
        4600
    );
}


/* ================================================= */
/* FINAL */
/* ================================================= */

function transitionToFinal() {

    if (
        finalStarted
    ) {
        return;
    }


    finalStarted =
        true;


    stage =
        "final";


    document.body.classList.add(
        "final-mode"
    );


    guideOrb
        .getAnimations()
        .forEach(
            animation => {

                animation.cancel();
            }
        );


    guideRipple
        .getAnimations()
        .forEach(
            animation => {

                animation.cancel();
            }
        );


    guideOrb.classList.remove(
        "visible"
    );


    guideOrb.style.display =
        "none";


    guideRipple.style.display =
        "none";


    skyScene.classList.remove(
        "active"
    );


    setTimeout(
        () => {

            finalScene.classList.add(
                "active"
            );


            buildFinalStars();

            buildFinalPetals();

            revealFinalArtwork();

        },
        650
    );
}


function revealFinalArtwork() {

    playFinalSound();


    finalMoon.animate(
        [
            {
                opacity: 0,

                transform:
                    "translateX(-50%) scale(.45)"
            },

            {
                opacity: 1,

                transform:
                    "translateX(-50%) scale(1.08)"
            },

            {
                opacity: 1,

                transform:
                    "translateX(-50%) scale(1)"
            }
        ],
        {
            duration: 1500,

            fill:
                "forwards",

            easing:
                "cubic-bezier(.2,.8,.2,1)"
        }
    );


    finalConstellations.animate(
        [
            {
                opacity: 0
            },

            {
                opacity: 1
            }
        ],
        {
            duration: 1700,

            delay: 450,

            fill:
                "forwards"
        }
    );


    finalLake.animate(
        [
            {
                opacity: 0,

                transform:
                    "translateX(-50%) scale(.92)"
            },

            {
                opacity: 1,

                transform:
                    "translateX(-50%) scale(1)"
            }
        ],
        {
            duration: 1800,

            delay: 550,

            fill:
                "forwards"
        }
    );


    moonReflection.animate(
        [
            {
                opacity: 0
            },

            {
                opacity: 1
            }
        ],
        {
            duration: 1700,

            delay: 900,

            fill:
                "forwards"
        }
    );


    finalGarden.animate(
        [
            {
                opacity: 0,

                transform:
                    "translateX(-50%) translateY(18px)"
            },

            {
                opacity: 1,

                transform:
                    "translateX(-50%) translateY(0)"
            }
        ],
        {
            duration: 1800,

            delay: 1000,

            fill:
                "forwards"
        }
    );


    finalReflectionText.animate(
        [
            {
                opacity: 0,

                transform:
                    "translateX(-50%) translateY(14px)"
            },

            {
                opacity: 1,

                transform:
                    "translateX(-50%) translateY(0)"
            }
        ],
        {
            duration: 1700,

            delay: 1250,

            fill:
                "forwards"
        }
    );
}


/* ================================================= */
/* ESTRELLAS DEL FINAL */
/* ================================================= */

function buildFinalStars() {

    if (
        finalStars.children.length >
        0
    ) {
        return;
    }


    for (
        let i = 0;
        i < 48;
        i++
    ) {

        const star =
            document.createElement(
                "span"
            );


        star.className =
            "generated-final-star";


        const size =
            1.5 +
            Math.random() *
            2.5;


        star.style.width =
            `${size}px`;


        star.style.height =
            `${size}px`;


        star.style.left =
            `${
                Math.random() *
                100
            }%`;


        star.style.top =
            `${
                3 +
                Math.random() *
                50
            }%`;


        star.style.animationDelay =
            `${
                -Math.random() *
                4
            }s`;


        finalStars.appendChild(
            star
        );


        star.animate(
            [
                {
                    opacity: 0
                },

                {
                    opacity:
                        0.35 +
                        Math.random() *
                        0.55
                }
            ],
            {
                duration:
                    800 +
                    Math.random() *
                    700,

                delay:
                    Math.random() *
                    1200,

                fill:
                    "forwards"
            }
        );
    }
}


/* ================================================= */
/* PÉTALOS DEL FINAL */
/* ================================================= */

function buildFinalPetals() {

    if (
        petalLayer.children.length >
        0
    ) {
        return;
    }


    for (
        let i = 0;
        i < 14;
        i++
    ) {

        const petal =
            document.createElement(
                "span"
            );


        petal.className =
            "final-petal";


        petal.style.left =
            `${
                5 +
                Math.random() *
                90
            }%`;


        petal.style.top =
            `${
                55 +
                Math.random() *
                35
            }%`;


        petalLayer.appendChild(
            petal
        );


        const xMovement =
            -25 +
            Math.random() *
            50;


        petal.animate(
            [
                {
                    opacity: 0,

                    transform:
                        "translate(0,0) rotate(0deg)"
                },

                {
                    opacity: 0.55
                },

                {
                    opacity: 0,

                    transform:
                        `translate(${xMovement}px,-110px) rotate(180deg)`
                }
            ],
            {
                duration:
                    6000 +
                    Math.random() *
                    5000,

                delay:
                    Math.random() *
                    5000,

                iterations:
                    Infinity,

                easing:
                    "ease-in-out"
            }
        );
    }
}


/* ================================================= */
/* AYUDAS VISUALES */
/* ================================================= */

function revealElement(
    element,
    duration = 900
) {

    element.animate(
        [
            {
                opacity: 0,

                transform:
                    getRevealStartTransform(
                        element
                    )
            },

            {
                opacity: 1,

                transform:
                    getRevealEndTransform(
                        element
                    )
            }
        ],
        {
            duration,

            fill:
                "forwards",

            easing:
                "ease-out"
        }
    );
}


function fadeOutElement(
    element,
    duration = 500
) {

    element.animate(
        [
            {
                opacity: 1
            },

            {
                opacity: 0
            }
        ],
        {
            duration,

            fill:
                "forwards"
        }
    );
}


function getRevealStartTransform(
    element
) {

    if (
        element.classList.contains(
            "meaning-block"
        )
        ||
        element.id ===
        "skyInstruction"
        ||
        element.id ===
        "waterWaitingText"
        ||
        element.id ===
        "skyWaitingText"
    ) {

        return "translateX(-50%) translateY(10px)";
    }


    if (
        element.classList.contains(
            "soft-button"
        )
    ) {

        return "translateX(-50%) translateY(7px)";
    }


    return "translateY(8px)";
}


function getRevealEndTransform(
    element
) {

    if (
        element.classList.contains(
            "meaning-block"
        )
        ||
        element.id ===
        "skyInstruction"
        ||
        element.id ===
        "waterWaitingText"
        ||
        element.id ===
        "skyWaitingText"
        ||
        element.classList.contains(
            "soft-button"
        )
    ) {

        return "translateX(-50%) translateY(0)";
    }


    return "translateY(0)";
}


/* ================================================= */
/* INICIO */
/* ================================================= */

updateOrbPositions();

drawDNA();