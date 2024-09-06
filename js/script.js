const range = end => Array.from(Array(end).keys());
const createElem = (type, att) => Object.assign(document.createElement(type), { ...att });

const getData = () => {
    const name = document.getElementById("name").value;

    if (name != "") {
        document.querySelector("[data-name]").innerText = opponents[0] = name;
        cover.classList.add("d-none");
    }
}

const clicked = ind => {
    if (f[ind] != -1) return;
    cells[ind].append(ent[f[ind] = ch ^= 1].content.cloneNode(true));
    cells[ind].classList.remove("fresh");
    checkWinner();
}

const checkWinner = () => {
    for (let i = 0; i < 3; i++) {
        if (f[3 * i] == ch && f[3 * i] == f[3 * i + 1] && f[3 * i] == f[3 * i + 2]) {
            colorCells([3 * i, 3 * i + 1, 3 * i + 2]); return true;
        } else if (f[i] == ch && f[i] == f[i + 3] && f[i] == f[i + 6]) {
            colorCells([i, i + 3, i + 6]); return true;
        }
    }

    if (f[0] == ch && f[0] == f[4] && f[0] == f[8]) {
        colorCells([0, 4, 8]); return true;
    } else if (f[2] == ch && f[2] == f[4] && f[2] == f[6]) {
        colorCells([2, 4, 6]); return true;
    }

    return false;
}

const colorCells = arr => {
    arr.forEach(e => {
        cells[e].classList.add(`bg-${colors[ch]}`);
    })
}

const grid = document.getElementById("grid-container");
let cells = new Array();

const ent = document.querySelectorAll("[data-entity]");

let ch = 1;
const f = new Array(9).fill(-1);
const colors = ["cross", "circle"];

let round = 0;
const rounds = ["1st", "2nd", "3rd", "4th", "5th"];
const counter = document.getElementById("round");

const cards = document.getElementById("cards");
const card_holder = document.getElementById("card-holder").content;

const opponents = ["Name", "Computer"];
const cover = document.getElementById("cover");

document.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !cover.classList.contains("d-none")) {
        getData();
    }
});

(() => {
    range(9).forEach(i => {
        let cell = createElem("button", {
            className: "d-grid bg-blue br-10 cell fresh",
            onclick: () => clicked(i)
        });

        grid.append(cell); cells.push(cell);
    });

    counter.innerText = rounds[round++];

    opponents.forEach((name, e) => {
        let card = card_holder.cloneNode(true);
        card.querySelector("img").src = `./img/face/opponent ${e + 1}.png`;

        card.querySelector("[data-name]").innerText = name;
        card.querySelector("[data-en]").append(ent[e].content.cloneNode(true));

        (e == 0) ? cards.prepend(card) : cards.append(card);
    });
})();