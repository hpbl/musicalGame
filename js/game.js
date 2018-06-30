let startGame = function() {
	var width = 640 * 1.5;
	var height = 480 * 1.5;
	var game = new Phaser.Game(width, height, Phaser.CANVAS);

	var currScaleIndex = 0;
	var currScale = scales[currScaleIndex];
	var numberOfIntervals = fullPianoWeak[currScale].length;

	var bird;
     // horizontal bird speed
	var birdSpeed = 100;
     // milliseconds between the creation of two pipes
	var pipeInterval = 5000;
     // hole between pipes, in puxels
	var pipeHole = 10;
	var pipeGroup;
	var score=0;
	var scoreText;
    var topScore;

    var mousePlayed = false;

    var music;
     
    var play = function(game) {}
     
    play.prototype = {
		preload: function() {
			game.load.image("bird", "resources/bird.png");
			game.load.image("pipe", "resources/pipe.png");
			game.load.audio("backgroundMusic", "resources/background_jazz_am7.mp3");
		},
		create: function() {
			score = 0;
			topScore = localStorage.getItem("topFlappyScore")==null?0:localStorage.getItem("topFlappyScore");
			scoreText = game.add.text(10, 10, "-", { font: "bold 16px Arial" });
			scaleText = game.add.text(10, 60, "-", { font: "bold 16px Arial" });
			noteText = game.add.text(10, 85, "-", { font: "bold 16px Arial" });
			updateScoreText();
			updateScaleText();

			game.stage.backgroundColor = "#87CEEB";
			game.stage.disableVisibilityChange = true;
			game.physics.startSystem(Phaser.Physics.ARCADE);

			bird = game.add.sprite(80, 240, "bird");
			bird.anchor.set(0.5);
			game.physics.arcade.enable(bird);

			pipeGroup = game.add.group();
			game.time.events.loop(pipeInterval, addPipe); 
			addPipe();

            mouse = game.input.mousePointer;
            keyboard = game.input.keyboard;

            keyA = keyboard.addKey(Phaser.Keyboard.A);
            keyS = keyboard.addKey(Phaser.Keyboard.S);
            keyD = keyboard.addKey(Phaser.Keyboard.D);
            keyF = keyboard.addKey(Phaser.Keyboard.F);
            keyA.onDown.add(function() { playSound(0); }, this);
            keyS.onDown.add(function() { playSound(2); }, this);
            keyD.onDown.add(function() { playSound(4); }, this);
            keyF.onDown.add(function() { playSound(6); }, this);

            keyQ = keyboard.addKey(Phaser.Keyboard.Q);
            keyE = keyboard.addKey(Phaser.Keyboard.E);
            keyQ.onDown.add(prevScale, this);
            keyE.onDown.add(nextScale, this);

            music = game.add.audio('backgroundMusic');
            music.volume = 0.1;
            music.play();

		},
		update: function() {
			game.physics.arcade.collide(bird, pipeGroup, die);
			// if (bird.y > game.height) {
			// 	die();
			// }
			move();
			updateNoteText();
		}
	};
     
    game.state.add("Play", play);
    game.state.start("Play");
     
    function updateScoreText() {
		scoreText.text = "Score: " + score + "\nBest: " + topScore;
	}

	function updateScaleText() {
		scaleText.text = "Scale: " + currScale;
	}

	function updateNoteText() {
		let noteNumber = getNoteNumber();
		let note = fullPianoWeak[currScale][noteNumber];

		noteText.text = "Note: " + note;
	}	
     
	function move() {
		bird.body.position.y = mouse.position.y
	}

	function getNoteNumber() {
		return Math.floor((game.height - bird.body.position.y) / (game.height / numberOfIntervals));
	}

	function playSound(toneDelta=0) {
		let noteNumber = getNoteNumber();
		noteNumber += toneDelta;
		noteNumber = Math.max(noteNumber, 0);
		noteNumber = Math.min(noteNumber, numberOfIntervals-1);

		playNote(noteNumber, 'piano-weak', currScale);
	}

	function prevScale() {
		currScaleIndex--;
		if (currScaleIndex < 0) {
			currScaleIndex = scales.length - 1
		}

		currScale = scales[currScaleIndex];
		numberOfIntervals = fullPianoWeak[currScale].length;
		updateScaleText();
	}

	function nextScale(){
		currScaleIndex++;
		if (currScaleIndex > scales.length - 1) {
			currScaleIndex = 0
		}

		currScale = scales[currScaleIndex];
		numberOfIntervals = fullPianoWeak[currScale].length;
		updateScaleText();
	}
	
	function addPipe() {
		var pipeHolePosition = game.rnd.between(50, (height - 50) - pipeHole);
		var upperPipe = new Pipe(game, width, pipeHolePosition - height, -birdSpeed);
		game.add.existing(upperPipe);
		pipeGroup.add(upperPipe);
		var lowerPipe = new Pipe(game, width, pipeHolePosition + pipeHole, -birdSpeed);
		game.add.existing(lowerPipe);
		pipeGroup.add(lowerPipe);
	}
	
	function die() {
		localStorage.setItem("topFlappyScore", Math.max(score,topScore));
		music.stop();
		game.state.start("Play");	
	}
	
	Pipe = function (game, x, y, speed) {
		Phaser.Sprite.call(this, game, x, y, "pipe");
		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.velocity.x = speed;
		this.giveScore = true;	
	};
	
	Pipe.prototype = Object.create(Phaser.Sprite.prototype);
	Pipe.prototype.constructor = Pipe;
	
	Pipe.prototype.update = function() {
		if (this.x + this.width < bird.x && this.giveScore) {
			score += 0.5;
			updateScoreText();
			this.giveScore = false;
		}
		if (this.x < -this.width) {
			this.destroy();
		}
	};	
}

startGame();
