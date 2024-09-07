const range = end => Array.from(Array(end).keys());
const createElem = (type, att) => Object.assign(document.createElement(type), { ...att });

const getData = () => {
    const name = document.getElementById("name").value;

    if (name != '') {
        cover.classList.add("d-none");
        startGame();
    }
}

const startGame = () => {
    range(9).forEach(i => {
        let cell = createElem("button", {
            className: "d-grid bg-dark2 br-10 cell fresh",
            onclick: () => clicked(i)
        });

        grid.append(cell); cells.push(cell);
    });
}

const rules = [
    "Get 3 marks in a row, Player wins.",
    "Opponent gets 3 in a row, Player loses.",
    "Board full, no 3 in a row, No winner."
]

const icons = ["win", "lose", "draw"];

const cover = document.getElementById("cover");

const ruleGrid = document.getElementById("rule-grid");
const ruleCard = document.getElementById("rule-card-template").content;

const grid = document.getElementById("grid-container");
let cells = new Array();

document.addEventListener("keydown", event => {
    if (event.key == "Enter" && !cover.classList.contains("d-none")) getData();
});

(() => {
    // range(3).forEach(e => {
    //     let card = ruleCard.cloneNode(true);

    //     card.querySelector(".sm-icon").src = `./img/other/${icons[e]}.png`;
    //     card.querySelector(".lg-icon").src = `./img/other/${icons[e]} board.png`;

    //     card.querySelector("p").innerText = `${rules[e]} Game ends.`;

    //     ruleGrid.append(card);
    // })
})();