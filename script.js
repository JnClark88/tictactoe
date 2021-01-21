const winningConditions = [
    [0, 1, 2], [3, 4, 5],
    [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
var GameBoardSectionMarkers;
(function (GameBoardSectionMarkers) {
    GameBoardSectionMarkers["Nought"] = "O";
    GameBoardSectionMarkers["Cross"] = "X";
})(GameBoardSectionMarkers || (GameBoardSectionMarkers = {}));
// function dispatchEvent(name: string, params: any) {
//     const event = new CustomEvent(name, { detail: { params }});
//
//     window.dispatchEvent(event)
// }
class Game {
    constructor() {
        this.players = [];
        this.gameProcessFn = this.gameCb.bind(this);
    }
    start() {
        this.createPlayers();
        const gameBoard = document.getElementById('game-board');
        gameBoard.addEventListener('click', this.gameProcessFn);
    }
    gameCb(event) {
        const target = event.target, isSectionSelected = target.getAttribute('data-cell-selected'), index = target.getAttribute('data-cell-index');
        if (!isSectionSelected) {
            this.currentPlayer.selectSection(index);
            target.setAttribute('data-cell-selected', 'true');
            target.innerHTML = this.currentPlayer.marker;
        }
        this.checkWinningCondition();
        this.switchPlayers();
    }
    createPlayers() {
        this.players = [
            new Player('loh', GameBoardSectionMarkers.Nought),
            new Player('pidor', GameBoardSectionMarkers.Cross)
        ];
        this.currentPlayer = this.players[0];
    }
    checkWinningCondition() {
        const selections = this.currentPlayer.getSelectedSections(), isWin = winningConditions.find(el => {
            return el.every(subEl => selections.includes(subEl));
        });
        if (isWin) {
            this.showWinMessage();
            this.removeListeners();
            return;
        }
    }
    showWinMessage() {
        console.log(this.currentPlayer);
    }
    removeListeners() {
        const gameBoard = document.getElementById('game-board');
        gameBoard.removeEventListener('click', this.gameProcessFn);
    }
    switchPlayers() {
        this.currentPlayer = this.players.find(({ marker }) => marker !== this.currentPlayer.marker);
    }
}
class Player {
    constructor(name, marker) {
        this.name = name;
        this.marker = marker;
        this.selectedSections = [];
    }
    getSelectedSections() {
        return this.selectedSections;
    }
    selectSection(section) {
        this.selectedSections = [...this.selectedSections, +section].sort();
    }
}
window.onload = () => {
    const game = new Game();
    game.start();
};
//# sourceMappingURL=script.js.map