const range = end => Array.from(Array(end).keys());

const getData = () => {
    const name = document.getElementById("name").value;

    if (name != '') {
        [name, "Computer"].forEach((e, i) => names[i].innerText = e);
        round = 0; startGame();

        range(2).forEach(e => layers[e].classList.toggle("d-none"));
    }
}

const startGame = () => {
    counter.innerText = roundCount[round++];
    rounds.forEach((e, i) => e.innerText = wonRounds[i]);
}

const clicked = ind => {
    if (f[ind] != -1) return;

    cells[ind].append(ent[f[ind] = ch ^= 1].content.cloneNode(true));
    cells[ind].classList.remove("fresh"); count++;

    data = checkWinner();

    if (data != null) {
        if (data != "D") {
            data.forEach(e => {
                cells[e].classList.add(`bg-${colors[ch]}`); cells[e].innerHTML = '';
                cells[e].append(ent[ch + 2].content.cloneNode(true));
            });
        }

        setTimeout((round == 5) ? gameEnd : roundEnd, 300);
    }

    if (ch == 0 && data == null) setTimeout(compChance, 500);
}

const compChance = () => {
    let temp = null;
    console.log("here")

    while (true) {
        temp = Math.floor(Math.random() * 9);
        if (f[temp] == -1) break;
    }

    clicked(temp);
}

const checkWinner = () => {    
    for (let i = 0; i < 3; i++) {
        if (f[3 * i] == ch && f[3 * i] == f[3 * i + 1] && f[3 * i] == f[3 * i + 2]) {
            return [3 * i, 3 * i + 1, 3 * i + 2];
        } else if (f[i] == ch && f[i] == f[i + 3] && f[i] == f[i + 6]) {
            return [i, i + 3, i + 6];
        }
    }

    if (f[0] == ch && f[0] == f[4] && f[0] == f[8]) {
        return [0, 4, 8];
    } else if (f[2] == ch && f[2] == f[4] && f[2] == f[6]) {
        return [2, 4, 6];
    }

    if (count == 9) {
        ch = 2; return "D";
    }

    return null;
}

const endScreen = () => {
    layers[1].classList.add("d-none"); 
    
    if (ch != 2) wonRounds[ch] += 1;
    
    setTimeout(() => layers[2].classList.remove("d-none"), 1000);
    score.forEach((e, i) => e.innerText = wonRounds[i]);
}

const roundEnd = () => {
    endScreen(); document.getElementById("g-btn").innerText = "Next Round";
    layers[2].querySelector("#round-text").innerText = (ch == 2) ? "Round Draw" : (ch == 1) ? "Round Lost" : "Round Won";
}

const nextRound = () => {
    range(2).forEach(e => layers[e + 1].classList.toggle("d-none"));
    cells.forEach(e => { e.classList.add("fresh"); e.innerHTML = ''; });

    if (round == 5) {
        round = 0; wonRounds = [0, 0];
    }

    if (data != "D") data.forEach(e => cells[e].classList.remove(`bg-${colors[ch]}`));
    f.fill(-1); ch = 1; count = 0; data = null; startGame();
}

const gameEnd = () => {
    endScreen(); document.getElementById("g-btn").innerText = "Next Game";
    layers[2].querySelector("#round-text").innerText = (wonRounds[0] < wonRounds[1]) ? "You Lose" : "You Win";
}

const terminate = () => {
    range(2).forEach(e => layers[e].classList.toggle("d-none"));
    round = 5; nextRound();
}

const layers = document.getElementsByClassName("layer");

const rules = [
    "Get 3 marks in a row, Player wins.",
    "Opponent gets 3 in a row, Player loses.",
    "Board full, no 3 in a row, No winner."
]

const icons = ["win", "lose", "draw"];

const ruleGrid = document.getElementById("rule-grid");
const rule_card = document.getElementById("rule-card-template").content;

const cells = [];
const grid = document.getElementById("grid-container");

const names = [], rounds = [];
const ent = document.querySelectorAll("[data-entity]");
const card_tem = document.getElementById("card-template").content;

let round = 0;
const roundCount = ["1st", "2nd", "3rd", "4th", "5th"];
const counter = document.getElementById("round");

let wonRounds = [0, 0];
let data = null;

let ch = 1, count = 0;
const f = new Array(9).fill(-1);
const colors = ["cross", "circle"];

const score = new Array();
const score_card = document.getElementById("score-card");
const score_holder = document.getElementById("score-holder").content;

document.addEventListener("keydown", event => {
    if (event.key == "Enter" && !layers[0].classList.contains("d-none")) getData();
});

(() => {
    range(3).forEach(e => {
        let card = rule_card.cloneNode(true);

        card.querySelector(".sm-icon").src = `./img/other/${icons[e]}.png`;
        card.querySelector(".lg-icon").src = `./img/other/${icons[e]} board.png`;

        card.querySelector("p").innerText = `${rules[e]} Game ends.`;

        ruleGrid.append(card);
    });

    range(9).forEach(i => {
        let cell = Object.assign(document.createElement("button"), {
            className: "d-grid bg-dark2 br-10 cell fresh",
            onclick: () => clicked(i)
        });

        grid.append(cell); cells.push(cell);
    });

    range(2).forEach(e => {
        let card = card_tem.cloneNode(true);
        card.querySelector("img").src = `./img/face/opponent ${e + 1}.png`;

        names.push(card.querySelector("[data-name]"));
        rounds.push(card.querySelector("[data-round]").querySelector("label"));

        card.querySelector("[data-en]").append(ent[e].content.cloneNode(true));

        (e == 0) ? cards.prepend(card) : cards.append(card);
    });

    range(2).forEach(e => {
        let card = score_holder.cloneNode(true);
        score.push(card.querySelector("[data-score]"));

        score_card.append(card);
    })
})();