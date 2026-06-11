const colorCodeContainer = document.getElementById("color-code");
const optioncontainer = document.getElementById("options-container");
const scorecontainer = document.getElementById('score');
let randomcolor = null;
let score = 0;

function generateRandomNoBetween(min, max) {
    return min + Math.floor(Math.random() * (max-min +1))
}

function generateRandomcolorRGB() {
    const red = generateRandomNoBetween(0, 255);
    const green = generateRandomNoBetween(0, 255);
    const blue = generateRandomNoBetween(0, 255);
    return `rgb(${red}, ${green}, ${blue})`;
}

function incrementScore() {
    score += 1;
    scorecontainer.innerText = score;
}

function validateResult(el) {
    console.log(el.target);
    const selectedColor = el.target.style.backgroundColor;
    if (selectedColor === randomcolor) {
        incrementScore();
    }else {
        score = 0;
    }
    window.localStorage.setItem("score", score );
    startGame();
}

function startGame() {
    score = Number(window.localStorage.getItem("score")) ??  0;
    scorecontainer.innerText = score;
    optioncontainer.innerHTML = null;
    randomcolor = generateRandomcolorRGB();
    colorCodeContainer.innerText = randomcolor;

    const ansIndex = generateRandomNoBetween(0, 5);

    for(let i=0; i<6; i++) {
        const div = document.createElement('div');
        div.addEventListener('click', validateResult );
        div.style.backgroundColor = i === ansIndex ? randomcolor : generateRandomcolorRGB();
        optioncontainer.append(div);
    }
}

window.addEventListener("load", () => startGame())