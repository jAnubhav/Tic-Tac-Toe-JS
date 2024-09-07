const range = end => Array.from(Array(end).keys());
const createElem = (type, att) => Object.assign(document.createElement(type), { ...att });

const getData = () => {
    const name = document.getElementById("name").value;

    if (name != '') {
        cover.classList.add("d-none");
        opponents[0] = name; startGame();
    }
}

const names = new Array(), rounds = new Array();

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

    opponents.forEach((name, e) => {
        let card = card_holder.cloneNode(true);
        card.querySelector("img").src = `./img/face/opponent ${e + 1}.png`;

        names.push(card.querySelector("[data-name]"));
        rounds.push(card.querySelector("[data-round]"));

        card.querySelector("[data-en]").append(ent[e].content.cloneNode(true));

        (e == 0) ? cards.prepend(card) : cards.append(card);
    });
})();