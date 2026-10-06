 # Makecode Arcade Raycasting

 Experiments in raycasting with Makecode Arcade. 
 

 Seems to run without any noticeable lag on the 
 Elecfreaks Retro Makecode Arcade for Education and the Kitronic ARCADE
 handheld consoles when casting 40 rays. 
 

 It will start lagging on real hardware if you increase the ray count substantially 
 above 40. If you are only using the Makecode Simulator you can increase the ray count
 to 160 without any lagging and increase the screen resolution as well.
 

 But to keep it running smoothly and correctly on actual hardware I recommend 
 keeping the resolution default and the number of rays cast low.


 There is also support for textures, using MakeCode tiles to define textures.
 This feature works best when running on the simulator, as the screen resolution
 on real hardware as well as the low ray count needed for it to run smoothly makes
 the texture rendering not look good.

 ## How to Play
 * Move the player with the d-pad
 * Hold B button while pressing left or right on the d-pad to strafe
 * Press A and B buttons simultaneously to switch between 3D view and a 2D view showing the map, player and rays cast from above. 
 The 2D view will only show the 160x120 positions in the top left map (equals 10x7.5 tiles with the default tile size of 16)


Open this page at [https://kongsberg-vitensenter.github.io/makecode-arcade-raycasting/](https://kongsberg-vitensenter.github.io/makecode-arcade-raycasting/)
to play the game online.

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/kongsberg-vitensenter/makecode-arcade-raycasting** and import

## Edit this project

To edit this repository in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/kongsberg-vitensenter/makecode-arcade-raycasting** and click import

#### Metadata (used for search, rendering)

* for PXT/arcade
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
