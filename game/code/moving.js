function moving(){   //all the moving code
	$("#svg_background,#scroll_areas").contextmenu(getCoords);			//assign getCoords function to the right click

	serviceObj.assignBeTarget = function() {               //assign function beTarget for right click event to all characters from DB.
		for (var i = 0; i < listOfCharacters.length; i++) {
			var characterID = listOfCharacters[i];
			$("#" + characterID).contextmenu(getCoords);
		}
	}
	
	serviceObj.assignBeTarget();
	
	function getSelectedCharacters() {   //return the array of selected characters
		var selectedCharacters = [];
		var x;
		for (x in units) {
			if (units[x].selected) {
				selectedCharacters.push(x);
			}
		}
		if (multyplayer_game === true) {			//if it is multyplayer game
			selectedCharacters = [];
			selectedCharacters[0] = serviceObj.userUnitID;
		}
		return selectedCharacters;
	}
	
	function getCoords(e, username, multyplayer_username, mult_id, mult_x, mult_y, selected_char_id) {									//getCoords of the right click
		e.preventDefault();									//removes the Windows menu from rigth click
		if (!mapEditor) {									// if we are in Game Mode - we move
			var selectedCharacters = [];
			if (!multyplayer_username) {
				selectedCharacters = getSelectedCharacters(); 	//array of selected characters
			} else {
				selectedCharacters[0] = mult_id;		//if it was click from multyplayer user - he is selected character
			}
			var x;
			var y;
			if (e.target.classList.contains("hero") || e.target.classList.contains("mob")) {			//check what we click. If target - move to the target
				var targetID = e.target.id;
				x = units[targetID].position_X;
				y = units[targetID].position_Y;

				if (units[targetID].side === "friend") {
					sayYes(unitOnThePanel);
				} else {
					sayAttack(unitOnThePanel);
				}
				startMoving(selectedCharacters, x, y, targetID);
			} else {											//if map - go to some point on the map
				sayYes(unitOnThePanel);
				if (!multyplayer_username) {	// if it was click from multyplayer player - use it. If not - use our coords	
					x = e.pageX;
					y = e.pageY;
				} else {
					x = mult_x;					
					y = mult_y;
				}
				startMoving(selectedCharacters, x, y, "");
			}
		} else {													//if we are in MapEditor Mode - we delete unit by right click
			var unit = e.target;
			if (e.target.classList.contains("hero") || e.target.classList.contains("mob") || e.target.classList.contains("map_object") ) {		//delete JavaScript mapDataBase object property
				delete mapDataBase[unit.id];
				remove();
			}
			function remove() {
				unit.parentNode.removeChild(unit);			//delete DOM object
				delete units[unit.id];						//delete JavaScript units object property
				serviceObj.removeUnit(unit.id);
				serviceObj.updateList();					//update listOfCharacters and ListOfUnits global variable
				console.log(unit.id + " is deleted");
			}
			
		}
	}
	
	function startMoving(selectedCharacters, x, y, targetID) {
		var melee_coords = [];				// coords for melee units to create a  formation
		var ranged_coords = [];				// coords for ranged units to create a  formation
		var selectedMeleeCoords = [];		// starting coords of melee units
		var selectedRangedCoords = [];		// starting coords of ranged units
		var center = [];					// center of the formation
		var x1;
		var y1;
		if (selectedCharacters.length > 0) {											//create arrays of started coordinates of units
			for (var i = 0; i < selectedCharacters.length; i++) {
				var characterID = selectedCharacters[i];
				if (units[characterID].side === "friend" && !units[characterID].dead) {
					if (units[characterID].melee) {
						selectedMeleeCoords.push(units[characterID].position_X);
						selectedMeleeCoords.push(units[characterID].position_Y);
					} else {
						selectedRangedCoords.push(units[characterID].position_X);
						selectedRangedCoords.push(units[characterID].position_Y);
					}
				}
			}
		}
		
		center = findCenter(selectedMeleeCoords);			//find center of formation
		
		for (var i = 0; i < selectedCharacters.length; i++) {
			var characterID = selectedCharacters[i];
			if (units[characterID].side === "friend") {			//we can command to move only to friendly units
				var move_ID = units[characterID].moveID;				//take MoveId from the database
				
				if (units[characterID].moving) {				// handle redirecting already moving character
					units[characterID].going_around = false;	// remove going around privilege
					units[characterID].moving = false;
					clearTimeout(move_ID);					// stop the moveMe setTimeout instance if it exists
				}
				units[characterID].moving = true;
				units[characterID].target_id = targetID;	// if we are going to the map point, then target ID is empty string
				
				// coordinates changing  function
				
				if (selectedCharacters.length >= 1) {
					if (selectedMeleeCoords.length === 4) {				// if we have 2 melee units in formation
						if (units[characterID].melee) {					//create coords for melee units (first row)
							melee_coords = createMeleePoints();
							x1 = melee_coords[0];
							y1 = melee_coords[1];
						} else {										//create coords for ranged units (second row)
							ranged_coords = createRangePoints();				
							x1 = ranged_coords[0];
							y1 = ranged_coords[1];
						}
					}
					if (selectedMeleeCoords.length === 2) {				// if we have 1 melee unit in formation
						if (units[characterID].melee) {					//create coords for melee units (first row)
							x1 = x;
							y1 = y;
						} else {										//create coords for ranged units (second row)
							ranged_coords = createRangePoints();				
							x1 = ranged_coords[0];
							y1 = ranged_coords[1];
						}
					}
					if (selectedMeleeCoords.length > 4) {				// if we have more then 2 melee units in formation - go all in one point. It's just a patch.
						if (units[characterID].melee) {					// may be I will improve this function (if I need it).
							x1 = x;
							y1 = y;
						} else {										
							x1 = x;
							y1 = y;
						}
					}
					if (selectedMeleeCoords.length === 0) {				// if the last melee guy died
							x1 = x;										// just go and revenge him!
							y1 = y;										// or if only ranged unit is selected=))
					}
					
					
				}
				if (selectedCharacters.length === 1) {				//for one unit - just go where player clicked
					x1 = x;
					y1 = y;
				}
				
				function createMeleePoints() {				// create perpendicular to the last point, for units do not interfere with each other, so units go to different points
					var coordsOfPoint1 = [];
					var coordsOfPoint2 = [];
					var x1 = center[0];
					var y1 = center[1];
					var x2 = x;
					var y2 = y;

					var endLen1 = 75;		//with this unit always goes to the left
					var endLen2 = -75;		//with this unit always goes to the right
					
					coordsOfPoint1 = calculateCoords(endLen1);				// two variants of the route - go to the left and
					coordsOfPoint2 = calculateCoords(endLen2);				// go to the right of the dest point
					
					if (coordsOfPoint1[3] <= coordsOfPoint2[3]) {			// find the clousest route (go to the right or to the left)
						return coordsOfPoint1;
					} else {
						return coordsOfPoint2;
					}
						
					function calculateCoords(endLen) {
						var result = [];
						var px = y1 - y2; // as vector at 90 deg to the line
						var py = x2 - x1;
						var len = endLen / Math.hypot(px, py);
						px = px * len;  // make leng 75 pixels
						py = py * len;
						result[0] = Math.floor(x2 - px);					// x coord
						result[1] = Math.floor(y2 - py);					// y coord
						result[3] = units[characterID].checkDistance("", result[0], result[1]);			//and  distance
						return result;
					}
				} 			//end of createMeleePoints
				
				function createRangePoints() {				// create point for ranged units for they always be on the back of melee units
					var result = [];
					var x1 = center[0];
					var y1 = center[1];
					var x2 = x;
					var y2 = y;
					
					var a = x1 - x2;									
					var b = y1 - y2;
					var distance = Math.sqrt( a*a + b*b );
					var stay_back = 200;						//distance frome the first (melee row) to the second (ranged row)
					
					var t = stay_back/distance;				//ratio determines where the point of stay_back is.

					result[0] = Math.floor((1 - t) * x2 + t * x1);
					result[1] = Math.floor((1 - t) * y2 + t * y1);
					return result;
		
				}			//end of createRangePoints
				
								
				// end of cordinates changing function
				
				units[characterID].move(x1, y1);				// move
				
				
			}
		} 
		
		function findCenter(selectedMeleeCoords) {				//find center of formation (for now it is a center between 2 melee units)
			var result = [];
			if (selectedMeleeCoords.length === 4) {			// if there are 2 melee units
				result[0] = selectedMeleeCoords[0] + (selectedMeleeCoords[2] - selectedMeleeCoords[0]) * 0.50;		// X coords of the center
				result[1] = selectedMeleeCoords[1] + (selectedMeleeCoords[3] - selectedMeleeCoords[1]) * 0.50;		// Y coords of the center
			}
			if (selectedMeleeCoords.length === 2) {			// if there is  1 melee unit
				result[0] = selectedMeleeCoords[0];
				result[1] = selectedMeleeCoords[1];
			}
			return result;
			
		}
	}
	
	serviceObj.yes_sound = {};												// only if the previous phrase is ended we can say the next one
	serviceObj.yes_sound.ended = true;
	
	function sayYes(unitOnThePanel) {										//say yes phrase
		if (unitOnThePanel.class_type === "hero" && unitOnThePanel.side === "friend" && !unitOnThePanel.dead) {
			var game_classID = unitOnThePanel.game_classID;
			if (game_classID === "uter" || game_classID === "morane") {
				var sound_number = 1 + Math.floor(Math.random() * 4);
			} else {
				var sound_number = 1 + Math.floor(Math.random() * 5);				//randomly choose an yes sound
			}
			var sound_link = "game/sounds/" + game_classID + "/" + game_classID  + "Yes" + sound_number + ".wav";
			
			if (serviceObj.yes_sound.ended) {											// only if the previous phrase is ended we can say the next one
				serviceObj.yes_sound = new Audio(sound_link);
				if (sound) {
					serviceObj.yes_sound.volume = 0.8;
				} else {
					serviceObj.yes_sound.volume = 0;
				}
				
				if (!serviceObj.attack_sound.ended) {									// if somebody speaks - stop him
					serviceObj.attack_sound.pause();
					serviceObj.attack_sound = {};
					serviceObj.attack_sound.ended = true;
				}
				if (!serviceObj.select_sound.ended) {					// if somebody speaks - stop him
					serviceObj.select_sound.pause();
					serviceObj.select_sound = {};
					serviceObj.select_sound.ended = true;
				}
				serviceObj.yes_sound.play();
			}
			
		}
	}
	
	serviceObj.attack_sound = {};									// only if the previous phrase is ended we can say the next one
	serviceObj.attack_sound.ended = true;
	
	function sayAttack(unitOnThePanel) {								//say attack phrase
		if (unitOnThePanel.class_type === "hero" && unitOnThePanel.side === "friend" && !unitOnThePanel.dead) {
			var game_classID = unitOnThePanel.game_classID;
			var sound_number = 1 + Math.floor(Math.random() * 4);			//randomly choose an attack sound
			var sound_link = "game/sounds/" + game_classID + "/" + game_classID  + "Attack" + sound_number + ".wav";
			
			if (serviceObj.attack_sound.ended) {								// only if the previous phrase is ended we can say the next one
				serviceObj.attack_sound = new Audio(sound_link);
				if (sound) {
					serviceObj.attack_sound.volume = 0.8;
				} else {
					serviceObj.attack_sound.volume = 0;
				}
				
				if (!serviceObj.yes_sound.ended) {							// if somebody speaks - stop him
					serviceObj.yes_sound.pause();
					serviceObj.yes_sound = {};
					serviceObj.yes_sound.ended = true;
				}
				if (!serviceObj.select_sound.ended) {					// if somebody speaks - stop him
					serviceObj.select_sound.pause();
					serviceObj.select_sound = {};
					serviceObj.select_sound.ended = true;
				}
				serviceObj.attack_sound.play();
			}
		}
	}
	
} // end of moving function




	
	
	
	
	
	