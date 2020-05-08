function selection(view) {
	var selecting_frame = document.getElementById("svg_selecting_frame");
	window.addEventListener("keydown", removeSelection);		//handle ESC button to remove selection
	window.addEventListener("keydown", select);					//handle shortcut buttons to select heroes


	var previousSelectedSet = [];						//keeps array of units which were selected previously
	var waitingSelectionSet = [];						//keeps array of units which are waiting to be selected

	serviceObj.handleSelection =  function() {               //assign function Select for click event to all heroes from DB.
		for (var i = 0; i < listOfCharacters.length; i++) {
			var characterID = listOfCharacters[i];
			if (units[characterID].class_type === "hero" || units[characterID].class_type === "mob") {
				var character = document.getElementById(characterID);
				character.addEventListener("click", select);
				character.addEventListener("mousedown", startDrawSelection);
				character.addEventListener("mouseup", startDrawSelection);
				character.addEventListener("mousemove", startDrawRect);
			}
		}
	}
	
	serviceObj.handleSelection();
	
	function changeSVG(x1, y1, x2, y2) {
		var coords = x1 + "," + y1 + " " +
					x1 + "," + y2 + " " +
					x2 + "," + y2 + " " +
					x2 + "," + y1;
		selecting_frame.setAttribute("points", coords);
	}
	
	function select(e) {                                  // handle left click event or selection shortcuts and assign a "selected" attribute to an object
		if (e.type === "click") {
			var characterID = e.target.id;
			if (characterID === "") {					   //if we clicked on the sword, ball, healsign ar any other element which belongs to the hero but does not have a personal ID, we traverse up to it's parent (hero/mob).
				characterID = e.target.offsetParent.id;
			}
			mainSelectionBody(characterID);

		}
		if (e.type === "keydown") {
			var key = e.keyCode;
			/*if (key === 48) {									//shortcuts for heroes
				var characterID = "alucard_1534019075836";
				mainSelectionBody(characterID);
			}
			if (key === 57) {
				var characterID = "uter_1531157162426";
				mainSelectionBody(characterID);
			}
			if (key === 56) {
				var characterID = "morane_1531157156915";
				mainSelectionBody(characterID);
			}*/
		}
	}
		
	function mainSelectionBody(characterID) {
		var character = document.getElementById(characterID);
		if (character.classList.contains("dead")) {
			console.log("It's a dead guy - do nothing");			// if this unit is dead - do nothing
		} else {
			unitOnThePanel = units[characterID];					//add selected unit to the control panel
			updateUnitOnPanel();
			saySelect(characterID);									// say selected phrase
			if (character.classList.contains("selected")) {				// if this unit is selected - do nothing
				console.log("It's a selected guy - do nothing");	
			} else {
				if (previousSelectedSet.length !== 0) {							//at first if previous chars exists we remove selection from them and clean array
					for (var i = 0; i < previousSelectedSet.length; i++) {
						var previousChar = document.getElementById(previousSelectedSet[i]);
						previousChar.classList.remove("selected");
						units[previousSelectedSet[i]].selected = false;
					}
					previousSelectedSet = [];
				}
																//then we assign selected to a new char and make a new selection set array
				if (character.classList.contains("hero") || character.classList.contains("mob")) {		//sometimes not "hero" elements can interfere - we eliminate it
					character.classList.add("selected");
					units[characterID].selected = true;
				}
				previousSelectedSet.push(characterID);		
			}
		}
	}
	
	
	function updateUnitOnPanel() {
		view.updateImgOnPanel(unitOnThePanel);
		view.updateParamOnPanel(unitOnThePanel);
		view.updateManaLifePanel(unitOnThePanel);
		view.updateExpBar(unitOnThePanel);
		view.updateManaLifeBars(unitOnThePanel);
		view.updateAbilityButton(unitOnThePanel);
	}
		
	function removeSelection(e) {			//handle ESC button to remove selection
		var key = e.keyCode;
		if (key === 27) {
			selectedCharID = [];
			unitOnThePanel = {};
			for (var i = 0; i < listOfCharacters.length; i++) {
				var characterID = listOfCharacters[i];
				var character = document.getElementById(characterID);
				if (character.classList.contains("selected")) {
						character.classList.remove("selected");
						units[characterID].selected = false;
				}
			}
			
			var img = document.getElementById("imageOnPanel");			//update all panel elements to initial state
			img.src = "game/images/blackbox.jpg"
			var name = document.getElementById("name");
			name.innerHTML = "";
			var level = document.getElementById("level");
			level.innerHTML = "";
			var class_type = document.getElementById("class_type");
			class_type.innerHTML = "";
			var game_class = document.getElementById("game_class");
			game_class.innerHTML = "";
			var attackPower = document.getElementById("attack_power");
			attackPower.innerHTML = "";
			var life_points = document.getElementById("life_points");
			life_points.innerHTML = "";
			var mana_points = document.getElementById("mana_points");
			mana_points.innerHTML = "";
			var expSVG = document.getElementById("expbar");
			expSVG.style.width = "0px";
			var expBarText = document.getElementById("expBarText");
			expBarText.innerHTML = "";
			var expBarFrame = document.getElementById("expBarFrame");
			expBarFrame.style.borderColor = "black";
			var healthSVG = document.getElementById("healthbar");
			healthSVG.style.top = "200px";
			var manaSVG = document.getElementById("manabar");
			manaSVG.style.top = "200px";
			$("#ability_button_1").hide();
		}
	}	
	
	// multiple selection
	
	window.addEventListener("keydown", stopSelection);			//handle ESC button to stop Selection rect

	var scroll_areas = document.getElementById("scroll_areas");
	var svg = document.getElementById("svg_background");
	var controlpanel = document.getElementById("controlpanel");
	var black_cover = document.getElementById("black_cover");

	scroll_areas.addEventListener("mousemove", startDrawRect);			//assign function to draw Selection Rect to whole gaming screen
	svg.addEventListener("mousemove", startDrawRect);
	controlpanel.addEventListener("mousemove", startDrawRect);
	black_cover.addEventListener("mousemove", startDrawRect);
				
	scroll_areas.addEventListener("mousedown", startDrawSelection);				//assign function to toggle Selection Rect to whole gaming screen
	svg.addEventListener("mousedown", startDrawSelection);
	controlpanel.addEventListener("mousedown", startDrawSelection);
	black_cover.addEventListener("mousedown", startDrawSelection);
	
	scroll_areas.addEventListener("mouseup", startDrawSelection);				//assign function to toggle Selection Rect to whole gaming screen
	svg.addEventListener("mouseup", startDrawSelection);
	controlpanel.addEventListener("mouseup", startDrawSelection);
	black_cover.addEventListener("mouseup", startDrawSelection);
	
	var rectCoords = [];        //array with Rect coordinates
	var click = 0;              // toggle on/off drawing Selection rect
	
	
	function startDrawSelection(e) {
		if (e.button === 0) {
			if (click === 0) {
				click = 1;
				return;
			}
			if (click === 1) {
				rectCoords = [];
				changeSVG(0, 0, 1, 1);			// remove rect
				click = 0;
				if (!units[e.target.id] ||			// we apply selected only if we the lst click was on the ground or unselected unit. If selected - we just change the unitOnPanel
					units[e.target.id].class_type === "hero" && !units[e.target.id].selected) {
					applySelected();
				}
				return;
			}
		}
	}
	
			
	function startDrawRect(e) {      // for every frame create array of coordinates of Rect, then clean old and draw a new one
		if (click === 1) {
			if (rectCoords.length === 0) {				//let's assign a first point of the rect
				rectCoords[0] = e.pageX;
				rectCoords[1] = e.pageY;
			} else {
				rectCoords[2] = e.pageX;				// second point will be constantly changing
				rectCoords[3] = e.pageY;				
				changeSVG(0, 0, 1, 1);														//clean svg after the previous frame
				checkSelected(rectCoords);													// check if any objects fall into selecting rect in current frame
				changeSVG(rectCoords[0], rectCoords[1], rectCoords[2], rectCoords[3]);		// draw rect in current frame
			}
		}
		
		if (click === 0) {
			return;
		}
	}
	
	function stopSelection(e) {			//handle ESC button to stop Selection rect
		var key = e.keyCode;
		if (key === 27) {
			click = 0;
			changeSVG(0, 0, 1, 1);									//clean svg if we stop selection
			rectCoords = [];
			for (var i = 0; i < listOfCharacters.length; i++) {
				var characterID = listOfCharacters[i];
				var character = document.getElementById(characterID);
				if (character.classList.contains("waiting_selection")) {
					character.classList.remove("waiting_selection");
				}
			}
		}
	}
	
	function checkSelected(rectCoords) {		//check coordinates of all heroes in the map if they fall into our set of coordinates
		var x1 = rectCoords[0];
		var y1 = rectCoords[1];
		var x2 = rectCoords[2];
		var y2 = rectCoords[3];

		for (var i = 0; i < listOfCharacters.length; i++) {
			var characterID = listOfCharacters[i];
			if (units[characterID].class_type === "hero" || units[characterID].class_type === "mob") {
				var character = document.getElementById(characterID);
				var x0 = units[characterID].position_X;
				var y0 = units[characterID].position_Y;
				
				checking();
			}
			
			function checking() {				// function just to not to stop executing of the main function with return statements
				if (x1 <= x0 && x0 <= x2) {
					if (y1 <= y0 && y0 <= y2) {
						character.classList.add("waiting_selection");
						if (waitingSelectionSet.indexOf(characterID) === -1) {
								waitingSelectionSet.push(characterID);
						}
						return;
					}
					if (y1 >= y0 && y0 >= y2) {
						character.classList.add("waiting_selection");
						if (waitingSelectionSet.indexOf(characterID) === -1) {
								waitingSelectionSet.push(characterID);
						}
						return;
					}
				}
				if (x1 >= x0 && x0 >= x2) {
					if (y1 <= y0 && y0 <= y2) {
						character.classList.add("waiting_selection");
						if (waitingSelectionSet.indexOf(characterID) === -1) {
								waitingSelectionSet.push(characterID);
						}
						return;
					}
					if (y1 >= y0 && y0 >= y2) {
						character.classList.add("waiting_selection");
						if (waitingSelectionSet.indexOf(characterID) === -1) {
								waitingSelectionSet.push(characterID);
						}
						return;
					}
				}
				if (waitingSelectionSet.indexOf(characterID) !== -1) {
						character.classList.remove("waiting_selection");
						var del = waitingSelectionSet.indexOf(characterID);
						waitingSelectionSet.splice(del, 1);  					//remove unit from waitingSelectionSet
				}
			}
		}
	}
	
	function applySelected() {                      				 // final apply elements to selected class
		if (previousSelectedSet.length !== 0 && waitingSelectionSet.length !== 0) {							//if previous chars exists we remove selection from them and clean array. If we click just clean ground (waitingSelectionSet.length = 0) - we do nothing	
			for (var i = 0; i < previousSelectedSet.length; i++) {
				var previousChar = document.getElementById(previousSelectedSet[i]);
				previousChar.classList.remove("selected");
				units[previousSelectedSet[i]].selected = false;
			}
			previousSelectedSet = [];
		}
		for (var i = 0; i < listOfCharacters.length; i++) {			//and only then we begin to apply selection and compose a new selection set array
			var characterID = listOfCharacters[i];
			var character = document.getElementById(characterID);
			if (waitingSelectionSet.indexOf(characterID) !== -1) {
				character.classList.remove("waiting_selection");
				var del = waitingSelectionSet.indexOf(characterID);			//remove unit from waitingSelectionSet
				waitingSelectionSet.splice(del, 1);
				if (units[characterID].dead) {
					console.log("It's a dead guy - do nothing");			// if this unit is dead - do nothing
				} else {
					if (!units[characterID].selected) {
						character.classList.add("selected");
						units[characterID].selected = true;
						unitOnThePanel = units[characterID];					//add selected unit to the control panel
						updateUnitOnPanel();
						previousSelectedSet.push(characterID);
					}
				}
			}
		}
	}
	
	// end of multiple selection

	serviceObj.select_sound = {};									// only if the previous phrase is ended we can say the next one
	serviceObj.select_sound.ended = true;
	
	function saySelect(characterID) {											//say select sound
		if (units[characterID].class_type === "hero" && units[characterID].side === "friend") {
			var game_classID = units[characterID].game_classID;
			if (game_classID === "uter") {
				var sound_number = 1 + Math.floor(Math.random() * 4);
			} else {
				var sound_number = 1 + Math.floor(Math.random() * 5);				//randomly choose a select sound
			}
			var sound_link = "game/sounds/" + game_classID + "/" + game_classID  + "Select" + sound_number + ".wav";
			
			if (serviceObj.select_sound.ended) {								// only if the previous phrase is ended we can say the next one
				serviceObj.select_sound = new Audio(sound_link);
				if (sound) {
					serviceObj.select_sound.volume = 0.8;
				} else {
					serviceObj.select_sound.volume = 0;
				}
				
				if (!serviceObj.yes_sound.ended) {								// if somebody speaks - stop him
					serviceObj.yes_sound.pause();
					serviceObj.yes_sound = {};
					serviceObj.yes_sound.ended = true;
				}
				if (!serviceObj.attack_sound.ended) {									// if somebody speaks - stop him
					serviceObj.attack_sound.pause();
					serviceObj.attack_sound = {};
					serviceObj.attack_sound.ended = true;
				}
				serviceObj.select_sound.play();
			}
		}
	}
	
}