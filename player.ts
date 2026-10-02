class fpsPlayer {
    map: fpsMap
    rotationAngle: number
    fov: number
    x: number
    y: number


    constructor(fov: number, map: fpsMap) {
        this.setRotationAngleInRadians(0)
        this.setFOVInDegrees(fov)
        this.map = map
    }

    setRotationAngleInDegrees(degrees: number) {
        this.setRotationAngleInRadians(degrees * (Math.PI / 180))
    }

    setRotationAngleInRadians(radians: number) {
        
        this.rotationAngle = util.normalizeAngle(radians)
    }

    

    getRotationAngleInDegrees(): number {
        return this.rotationAngle * (180 / Math.PI)
    }

    getRotationAngleInRadians(): number {
        return this.rotationAngle
    }

    rotateDegreesToLeft(degrees: number) {
        this.setRotationAngleInDegrees(this.getRotationAngleInDegrees() - degrees)
    }

    strafeLeft(distance: number) {
        let newX = this.x + Math.cos(this.rotationAngle - Math.PI / 2) * distance
        let newY = this.y + Math.sin(this.rotationAngle - Math.PI / 2) * distance

        if (this.map.tileAtCoords(newX, newY) == 0) {
            this.x = newX
            this.y = newY
        }
    }

    strafeRight(distance: number) {
        let newX = this.x + Math.cos(this.rotationAngle + Math.PI / 2) * distance
        let newY = this.y + Math.sin(this.rotationAngle + Math.PI / 2) * distance

        if (this.map.tileAtCoords(newX, newY) == 0) {
            this.x = newX
            this.y = newY
        }
    }

    rotateDegreesToRight(degrees: number) {
        this.setRotationAngleInDegrees(this.getRotationAngleInDegrees() + degrees)
    }

    setPosition(x: number, y: number) {
        this.x = x
        this.y = y
    }


    moveForward(distance: number) {

        let newX = this.x + Math.cos(this.rotationAngle) * distance
        let newY = this.y + Math.sin(this.rotationAngle) * distance

        if (this.map.tileAtCoords(newX, newY) == 0) {
            this.x = newX
            this.y = newY
        }

    }

    moveBackward(distance: number) {
        let newX = this.x - Math.cos(this.rotationAngle) * distance
        let newY = this.y - Math.sin(this.rotationAngle) * distance

        if (this.map.tileAtCoords(newX, newY) == 0) {
            this.x = newX
            this.y = newY
        }
    }

    setFOVInDegrees(degrees: number) {
        this.fov = degrees * (Math.PI / 180)
    }

    render2D() {
        screen.fillCircle(this.x, this.y, 3, 5)
    }
}
