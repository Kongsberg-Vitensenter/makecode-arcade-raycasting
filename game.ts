namespace fpsGame {
    export let map: fpsMap          // map.ts
    export let player: fpsPlayer    // player.ts
    export let rayCaster: RayCaster // raycaster.ts

    // Set up map
    // This could probable be changed to use MakeCode Arcade
    // built-in tilemaps instead of rolling our own
    export function setupMap() {
        map = new fpsMap(16, 12, config.tileSize)
        map.map = [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
            1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1,
            1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
            1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1,
            1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        ]
        map.textures_h = [
            image.create(16,16),
            assets.tile`wall1_h`
        ]
        map.textures_v = [
            image.create(16, 16),
            assets.tile`wall1_v`
        ]
    }

    // Set up player
    export function setupPlayer() {
        fpsGame.player = new fpsPlayer(config.fov, fpsGame.map)
        fpsGame.player.setPosition(7.9 * config.tileSize, 5.5 * config.tileSize)
        fpsGame.player.setRotationAngleInDegrees(config.startAngle)
    }

    // Set up ray caster and rendering
    export function setupRayCaster() {
        fpsGame.rayCaster = new RayCaster(fpsGame.player, config.rays, config.maxDrawingDistance)
        if (config.view == ViewTypes.view2D) {
            fpsGame.rayCaster.castAllRays()
        } else if (config.view == ViewTypes.view3D) {
            scene.setBackgroundImage(assets.image`background1`)
            fpsGame.rayCaster.castAllRays()
        }
    }

    // Set up all event handlers
    export function setupEventHandlers() {

        // input loop, run every 50 ms
        // Check for inputs and cast rays
        game.onUpdateInterval(50, function () {
            if (controller.anyButton.isPressed()) {
                if (controller.left.isPressed()) {
                    if (controller.B.isPressed())
                        fpsGame.player.strafeLeft(config.moveStep)
                    else
                        fpsGame.player.rotateDegreesToLeft(config.rotationStep)
                }
                if (controller.right.isPressed()) {
                    if (controller.B.isPressed())
                        fpsGame.player.strafeRight(config.moveStep)
                    else
                        fpsGame.player.rotateDegreesToRight(config.rotationStep)
                }
                if (controller.up.isPressed()) {
                    fpsGame.player.moveForward(config.moveStep)
                }
                if (controller.down.isPressed()) {
                    fpsGame.player.moveBackward(config.moveStep)
                }
                if (controller.B.isPressed() && controller.A.isPressed()) {
                    if (config.view == ViewTypes.view3D)
                        config.view = ViewTypes.view2D
                    else
                        config.view = ViewTypes.view3D
                    pause(200)
                }

                fpsGame.rayCaster.castAllRays()
            }
        })

        // Drawn after background, before sprites
        // We render the main scene here both in 
        // 3D and 2D views
        game.onPaint(function () {
            if (config.view == ViewTypes.view2D) {
                fpsGame.map.render2D()
            } else if (config.view == ViewTypes.view3D) {
                fpsGame.rayCaster.render3D(screen)
            }
        })

        // Drawn after background,tilemap and sprites, but before HUD
        // We render the player and rays in 2D view here
        game.onShade(function () {
            if (config.view == ViewTypes.view2D) {
                fpsGame.player.render2D()
                fpsGame.rayCaster.render2D()
            }
        })
    }
}