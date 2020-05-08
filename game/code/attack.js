function attack(view) {
		
	serviceObj.giveSword = function() {										//gives a sword or a fireball to every character
		for (var i = 0; i < listOfCharacters.length; i++) {
			var characterID = listOfCharacters[i];
			var game_space = document.getElementById("game_space");
			if ((units[characterID].class_type === "hero" || units[characterID].class_type === "mob") && !units[characterID].weapon) {		//check if it is a hero without assigned weapon
				var character = document.getElementById(characterID);
				if (units[characterID].melee) {
					var sword = document.createElement("div");
					sword.style.backgroundImage = "url('game/images/sword.png')";
					sword.classList.add("sword");
					character.appendChild(sword);
					sword.style.display = "none";
				} else {
					var ball = document.createElement("div");
					ball.style.backgroundImage = "url('game/images/fireball.png')";
					ball.setAttribute("id", "ball_" + characterID);
					ball.classList.add("ball");
					ball.style.width = "20px";
					ball.style.height = "20px";
					game_space.appendChild(ball);
					ball.style.display = "none";
				}
				units[characterID].weapon = true;			// we make a note that this unit already has a weapon for not to assign it again
			}
		}
	}
	
	serviceObj.enableLifeBar = function() {									//gives a lifebar to every character
		for (var i = 0; i < listOfCharacters.length; i++) {
			var characterID = listOfCharacters[i];
			if ((units[characterID].class_type === "hero" || units[characterID].class_type === "mob") && !units[characterID].lifeBar) {		//check if it is a hero without assigned lifeBar
				var character = document.getElementById(characterID);
				var img_width = units[characterID].unit_width;
				var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				svg.setAttribute("width", img_width + 10);
				svg.setAttribute("height", 10);
				svg.setAttribute("id", "lifebar_" + characterID);
				svg.classList.add("lifebar");
				svg.style.display = "none";
				
				var lifebar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
				lifebar.setAttribute("width", img_width + 10);
				lifebar.setAttribute("height", 10);
				lifebar.setAttribute("x", 0);
				lifebar.setAttribute("y", 0);
				lifebar.style.fill = "#00ff19";
				
				svg.appendChild(lifebar);
				character.appendChild(svg);
				
				units[characterID].lifeBar = true;			// we make a note that this unit already has a lifeBar for not to assign it again
			}
		}
	}
	
	serviceObj.enableAbilities = function() {									//gives a healsign to every character
		for (var i = 0; i < listOfCharacters.length; i++) {
				var characterID = listOfCharacters[i];
				if (units[characterID].class_type !== "map_object" && units[characterID].class_type !== "mob" && !units[characterID].healSign) {
					$("#" + units[characterID].id).append("<div class = 'healSign'></div>").children(".healSign").hide();
					units[characterID].healSign = true;										// we make a note that this unit already has a healsign for not to assign it again
				}
				if (units[characterID].game_classID === "alucard") {
					$("#" + units[characterID].id).append("<div class = 'powerBlowSign'></div>").children(".powerBlowSign").hide();
				}
		}
	}
					
	
	serviceObj.showLifeBarOnHover = function() {							  // gives everybody possibility to show lifebar on hover
		for (var i = 0; i < listOfCharacters.length; i++) {
			var characterID = listOfCharacters[i];
			if ((units[characterID].class_type === "hero" || units[characterID].class_type === "mob") && !units[characterID].lifeBarOnHover) {		//check if it is a hero without assigned lifeBarOnHover
				var character = document.getElementById(characterID);
				character.addEventListener("mouseover", showLifeBar);
				character.addEventListener("mouseleave", unshowLifeBar);
				units[characterID].lifeBarOnHover = true;							// we make a note that this unit already has a lifeBarOnHover for not to assign it again
			}
		}
	}
	
	function showLifeBar(e) {									// showLifeBar on  hover
		if (e.target.classList.contains("hero") || e.target.classList.contains("mob")) {
			var key = e.target.id.replace("", "lifebar_");
			var lifebar = document.getElementById(key);
			lifebar.style.display = "block";
		}
	}
	
	function unshowLifeBar(e) {									// unshowLifeBar on  hover
		if (e.target.classList.contains("hero") || e.target.classList.contains("mob")) {
			var key = e.target.id.replace("", "lifebar_");
			var lifebar = document.getElementById(key);
			lifebar.style.display = "none";
		}
	}
	
	function restoreHealthAndMana() {					//every 5 sec health and mana will be increased
		restoration();
		function restoration() {
			for (var i = 0; i < listOfUnits.length; i++) {
				var characterID = listOfUnits[i];
				if (!units[characterID].dead) {
					var newHealthPoints = Math.floor(units[characterID].live_points + units[characterID].max_live_points/60);		// calculate new health and mana points
					var newManaPoints = Math.floor(units[characterID].mana_points + units[characterID].max_mana_points/60);
					if (newHealthPoints  > units[characterID].max_live_points) {													// check if unit has less than max health points
						newHealthPoints  = units[characterID].max_live_points;
					}
					if (newManaPoints  > units[characterID].max_mana_points) {													// check if unit has less than max health points
						newManaPoints  = units[characterID].max_mana_points;
					}
					units[characterID].live_points = newHealthPoints;						//update points
					units[characterID].mana_points = newManaPoints;
					units[characterID].updateTopLifeBar();							//update health bar above the head	and everything else	
					if (characterID === unitOnThePanel.id) {
						view.updateParamOnPanel(unitOnThePanel);
						view.updateManaLifePanel(unitOnThePanel);
						view.updateManaLifeBars(unitOnThePanel);
						view.updateAbilityButton(unitOnThePanel);
					}
				}
			}
		setTimeout(restoration, 5000);			//every 5 sec health and mana will be increased
		}
		
		
	}
	
	serviceObj.giveSword();
	serviceObj.enableLifeBar();
	serviceObj.showLifeBarOnHover();
	serviceObj.enableAbilities();
	restoreHealthAndMana();
}