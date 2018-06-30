let startGame = function() {

	// general configurations
	var config = {
	    type: Phaser.AUTO,
	    width: 800,
	    height: 600,
	    scene: {
	        preload: preload,
	        create: create,
	        update: update
	    }
	};

	// screen texts
	var scaleText, noteText;

	// player object
	var player;

	// sound variables
	// var currScaleIndex = 0;
	// var currScale = scales[currScaleIndex];
	// var numberOfIntervals = fullPianoWeak[currScale].length;
	// var backgroundMusic;

	var game = new Phaser.Game(config);

	function preload() {
		console.log("preload");
		
		this.load.image("background", "resources/textures/background.png");
		this.load.audio("backgroundMusic", "resources/audios/background_jazz_am7.mp3");
	}

	function create() {
		console.log("create");
		
		// load background image
		this.add.image(config.width / 2, config.height / 2, "background");

		// load background music
		this.sound.play("backgroundMusic");
		// backgroundMusic = this.add.audio("backgroundMusic");
  //       backgroundMusic.volume = 0.1;
  //       backgroundMusic.play();

        // start screen texts
		scaleText = this.add.text(10, 60, "-", { font: "bold 16px Arial" });
		noteText = this.add.text(10, 85, "-", { font: "bold 16px Arial" });


	}

	function update() {
		console.log("update");
	}

}

startGame();
