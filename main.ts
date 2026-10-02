// Set up game, functions defined in game.ts
function initGame() {
    fpsGame.setupMap()
    fpsGame.setupPlayer()
    fpsGame.setupRayCaster()
    fpsGame.setupEventHandlers()
}

initGame()