const winningConditions: any[] = [
    [0,1,2], [3,4,5],
    [6,7,8], [0,3,6],
    [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

enum GameBoardSectionMarkers {
    Nought = 'O',
    Cross = 'X'
}

// function dispatchEvent(name: string, params: any) {
//     const event = new CustomEvent(name, { detail: { params }});
//
//     window.dispatchEvent(event)
// }

class Game {
    currentPlayer;
    players = [];

    gameProcessFn = this.gameCb.bind(this);

    start(): void {
        this.createPlayers();

        const gameBoard = document.getElementById('game-board');

        gameBoard.addEventListener('click', this.gameProcessFn);
    }

    gameCb(event: Event): void {
        const
            target = event.target as HTMLElement,
            isSectionSelected = target.getAttribute('data-cell-selected'),
            index = target.getAttribute('data-cell-index');

        if (!isSectionSelected) {
            this.currentPlayer.selectSection(index);
            target.setAttribute('data-cell-selected', 'true');
            target.innerHTML = this.currentPlayer.marker
        }

        this.checkWinningCondition();
        this.switchPlayers()
    }

    createPlayers(): void {
        this.players = [
            new Player('player1', GameBoardSectionMarkers.Nought),
            new Player('player2', GameBoardSectionMarkers.Cross)
        ];

        this.currentPlayer = this.players[0]
    }

    checkWinningCondition(): void {
        const
            selections = this.currentPlayer.getSelectedSections(),
            isWin = winningConditions.find(el => {
                return el.every(subEl => selections.includes(subEl))
            });

        if (isWin) {
            this.showWinMessage();
            this.removeListeners();

            return;
        }
    }

    showWinMessage(): void {
        console.log(this.currentPlayer)
    }

    removeListeners(): void {
        const gameBoard = document.getElementById('game-board');

        gameBoard.removeEventListener('click', this.gameProcessFn);
    }

    switchPlayers(): void {
        this.currentPlayer = this.players.find(({ marker }) => marker !== this.currentPlayer.marker)
    }
}

class Player {
    private selectedSections: number[] = [];

    constructor(
        public name: string,
        public marker: GameBoardSectionMarkers
    ) {}

    getSelectedSections(): number[] {
        return this.selectedSections
    }

    selectSection(section: number): void {
        this.selectedSections = [...this.selectedSections, +section].sort()
    }
}

window.onload = () => {
    const game = new Game();

    game.start()
};
