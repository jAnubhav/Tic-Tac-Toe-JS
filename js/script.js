const range = end => Array.from(Array(end).keys());
const createElem = (type, att) => Object.assign(document.createElement(type), { ...att });

const getData = () => {
    const name = document.getElementById("name").value;

    if (name != '') {
        [name, "Computer"].forEach((e, i) => names[i].innerText = e);
        cover[0].classList.add("d-none"); startGame();

        document.getElementById("container").classList.remove("d-none");
    }
}

const startGame = () => {
    counter.innerText = roundCount[round++];
    rounds.forEach((e, i) => e.innerText = wonRounds[i]);
}

const clicked = ind => {
    if (f[ind] != -1) return;

    cells[ind].append(ent[f[ind] = ch ^= 1].content.cloneNode(true));
    cells[ind].classList.remove("fresh");
    
    const data = checkWinner();

    if (data != null) {
        colorCells(data);
        setTimeout(roundEnd, 500);
    }
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

    return null;
}

const colorCells = arr => {
    arr.forEach(e => {
        cells[e].classList.add(`bg-${colors[ch]}`); cells[e].innerHTML = ''; 
        cells[e].append(ent[ch + 2].content.cloneNode(true));
    });
}

const discolorCells = arr => {
    arr.forEach(e => {
        cells[e].classList.remove(`bg-${colors[ch]}`);
    });
}

const updateScore = () => { wonRounds[ch] += 1; ch = 1; }

const reset = () => {
    cells.forEach(e => {
        e.classList.add("fresh");
        e.innerHTML = '';
    })

    f = new Array(9).fill(-1);
}

const roundEnd = () => {
    cover[1].classList.remove("d-none");
    updateScore(); score.forEach((e, i) => {
        e.innerText = wonRounds[i];
    })
}

// Cover of the top with Pop-up
const rules = [
    "Get 3 marks in a row, Player wins.",
    "Opponent gets 3 in a row, Player loses.",
    "Board full, no 3 in a row, No winner."
]

const icons = ["win", "lose", "draw"];

const cover = document.getElementsByClassName("cover");

const ruleGrid = document.getElementById("rule-grid");
const ruleCard = document.getElementById("rule-card-template").content;


// Entities and chance and round counter
const ent = document.querySelectorAll("[data-entity]");

let ch = 1;
const f = new Array(9).fill(-1);
const colors = ["cross", "circle"];

let round = 0;
const roundCount = ["1st", "2nd", "3rd", "4th", "5th"];
const counter = document.getElementById("round");

// Grid and cards
const grid = document.getElementById("grid-container");
const cells = new Array(), names = new Array(), rounds = new Array();

const wonRounds = [0, 0];

const cards = document.getElementById("cards");
const card_holder = document.getElementById("card-holder").content;

const score_card = document.getElementById("score-card");
const score_holder = document.getElementById("score-holder").content;

const score = new Array();

document.addEventListener("keydown", event => {
    if (event.key == "Enter" && !cover[0].classList.contains("d-none")) getData();
});

(() => {
    // range(3).forEach(e => {
    //     let card = ruleCard.cloneNode(true);

    //     card.querySelector(".sm-icon").src = `./img/other/${icons[e]}.png`;
    //     card.querySelector(".lg-icon").src = `./img/other/${icons[e]} board.png`;

    //     card.querySelector("p").innerText = `${rules[e]} Game ends.`;

    //     ruleGrid.append(card);
    // });

    range(9).forEach(i => {
        let cell = createElem("button", {
            className: "d-grid bg-dark2 br-10 cell fresh",
            onclick: () => clicked(i)
        });

        grid.append(cell); cells.push(cell);
    });

    range(2).forEach(e => {
        let card = card_holder.cloneNode(true);
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