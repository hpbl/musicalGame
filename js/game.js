let startGame = function() {
	var width = 640 * 1.5;
	var height = 480 * 1.5;
	var game = new Phaser.Game(width, height, Phaser.CANVAS);

	var intervals = 48 // 87

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
     
    var play = function(game){}
     
    play.prototype = {
		preload:function(){
			game.load.image("bird", "resources/bird.png");
			game.load.image("pipe", "resources/pipe.png");
		},
		create:function(){
			pipeGroup = game.add.group();
			score = 0;
			topScore = localStorage.getItem("topFlappyScore")==null?0:localStorage.getItem("topFlappyScore");
			scoreText = game.add.text(10,10,"-",{
				font:"bold 16px Arial"
			});
			updateScore();
			game.stage.backgroundColor = "#87CEEB";
			game.stage.disableVisibilityChange = true;
			game.physics.startSystem(Phaser.Physics.ARCADE);
			bird = game.add.sprite(80,240,"bird");
			bird.anchor.set(0.5);
			game.physics.arcade.enable(bird);
            mouse = game.input.mousePointer;
			game.time.events.loop(pipeInterval, addPipe); 
			addPipe();
		},
		update:function(){
			game.physics.arcade.collide(bird, pipeGroup, die);
			if(bird.y>game.height){
				die();
			}
			move();
			if(mouse.isDown && !mousePlayed){
				mousePlayed = true;
            	game.input.mouse.requestPointerLock();
				playSound();
			}
			else if (!mouse.isDown){
				mousePlayed = false;
			}
		}
	};
     
    game.state.add("Play",play);
    game.state.start("Play");
     
    function updateScore(){
		scoreText.text = "Score: "+score+"\nBest: "+topScore;	
	}
     
	function move(){
		bird.body.position.y = mouse.position.y
	}

	function playSound(){
		//calculo da nota correspondente
		let noteNumber = Math.floor((game.height - bird.body.position.y)/(game.height/intervals))
		playNote(noteNumber, 'piano-weak');
	}
	
	function addPipe(){
		var pipeHolePosition = game.rnd.between(50,(height-50)-pipeHole);
		var upperPipe = new Pipe(game,width,pipeHolePosition-height,-birdSpeed);
		game.add.existing(upperPipe);
		pipeGroup.add(upperPipe);
		var lowerPipe = new Pipe(game,width,pipeHolePosition+pipeHole,-birdSpeed);
		game.add.existing(lowerPipe);
		pipeGroup.add(lowerPipe);
	}
	
	function die(){
		localStorage.setItem("topFlappyScore",Math.max(score,topScore));	
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
		if(this.x+this.width<bird.x && this.giveScore){
			score+=0.5;
			updateScore();
			this.giveScore = false;
		}
		if(this.x<-this.width){
			this.destroy();
		}
	};	
}