var unitOnThePanel ={};        // global variable which keeps track who is displayed on the control panel
var mapEditor = false; 					//global variable which toggles Map Editor and Game mode
var listOfCharacters;			// global variable which keeps track of the names of all objects in the game
var listOfUnits = [];				// global variable which keeps all mob and heroes names
var mapDataBase = {};			//global variable whick keeps all map objects. It needs to load and upload map from/to file.
var serviceObj = {};			//global object to hold different global functions which are used everywhere
var units = {};					//global object to hold all heroes, mobs, trees, houses and other objects
var viewportCoords = [];		//global variable array which holds the coordinates of the viewport
var multyplayer_game = false;		//global variable which define if we play multyplayer or single player game
var my_username = "";				//name of the user when it is multyplayer game
var sound = true;					//global variable which check if the sound is on

jQuery(document).ready(init);
function init() {
	mapDataBase = JSON.parse(map);
	var view = createView();  //display.js
	database(view);	  //database.js
	mapObjects(); //map_objects.js
	selection(view);   //selection.js
	scroll();   //scroll_map.js
	moving();  //moving.js
	attack(view);  //attack.js
	
	
	
	document.addEventListener("contextmenu", event => event.preventDefault());		//remove right click menu from everything
	setInterval(serviceObj.coords, 1000);							//show objects which are only in viewport. Hide objects outside viewport
	
	
	//save map button

	var save_map_button = document.getElementById("save_map_button");
	save_map_button.addEventListener("click", someFunction);

	function someFunction() {
		var file = new File(["var map = '" + JSON.stringify(mapDataBase) + "';"], "map.json", {type: "text/plain;charset=utf-8"});
		saveAs(file);
	}
	
	
	function makeVictory() {				//just fo testing purpose
		serviceObj.victory();
	}
	
	// end of multipurpose button
	
	var ask_music = document.getElementById("ask_music");							// at first we see only Sound panel query
	var game = document.getElementById("game");										
	game.style.display = "none";													//game screen is not visible yet
	var presentation = document.getElementById("presentation");
	presentation.style.display = "none";											//presentation screen is not visible yet
	
	var startbutton = document.getElementById("single_game_button");				//assigning buttons on the start screen
	startbutton.addEventListener("click", function() {
		serviceObj.startGame();
	});
	
	// presentation preparations
	
	var present_logo = document.getElementById("present_logo");					//making initial preparation for presentation screen
	var termenvox = document.getElementById("termenvox");
	var interactive_studio = document.getElementById("interactive_studio");
	var presents = document.getElementById("presents");
	
	present_logo.style.filter = "opacity(1)";								//present logo screen will be visible when start button pushed
	termenvox.style.opacity = "0";											// termenvox, int studio and presents - invisible
	interactive_studio.style.filter = "opacity(0)";							// actually style.filter = "opacity(1)" and style.opacity = "1" are the same. I just tested both variants 
	presents.style.filter = "opacity(0)";
	
	present_logo.style.transition = "filter 3s";							//assign some transition effects for opacity (remember what is written higher).
	termenvox.style.transition = "opacity 5s";								
	interactive_studio.style.transition = "filter 3s";
	presents.style.transition = "filter 3s";
	
	// end of presentation preparation
		
	var black_cover = document.getElementById("black_cover");				// introduction of black cover to cover all our changings between switching from one screen to another.
	black_cover.style.opacity = "1";										//initially black screen should be solid to cover map fully (later it will be beautifully removed (opacity 0) to beautifully reveal map
	black_cover.style.transition = "opacity 2s";							// and adding of some transition effects
	
	var start_music = document.getElementById("start_music");				// hide the panel with the start music	
	start_music.style.visibility = "hidden";
	
	var start_background = document.getElementById("start_background");			//make start background screen blur while asking about turn on/off sound
	start_background.style.filter = "blur(5px) brightness(0.7)";
	
	var sound_on = document.getElementById("sound_on");						//assigning sound turning on/off functions to buttons on ask music panel
	var sound_off = document.getElementById("sound_off");
	sound_on.addEventListener("click", soundOn);
	sound_off.addEventListener("click", soundOff);
	
	function soundOn() {
		sound = true;
		askMusicHide();
		start_music.play();
	}
	
	function soundOff() {
		sound = false;
		askMusicHide();
	}
	
	function askMusicHide() {
		ask_music.style.display = "none";
		start_background.style.transition = "filter 1s";
		start_background.style.filter = "none";
	}
	
	serviceObj.startGame = function() {																//start game function
		var start_background = document.getElementById("start_background");
		var screen_width = window.innerWidth;
		/*toggleFullScreen();	*/														//turn on the full screen
		
		start_background.parentNode.removeChild(start_background);						//remove start page and ask music menu
		ask_music.parentNode.removeChild(ask_music);
		

		// need amendments - play music only if it is chosed by user on the first screen
		playGameMusic();													// begin to play game music
		
		var show_pres = true;												//specify if the presentation screen will be shown before game starts
		
		if (show_pres) {													
			showPresentation();												//show presentation
			var game_screen_delay = 10000;									// then in 10 sec after start game finally Game Screen appears
		} else {
			var game_screen_delay = 1;										// do not show presentation and show game screen immidiately
		}
		
		setTimeout(function() {
			presentation.parentNode.removeChild(presentation);
			game.style.display = "block";
			black_cover.offsetHeight;										//remember all these .offsetHeight; just to force JS engine update screen (it's a bug actually).
			black_cover.style.opacity = "0";								//beautifully reveal map after presentation screen disappears
			
			var black_cover_remove_delay = 1000;
			setTimeout(function() {
				black_cover.parentNode.removeChild(black_cover);
			}, black_cover_remove_delay);
			
		}, game_screen_delay);
		
	}
	
	function showPresentation() {											// function to show presentation
		presentation.style.display = "block";								//show presentation screen
				
		termenvox.offsetHeight;												//at first TermenVox logo goes (offsetHeight is just a service function to force the browser enjine to update visual screen)
		termenvox.style.opacity = "0.7";
				
		var inter_studio_delay = 3000;										// then in 3 sec delay after start game Interactive studio goes
		setTimeout(function() {
			interactive_studio.offsetHeight;
			interactive_studio.style.filter = "opacity(0.7)";
		}, inter_studio_delay);
		
		var presents_delay = 5000;											// then in 5 sec delay after start game Presents goes
		setTimeout(function() {
			presents.offsetHeight;
			presents.style.filter = "opacity(0.7)";
		}, presents_delay);
		
		var present_logo_remove_delay = 8000;								// then in 8 sec delay after start game all the Presentation logo (Termenvox int studio presents) removed
		setTimeout(function() {
			present_logo_remove_delay.offsetHeight;
			present_logo.style.filter = "opacity(0)";
		}, present_logo_remove_delay);
	}
	
	function playGameMusic() {
		var listOfSongs = [
				"game/sounds/game_track_0.mp3",
				"game/sounds/game_track_1.mp3",
				"game/sounds/game_track_2.mp3"
				];

		var i = -1;		
		playMusic();
		
		function playMusic() {
			i++;
			if (i < listOfSongs.length) {
				startMusic();				
			} else {
				i = 0;
				startMusic();
			}
		}

		function startMusic() {
			var game_music = new Audio(listOfSongs[i]);
			game_music.addEventListener("ended", playMusic);
			if (sound) {
				game_music.volume = 0.5;
			} else {
				game_music.volume = 0;
			}
			game_music.play();
			console.log(listOfSongs[i]);
		}
	}

	window.addEventListener("keydown", turnSoundOnOff);		//turn sound on/off

	function turnSoundOnOff(e) {
		if (e.type === "keydown") {
			var key = e.keyCode;
			if (key === 83) {
				sound = !sound;
				console.log("Sound is " + sound);
			}
		}
	}
	
	function notImportantStuff() {   // show coords and so on.
		var body = document.getElementsByTagName("BODY")[0];
		window.addEventListener("mousemove", showCoord);
	
		function showCoord(e) {
			var x = e.pageX;
			var y = e.pageY;
			var coor = "Coordinates: (" + x + "," + y + ")";
			document.getElementById("coords").innerHTML = coor;
		}
	}
	
	notImportantStuff(); // show coords and so on.

	var multiplayer_initialized = false;			//multiplayer initialisation - check to initialise its variables and event listeners only once. To avoid new initialisation after reconnect.
	var socket;
	var user_made_choice = false;						//keeps bulean about if user has made his choise
	var userChoiseName = "";											//keeps the name of the hero user chose
	var game_class_id = "";											//inner identificator for hero
				
	//multyplayer button
	$("#multiplayer_button").click(function() {
		if (!multiplayer_initialized) {							//if it is our first click - we do all initialisation. If it is our second and etc. click - we just reconnect using socket.open()
			socket = io('https://game-sotn.appspot.com');
			multyplayer_game = true;
			multiplayer(socket, user_made_choice, userChoiseName, game_class_id);					//initialise all main multiplayer functions
		} else {
			socket.open();							//reconnection
		}		
		multiplayer_initialized = true;					//we made first initialisation
		$("#ask_name").show();							//show ask name window

	});


	//fast developing

	/*

	function fastDeveloping() {
		$("#ask_music").hide();
		start_background.style.filter = "none";
		$("#multiplayer_list").show();
	}
	


	fastDeveloping();


	//multyplayer test


	$("#fast_mult_test").click(fastMultyPlayerStart);

	// end of multyplayer test

	function fastMultyPlayerStart() {
		var username = makeUserName(8);
		console.log("Automated username is " + username);
		$("#multiplayer_button").trigger("click");
		$("#ask_name input").val(username);
		$("#ask_name button.enter_name").trigger("click");
		setTimeout(function() {
			var $heroes = $(".hero_block").not(".other_user_choice");
			var number = (Math.floor(Math.random() * $heroes.length));
			$heroes.eq(number).trigger("click");
			$("#multiplayer_list .ready").trigger("click");
		}, 1000);
		

		function makeUserName(length) {
			var text = "";
			var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
			for (var i = 0; i < length; i++) {
				text = text + letters.charAt(Math.floor(Math.random() * letters.length));
			}
			return text;
		}
	}

	//enf of multyplayer test

	*/












	
} //end of init function
	
	
