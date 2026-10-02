class fpsMap {
    map: int8[]
    width: int8
    height: int8
    tileSize: int8

    constructor(width: number, height: number, tileSize: number) {
        this.width = width
        this.height = height
        this.tileSize = tileSize
    }

    tileAt(col: number, row: number): number {
        return this.map[col + row * this.width]
    }

    tileAtCoords(x: number, y: number): number {
        return this.tileAt(Math.floor(x / this.tileSize), Math.floor(y / this.tileSize))
    }

    render2D() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                screen.fillRect(x * this.tileSize, y * this.tileSize, x * this.tileSize + this.tileSize, y * this.tileSize + this.tileSize, this.tileAt(x, y))
                screen.drawRect(x * this.tileSize, y * this.tileSize, x * this.tileSize + this.tileSize, y * this.tileSize + this.tileSize, 6)
            }
        }
    }
}