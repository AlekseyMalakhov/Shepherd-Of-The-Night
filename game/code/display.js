function createView() {
	var map_editor = document.getElementById("map_editor");				//turn off editor panel on load
	map_editor.style.display = "none";
	
	var expBarFrame = document.getElementById("expBarFrame");			//make the expFrame border color black  - initial state
	expBarFrame.style.borderColor = "black";
	
	$("#ability_button_1").hide();										// hide the ability button - initial state
	
	$("#ability_button_1").mousedown(function(e, mult_id){						// apply click animation to ability button
		var heroID;
		if(mult_id) {															// if it is multyplayer triggered click use the proper unit ability
			heroID = mult_id;
		} else {												// if it is single player, or current player click - use person on screen
			heroID = unitOnThePanel.id;
		}
		var hero = units[heroID];								//we need exactly units object to work with because unitOnThePanel may change while setTimeout and cooldown will be removed from absolutely another unit than we intended. That's why we take from unitOnThePanel only it's ID and nothing more.
	
		if(!hero.cooldown) {
			if (!mult_id) {											// if it was our click do click animation and action
				$(this).css({												//press animation
					"top": "12px",
					"left": "877px",
					"height": "45px",
					"width": "45px",
					"background-size": "45px 45px"
				});
			
				var cooldown = 1500;											// cooldown time
				hero.cooldownID = setTimeout(cooldownFinish, cooldown);			//apply separate cooldown ID for every unit
				abilityВuttonAction();							//do all ability action
				hero.cooldown = true;
				view.updateAbilityButton(hero);					//make button brightness 50% and tip "Cooldown"

			} else {											// if it was multyplayer click - do only action
				abilityВuttonAction();
			}
			
		}

		function abilityВuttonAction() {
			if (hero.game_classID === "morane") {
				hero.heal();
			}
			if (hero.game_classID === "alucard") {
				hero.powerBlow();
			}
			if (hero.game_classID === "uter") {
				hero.blastWave();
			}
		}
		
		function cooldownFinish() {
			hero.cooldown = false;
			if (hero.id === unitOnThePanel.id && !mult_id) {		// if we are unit on the panel and we are in single game
				view.updateAbilityButton(hero);
			}
		}
	});
	
	$("#ability_button_1").mouseup(returnButtonSize);
	
	$("#ability_button_1").mouseleave(returnButtonSize);
	
	function returnButtonSize() {
		$(this).css({
			"top": "10px",
			"left": "875px",
			"height": "50px",
			"width": "50px",
			"background-size": "50px 50px"
		});
	}																// end of click animation
		
	
	var view = {};
	
	view.updateImgOnPanel = function(characterObj) {					// update image on the panel
		var img = document.getElementById("imageOnPanel");
		img.src = "game/images/" + characterObj.game_classID + ".jpg"
	}
	
	view.updateParamOnPanel = function(characterObj) {				//update parameters on the panel
		var selected_img_inf = document.getElementById("selected_img_inf");
		var game_class = document.getElementById("game_class");
		if (characterObj.class_type === "hero") {
			selected_img_inf.style.top = "38px";
			game_class.innerHTML = "Class: " + characterObj.game_class;
		} else {
			selected_img_inf.style.top = "8px";
			var attackType;
			if (characterObj.melee) {
				attackType = "melee";
				game_class.innerHTML = "Attack type: " + attackType;
			} else {
				attackType = "ranged";
				game_class.innerHTML = "Attack type: " + attackType;
			}
		}
		var name = document.getElementById("name");
		name.innerHTML = characterObj.name;
		var level = document.getElementById("level");
		level.innerHTML = "Level: " + characterObj.level;
		var class_type = document.getElementById("class_type");
		class_type.innerHTML = "Type: " + characterObj.class_type;
		var attackPower = document.getElementById("attack_power");
		attackPower.innerHTML = "Attack power: " + characterObj.attack_power;
	}
	
	view.updateManaLifePanel = function(characterObj) {	
		var life_points = document.getElementById("life_points");
		life_points.innerHTML = characterObj.live_points + "/" + characterObj.max_live_points;
		var mana_points = document.getElementById("mana_points");
		mana_points.innerHTML = characterObj.mana_points + "/" + characterObj.max_mana_points;
	}
	
	view.updateExpBar = function(characterObj) {
		if (characterObj.class_type === "hero") {
			var expSVG = document.getElementById("expbar");
			expSVG.style.width = Math.floor(characterObj.currentExp/characterObj.expToTheNextLevel * 375) + "px";
			var expBarText = document.getElementById("expBarText");
			expBarText.innerHTML = characterObj.currentExp + "/" + characterObj.expToTheNextLevel;
			var expBarFrame = document.getElementById("expBarFrame");
			expBarFrame.style.borderColor = "#bfbfbf";
		} else {
			var expSVG = document.getElementById("expbar");
			expSVG.style.width = "0px";
			var expBarText = document.getElementById("expBarText");
			expBarText.innerHTML = "";
			var expBarFrame = document.getElementById("expBarFrame");
			expBarFrame.style.borderColor = "black";
		}
	}
	
	view.updateManaLifeBars = function(characterObj) {
		var healthSVG = document.getElementById("healthbar");
		healthSVG.style.top = (1 - characterObj.live_points/characterObj.max_live_points) * 185 + "px";

		var manaSVG = document.getElementById("manabar");
		manaSVG.style.top = (1 - characterObj.mana_points/characterObj.max_mana_points) * 185 + "px";
	}
	
	view.updateAbilityButton = function(characterObj) {
		var helpText = {
			alucard: "Power deadly blow. Distance melee. " + characterObj.abilityManaCost + " mana",
			morane: "Heal friendly units. Distance - not limited. " + characterObj.abilityManaCost + " mana",
			uter: "Damage nearby enemy targets. Distance - 200. " + characterObj.abilityManaCost + " mana"
		};
		if (characterObj.class_type === "hero" && characterObj.side === "friend") {
			if (!multyplayer_game) {
				updateAbilityButtonMainCode();
			} else if (multyplayer_game && characterObj.player_name === my_username) {
				updateAbilityButtonMainCode();
			} else {
				$("#ability_button_1").hide();
			}
		}

		function updateAbilityButtonMainCode() {
			var url_link = "url(game/images/" + characterObj.game_classID + "_ability.jpg)";
			$("#ability_button_1").css("background-image", url_link);
			$("#ability_button_1").show();
			if(characterObj.cooldown) {
				$("#ability_button_1").css({"filter": "brightness(50%)"});
				$("#ability_button_1 span").text("Cooldown");
			} else {
				$("#ability_button_1").css({"filter": "brightness(100%)"});
				$("#ability_button_1 span").text(helpText[characterObj.game_classID]);
			}
			if (characterObj.mana_points < characterObj.abilityManaCost) {
				$("#ability_button_1").css({"filter": "brightness(50%)"});
				$("#ability_button_1 span").text("Not enough mana");
			}
		}
	}
	
	
	return view;
}