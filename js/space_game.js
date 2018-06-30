let startGame = function() {

	var config = {
	    type: Phaser.AUTO,
	    width: screen.width,
	    height: screen.height,
	    scene: {
	        preload: preload,
	        create: create,
	        update: update
	    }
	};

	var game = new Phaser.Game(config);

	function preload() {
		game.load.image("background", "resources/textures/background.png");
	}

	function create() {
	}

	function update() {
	}

}