class Ray {
    player: fpsPlayer
    angle: number
    facingDown: boolean
    facingRight: boolean
    x: number
    y: number
    lenght: number
    maxDrawingDistance: number
    horizontalhit: boolean

    constructor(player: fpsPlayer, angle: number, maxDrawingDistance: number) {
        this.player = player
        angle = angle % (2 * Math.PI)
        if (angle < 0)
            angle = (2 * Math.PI) + angle
        this.angle = angle
        this.facingDown = this.angle > 0 && this.angle < Math.PI
        this.facingRight = this.angle < 0.5 * Math.PI || this.angle > 1.5 * Math.PI
        this.maxDrawingDistance = maxDrawingDistance
    }

    cast() {
        let h_y = -1
        let h_x = -1
        let h_l = 99999
        let v_x = -1
        let v_y = -1
        let v_l = 99999

        // Check for horizontal walls
        if (this.facingDown) {
            h_y = (Math.floor(this.player.y / this.player.map.tileSize) * this.player.map.tileSize) + this.player.map.tileSize
        } else {
            h_y = Math.floor(this.player.y / this.player.map.tileSize) * this.player.map.tileSize - 0.0001
        }
        h_x = this.player.x + (h_y - this.player.y) / Math.tan(this.angle)

        if (this.player.map.tileAtCoords(h_x, h_y) > 0) {
            h_l = Math.sqrt(Math.pow(this.player.x - h_x, 2) + Math.pow(this.player.y - h_y, 2))
        } else {
            let dy = this.facingDown ? this.player.map.tileSize : -this.player.map.tileSize
            let dx = dy / Math.tan(this.angle)
            for (let i = 0; i < this.maxDrawingDistance; i++) {
                h_x += dx
                h_y += dy
                if (
                    h_x < 0 ||
                    h_y < 0 ||
                    h_x > this.player.map.width * this.player.map.tileSize
                    || h_y > this.player.map.height * this.player.map.tileSize
                )
                    break
                if (this.player.map.tileAtCoords(h_x, h_y) > 0) {
                    h_l = Math.sqrt(Math.pow(this.player.x - h_x, 2) + Math.pow(this.player.y - h_y, 2))
                    break
                }
            }
        }

        // Check for vertical walls
        if (this.facingRight) {
            v_x = (Math.floor(this.player.x / this.player.map.tileSize) * this.player.map.tileSize) + this.player.map.tileSize
        } else {
            v_x = Math.floor(this.player.x / this.player.map.tileSize) * this.player.map.tileSize - 0.0001
        }
        v_y = this.player.y + (v_x - this.player.x) * Math.tan(this.angle)

        if (this.player.map.tileAtCoords(v_x, v_y) > 0) {
            v_l = Math.sqrt(Math.pow(this.player.x - v_x, 2) + Math.pow(this.player.y - v_y, 2))
        } else {
            let dx = this.facingRight ? this.player.map.tileSize : -this.player.map.tileSize
            let dy = dx * Math.tan(this.angle)
            for (let i = 0; i < this.maxDrawingDistance; i++) {
                v_x += dx
                v_y += dy

                if (
                    v_x < 0 ||
                    v_y < 0 ||
                    v_x > this.player.map.width * this.player.map.tileSize
                    || v_y > this.player.map.height * this.player.map.tileSize
                )
                    break
                if (this.player.map.tileAtCoords(v_x, v_y) > 0) {
                    v_l = Math.sqrt(Math.pow(this.player.x - v_x, 2) + Math.pow(this.player.y - v_y, 2))
                    break
                }
            }
        }

        // choose shortest length
        if (v_l < h_l) {
            this.x = v_x
            this.y = v_y
            this.lenght = v_l
            this.horizontalhit = false
        } else {
            this.x = h_x
            this.y = h_y
            this.lenght = h_l
            this.horizontalhit = true
        }

        this.lenght *= Math.cos(this.player.rotationAngle - this.angle)
    }

    render2D() {
        if (this.x >= 0 && this.y >= 0)
            screen.drawLine(this.player.x, this.player.y, this.x, this.y, 3)
    }
}

class RayCaster {
    player: fpsPlayer
    rays: Ray[]
    rayNumber: number
    maxDrawingDistance: number
    viewDistance: number

    constructor(player: fpsPlayer, numberOfRays: number, maxDrawingDistance: number) {
        this.player = player
        this.rays = []
        this.rayNumber = numberOfRays
        this.maxDrawingDistance = maxDrawingDistance
        this.viewDistance = (config.viewportWidth / 2) / (Math.tan(this.player.fov / 2))
    }

    castAllRays() {
        this.rays = []
        let rayAngle = this.player.rotationAngle - this.player.fov / 2
        for (let i = 0; i < this.rayNumber; i++) {
            let ray = new Ray(this.player, rayAngle, this.maxDrawingDistance)
            ray.cast()
            this.rays.push(ray)

            rayAngle += this.player.fov / this.rayNumber
        }
    }

    render2D() {
        for (let i = 0; i < this.rays.length; i++)
            this.rays[i].render2D()
    }

    render3D(image: Image) {
        let lineWidth = config.viewportWidth / this.rayNumber
        for (let i = 0; i < this.rays.length; i++) {
            let lineHeight = (this.player.map.tileSize / this.rays[i].lenght) * this.viewDistance
            if (this.rays[i].horizontalhit)
                image.fillRect(lineWidth * i, config.viewportHeight / 2 - lineHeight / 2, lineWidth, lineHeight, 1)
            else
                image.fillRect(lineWidth * i, config.viewportHeight / 2 - lineHeight / 2, lineWidth, lineHeight, 13)

        }
    }
}
