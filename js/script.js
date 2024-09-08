const range = end => Array.from(Array(end).keys());
const createElem = (type, att) => Object.assign(document.createElement(type), { ...att });

const getData = () => {
    const name = document.getElementById("name").value;

    if (name != '') {
        [name, "Computer"].forEach((e, i) => names[i].innerText = e);

        layers[0].classList.add("d-none");startGame();
        setTimeout(() => layers[1].classList.remove("d-none"), 500);
    }
}

const startGame = () => {
    counter.innerText = roundCount[round++];
    rounds.forEach((e, i) => e.innerText = wonRounds[i]);
}





const layers = document.getElementsByClassName("layer");

const cells = [];
const grid = document.getElementById("grid-container");

const names = [], rounds = [];
const ent = document.querySelectorAll("[data-entity]");
const card_tem = document.getElementById("card-template").content;

let round = 0;
const roundCount = ["1st", "2nd", "3rd", "4th", "5th"];
const counter = document.getElementById("round");

const wonRounds = [0, 0];






document.addEventListener("keydown", event => {
    if (event.key == "Enter" && !layers[0].classList.contains("d-none")) getData();
});

(() => { 
    range(9).forEach(i => {
        let cell = createElem("button", {
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
})();