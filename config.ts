enum ViewTypes {
    view2D,
    view3D
}

// uncomment below to change resolution on simulator
// Does not change resolution on actual hardware
/*namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 320;
    export const ARCADE_SCREEN_HEIGHT = 240;
}*/


namespace config {
    // Viewport configuration
    export let viewportWidth = screen.width
    export let viewportHeight = screen.height

    // Position and movement configuration
    export let moveStep = 5
    export let rotationStep = 5
    export let startAngle = 225

    // Map configuration
    export let tileSize = 16

    // Viewtype configuration
    export let view = ViewTypes.view3D

    // Raycasting / rendering configuration
    export let fov = 60
    export let rays = 40
    export let maxDrawingDistance = 20
    export let textures = false

    // debug flag
    export let debug = false
}
