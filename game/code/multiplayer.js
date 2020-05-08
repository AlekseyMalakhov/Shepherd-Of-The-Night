function multiplayer(socket, user_made_choice, userChoiseName, game_class_id) {

	$(".hero.friend").append("<p class = 'player_name'></p>");
	
	$("#ask_name button.enter_name").click(function() {
		startSelection();
	});
	
	$("#ask_name input").keypress(function(e) {
		if (e.which === 13) {                         //enter key
			startSelection();
		}
	});

	//chat button

	$("#enter_message").submit(function(e) {      //trigger the submit event for the selected elements and attach a function to submited event
		e.preventDefault();             //prevents page reloading and actual submitting of the form
		socket.emit("chat message", $("#m").val(), my_username);     // .val - get the values of form elements, such as input, select, textarea etc. .emit - Emits an event to the socket identified by the string name. After comma any other parameters can be included. We included a value of the input field. So we emit the event to the socket "chat message" with the parameter - value of the input field
		$("#m").val("");          // then we clean the input field - empty string.
		return false;             // we can cancel the submit action by calling .preventDefault() on the event object or by returning false from our handler. So we did both of them
	});


	// selection buttons and blocks

	$("#multiplayer_list .hero_block").click(function() {						//selection of the hero
		if ((!user_made_choice) && ($(this).hasClass("other_user_choice") === false)) {
			$(".hero_block").removeClass("selected");											//remove all selections if there are some
			$(this).toggleClass("selected");			// we can select it only if nobody has selected it before
			if ($("#multiplayer_list .ready").is(":hidden")) {
				$("#multiplayer_list .ready").show();
			}	
		}			
	});


	$("#multiplayer_list .ready").click(function() {																										//confirm selection using Ready button
		if ($(".hero_block.selected").length > 0) {																																	// if we have selected hero
			$(".hero_block.selected").removeClass("selected").addClass("my_choice");						//determen our choice by dding a special class
			$(".hero_block.my_choice .selected_note").text("Selected: " + my_username).show();		//show the string Selected: Username
			$(this).hide();																																										//hide the Ready button
			$("#multiplayer_list h1").text("Wait for other players");																					// change main header text
			userChoiseName = $(".hero_block.my_choice h3").text();														// assign name of the hero to the variable
			game_class_id = $(".hero_block.my_choice").attr("game_class_id");									//get the gameclassid of the chosen hero
			socket.emit("user_choise", [my_username, userChoiseName, game_class_id]);													//emit the event for everybody
			user_made_choice = true;
			$(".hero_block").removeClass("hover");																			//not allow to hover after making choice
		}
	
	});

	$("#multiplayer_list .cancel").click(function() {
		console.log("Player canceled");
		if (user_made_choice) {
			$("#multiplayer_list h1").text("Choose your hero");	
			$(".hero_block.my_choice .selected_note").hide();
			$(".hero_block.my_choice").removeClass("my_choice");			
			$(".hero_block").not(".other_user_choice").addClass("hover");			
			socket.emit("user_canceled_hero", [my_username, userChoiseName, game_class_id]);
			user_made_choice = false;
			userChoiseName = "";
			game_class_id = "";
		} else {
			$("#multiplayer_list").hide();
			socket.disconnect();
			my_username = "";
			user_made_choice = false;
			userChoiseName = "";
			game_class_id = "";
		}
	});


	function startSelection() {													//after we ask name we start selection
		my_username = $("#ask_name input").val();
		if( my_username !== "") {
			$("#ask_name").fadeOut();
			socket.emit("user connected", my_username);
			console.log("we emited connection with username " + my_username);
			socket.emit("add user", my_username);
			$("#multiplayer_list").show();

		} else {
			$("#name_error").show();
		}
	}

	function updateUserList(users) {											//users object users.username = [userChoiseName, game_class_id]
		$("#players").empty();	
		var name;																						//update userlist
		for (name in users) {
			$("#players").append("<li>" + name + "</li>");
			if ((my_username !== name) && (users[name][1] !== "")) {						//check if hero was chosen by other user. If by other user - add class other_user_choice.
				$("div[game_class_id = " + users[name][1] + "]").addClass("other_user_choice").removeClass("hover");
				$("div[game_class_id = " + users[name][1] + "] .selected_note").text("Selected: " + name).show();			// show up the selected:name string
			} 
		}
	}

	// chat implementation

	socket.on("chat message", function(msg, user_name) {
		$("#messages").append($("<li>").html( function() {
			return "<b>" + user_name + "</b>:" + " &ensp; " + msg;
		}));
		var chat_height = $("#messages").prop("scrollHeight");
		$("#messages").scrollTop(chat_height);
	});

	socket.on("user connected", function(user_name, users) {						//user_name - user which has connected. Users - just all users
		$("#messages").append($("<li>").html( function() {
			return "<i>" + user_name + " connected" + "</i>";
		}));
		updateUserList(users);
	});

	socket.on("user disconnected", function(user_name, users) {			//user_name - user which has disconnected. Users - just all users
		if (user_name) {
			$("#messages").append($("<li>").html( function() {
				return "<i>" + user_name + " disconnected" + "</i>";
			}));
		}
		$("#players li:contains(" + user_name + ")").remove();
		if (users[user_name][1]) {
			$("div[game_class_id = " + users[user_name][1] + "]").removeClass("other_user_choice").addClass("hover");
			$("div[game_class_id = " + users[user_name][1] + "] .selected_note").hide();
		}																						
			
	});

	//hero selection

	socket.on("user_choise", function(data) {
		$("#messages").append($("<li>").html( function() {						//make a chat message
			return "<i>" + data[0] + " chose " + data[1] + "</i>";
		}));

		if (userChoiseName !== data[1]) {						//check if hero was chosen by other user. If by other user - add class other_user_choice.
			$("div[game_class_id = " + data[2] + "]").addClass("other_user_choice").removeClass("hover");
			$("div[game_class_id = " + data[2] + "] .selected_note").text("Selected: " + data[0]).show();			// show up the selected:name string
		} 
	});
	

	socket.on("user_canceled_hero", function(data) {
		$("#messages").append($("<li>").html( function() {						//make a chat message
			return "<i>" + data[0] + " canceled selection of " + data[1] + "</i>";
		}));

		if (userChoiseName !== data[1]) {						//check if hero was cancelled by other user. If by other user - remove class other_user_choice.
			$("div[game_class_id = " + data[2] + "]").removeClass("other_user_choice");
			if (!user_made_choice) {
				$("div[game_class_id = " + data[2] + "]").addClass("hover");
			}
			$("div[game_class_id = " + data[2] + "] .selected_note").hide();			// hide the selected:name string
		} 

	});	
		
	// end of hero selection

	//game start
	var players = {};												//this object will held some information about players
	serviceObj.userUnitID = "";											// this variable keeps the name of the unit player can directly manipulate
	socket.on("game_start", function(users) {						//after we get 3 players - start the game
		for (playername in users) {
			for (var i = 0; i < listOfUnits.length; i++) {
				var id = listOfUnits[i];
				var end = id.lastIndexOf("_");
				var game_type = id.slice(0, end);
				if (game_type === users[playername][1]) {					//if user chose morane, give him morane with available for current map id.
					players[playername] = {};
					players[playername].unitID = id;				//let's create players object which will have reference to units operated by players
					units[id].player_name = playername;
				}
			}
		}
		serviceObj.userUnitID = players[my_username].unitID;									// this unit can be manipulated by current user
		$("#" + serviceObj.userUnitID).addClass("my_unit");								//highlight user unit to himself				

		for (playername in players) {
			var id = players[playername].unitID;
			$("#" + id + " .player_name").text(playername);
		}
		startCountdown(5);
	});

	function startCountdown(time) {
		var time_left = time;
		count();
		function count() {
			$("#multiplayer_list h1").text("Game will start in " + time_left + " sec");
			time_left = time_left - 1;
			if (time_left >= 0) {
				setTimeout(count, 1000);
			} else {
				$("#multiplayer_list, #ask_name").remove();
				assignClickListerners();
				serviceObj.startGame();
			}
		}
	}

	//end of game start

	// moving and gameplay
	var multyplayer_who_clicked = "";									//control who clicked - we or another player

	function assignClickListerners() {									//assign click listerners for all players
		multyplayer_who_clicked = my_username;								//wait for our click

		for (var i = 0; i < listOfCharacters.length; i++) {				//assign clicks
			var id = listOfCharacters[i];
			$("#" + id).contextmenu(rightCLickManage);					//assign right click
		}

		$("#svg_background,#scroll_areas").contextmenu(rightCLickManage);		//assign right click


		function rightCLickManage(e) {
			if (multyplayer_who_clicked === my_username) {						// if it was our click - emit
				var x = e.pageX;
				var y = e.pageY;									//assign right click
				var target_id = e.target.id;
				socket.emit("right_click", my_username, x, y, target_id, serviceObj.userUnitID); 			// In multyplayer we emit only clicks on our unit. Unit which belongs to us
			}
			multyplayer_who_clicked = my_username;							//if it was not our click return it to initial state and wait for our click
		}
		
		$("#ability_button_1").click(function(e) {
			if (multyplayer_who_clicked === my_username) {						// if it was our click - emit
				socket.emit("ability1_click", my_username);		// we emit only our clicks
			}
			multyplayer_who_clicked = my_username;							//if it was not our click return it to initial state and wait for our click
			
		})
				

	}

	socket.on("right_click", function(multyplayer_username, x, y, target_id, selected_char_id) {
		multyplayer_who_clicked = multyplayer_username;
		if (multyplayer_username !== my_username) {						// we trigger only clicks of other users. Our ones we can handle ouselves.
			var mult_id = players[multyplayer_username].unitID;						//this is a unit which belongs to the mult user
			$("#" + target_id).trigger("contextmenu", [my_username, multyplayer_username, mult_id, x, y, selected_char_id]);
		}
	});

	socket.on("ability1_click", function(multyplayer_username) {
		multyplayer_who_clicked = multyplayer_username;					//for not to make emit-socket.on loop of one's click
		if (multyplayer_username !== my_username) {						// we trigger only clicks of other users. Our we can handle ouselves.
			var mult_id = players[multyplayer_username].unitID;
			$("#ability_button_1").trigger("mousedown", [mult_id]);
			multyplayer_who_clicked = my_username;							//return to the initial state and wait for our click
		}
			
	});

	// end of moving and gameplay


	//server restart
	$("#restart_server button").click(function() {
		console.log("server restarted");
		socket.emit("server_restart");
	});


	//end of server restart

	
	
	
}		//end of multyplayer function