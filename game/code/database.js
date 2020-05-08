function database(view) {
	
	var chars = {
		alucardParameters: {
				id: "alucard_",
				name: "Alucard",
				class_type: "hero",
				game_class: "Forest warder",
				game_classID: "alucard",
				level: "",
				currentExp: 0,
				expForDeath: "",
				expToTheNextLevel: "",
				side: "friend",
				sex: "male",
				selected: false,
				being_hit: false,
				dead: false,
				moving: false,
				moving_speed: 1,
				moveID: "",
				going_around: false,
				position_X: "",
				position_Y: "",
				unit_width: 70,
				unit_height: 70,
				face_left: false,
				isAttacking: false,
				melee: true,
				attack_power: 120,
				max_live_points: 1200,
				max_mana_points: 350,
				live_points: "",
				mana_points: "",
				attack_dist: 85,
				target_id: "",
				shell_target: "",
				background_image: "url('game/images/alucard.jpg')",
				weapon: false,
				lifeBar: false,
				lifeBarOnHover: false,
				cooldown: false,
				abilityManaCost: 100
		},

		moraneParameters: {
				id: "morane_",
				name: "Morane",
				class_type: "hero",
				game_class: "Dark hunter",
				game_classID: "morane",
				level: "",
				currentExp: 0,
				expForDeath: "",
				expToTheNextLevel: "",
				side: "friend",
				sex: "female",
				selected: false,
				being_hit: false,
				dead: false,
				moving: false,
				moving_speed: 1,
				moveID: "",
				going_around: false,
				position_X: "",
				position_Y: "",
				unit_width: 70,
				unit_height: 70,
				face_left: false,
				isAttacking: false,
				melee: false,
				attack_power: 80,
				max_live_points: 800,
				max_mana_points: 500,
				live_points: "",
				mana_points: "",
				attack_dist: 400,
				target_id: "",
				shell_target: "",
				background_image: "url('game/images/morane.jpg')",
				weapon: false,
				lifeBar: false,
				lifeBarOnHover: false,
				cooldown: false,
				abilityManaCost: 150
		},


		baltazarParameters: {
				id: "baltazar_",
				name: "Shepard of the Night",
				class_type: "hero",
				game_class: "Demon",
				game_classID: "baltazar",
				level: "",
				currentExp: 0,
				expForDeath: "",
				expToTheNextLevel: "",
				side: "enemy",
				sex: "male",
				selected: false,
				being_hit: false,
				dead: false,
				moving: false,
				moving_speed: 1,
				moveID: "",
				going_around: false,
				position_X: "",
				position_Y: "",
				unit_width: 100,
				unit_height: 100,
				face_left: false,
				isAttacking: false,
				melee: true,
				attack_power: 500,
				max_live_points: 6000,
				max_mana_points: 3000,
				live_points: "",
				mana_points: "",
				attack_dist: 85,
				target_id: "",
				shell_target: "",
				background_image: "url('game/images/baltazar.jpg')",
				weapon: false,
				lifeBar: false,
				lifeBarOnHover: false,
				cooldown: false,
				abilityManaCost: 0
		},


		uterParameters: {
				id: "uter_",
				name: "Uter",
				class_type: "hero",
				game_class: "Magic tree",
				game_classID: "uter",
				level: "",
				currentExp: 0,
				expForDeath: "",
				expToTheNextLevel: "",
				side: "friend",
				sex: "male",
				selected: false,
				being_hit: false,
				dead: false,
				moving: false,
				moving_speed: 1,
				moveID: "",
				going_around: false,
				position_X: "",
				position_Y: "",
				unit_width: 70,
				unit_height: 70,
				face_left: false,
				isAttacking: false,
				melee: true,
				attack_power: 110,
				max_live_points: 1000,
				max_mana_points: 350,
				live_points: "",
				mana_points: "",
				attack_dist: 85,
				target_id: "",
				shell_target: "",
				background_image: "url('game/images/uter.jpg')",
				weapon: false,
				lifeBar: false,
				lifeBarOnHover: false,
				cooldown: false,
				abilityManaCost: 150
		},
		
		centaurParameters: {
				id: "centaur_",
				name: "Centaur",
				class_type: "mob",
				game_class: "",
				game_classID: "centaur",
				level: "",
				currentExp: 0,
				expForDeath: "",
				expToTheNextLevel: "",
				side: "enemy",
				sex: "male",
				selected: false,
				being_hit: false,
				dead: false,
				moving: false,
				moving_speed: 1,
				moveID: "",
				going_around: false,
				position_X: "",
				position_Y: "",
				unit_width: 70,
				unit_height: 70,
				face_left: false,
				isAttacking: false,
				melee: true,
				attack_power: 110,
				max_live_points: 700,
				max_mana_points: 250,
				live_points: "",
				mana_points: "",
				attack_dist: 85,
				target_id: "",
				shell_target: "",
				background_image: "url('game/images/centaur.jpg')",
				weapon: false,
				lifeBar: false,
				lifeBarOnHover: false,
				cooldown: false,
				abilityManaCost: 0
		},
		
		dark_mageParameters: {
				id: "dark_mage_",
				name: "Dark mage",
				class_type: "mob",
				game_class: "",
				game_classID: "dark_mage",
				level: "",
				currentExp: 0,
				expForDeath: "",
				expToTheNextLevel: "",
				side: "enemy",
				sex: "male",
				selected: false,
				being_hit: false,
				dead: false,
				moving: false,
				moving_speed: 1,
				moveID: "",
				going_around: false,
				position_X: "",
				position_Y: "",
				unit_width: 70,
				unit_height: 70,
				face_left: false,
				isAttacking: false,
				melee: false,
				attack_power: 90,
				max_live_points: 700,
				max_mana_points: 250,
				live_points: "",
				mana_points: "",
				attack_dist: 400,
				target_id: "",
				shell_target: "",
				background_image: "url('game/images/dark_mage.jpg')",
				weapon: false,
				lifeBar: false,
				lifeBarOnHover: false,
				cooldown: false,
				abilityManaCost: 0
		},
		
		lichParameters: {
				id: "lich_",
				name: "Lich",
				class_type: "mob",
				game_class: "",
				game_classID: "lich",
				level: "",
				currentExp: 0,
				expForDeath: "",
				expToTheNextLevel: "",
				side: "enemy",
				sex: "male",
				selected: false,
				being_hit: false,
				dead: false,
				moving: false,
				moving_speed: 1,
				moveID: "",
				going_around: false,
				position_X: "",
				position_Y: "",
				unit_width: 70,
				unit_height: 70,
				face_left: false,
				isAttacking: false,
				melee: false,
				attack_power: 110,
				max_live_points: 700,
				max_mana_points: 250,
				live_points: "",
				mana_points: "",
				attack_dist: 400,
				target_id: "",
				shell_target: "",
				background_image: "url('game/images/lich.jpg')",
				weapon: false,
				lifeBar: false,
				lifeBarOnHover: false,
				cooldown: false,
				abilityManaCost: 0
		},
		
		phantom_assassinParameters: {
				id: "phantom_assassin_",
				name: "Phantom assassin",
				class_type: "mob",
				game_class: "",
				game_classID: "phantom_assassin",
				level: "",
				currentExp: 0,
				expForDeath: "",
				expToTheNextLevel: "",
				side: "enemy",
				sex: "female",
				selected: false,
				being_hit: false,
				dead: false,
				moving: false,
				moving_speed: 1,
				moveID: "",
				going_around: false,
				position_X: "",
				position_Y: "",
				unit_width: 70,
				unit_height: 70,
				face_left: false,
				isAttacking: false,
				melee: true,
				attack_power: 110,
				max_live_points: 700,
				max_mana_points: 250,
				live_points: "",
				mana_points: "",
				attack_dist: 85,
				target_id: "",
				shell_target: "",
				background_image: "url('game/images/phantom_assassin.jpg')",
				weapon: false,
				lifeBar: false,
				lifeBarOnHover: false,
				cooldown: false,
				abilityManaCost: 0
		},
		
		stone_giantParameters: {
				id: "stone_giant_",
				name: "Stone giant",
				class_type: "mob",
				game_class: "",
				game_classID: "stone_giant",
				level: "",
				currentExp: 0,
				expForDeath: "",
				expToTheNextLevel: "",
				side: "enemy",
				sex: "male",
				selected: false,
				being_hit: false,
				dead: false,
				moving: false,
				moving_speed: 1,
				moveID: "",
				going_around: false,
				position_X: "",
				position_Y: "",
				unit_width: 70,
				unit_height: 70,
				face_left: false,
				isAttacking: false,
				melee: true,
				attack_power: 110,
				max_live_points: 1000,
				max_mana_points: 200,
				live_points: "",
				mana_points: "",
				attack_dist: 85,
				target_id: "",
				shell_target: "",
				background_image: "url('game/images/stone_giant.jpg')",
				weapon: false,
				lifeBar: false,
				lifeBarOnHover: false,
				cooldown: false,
				abilityManaCost: 0
		},
		
		warlordParameters: {
				id: "warlord_",
				name: "warlord",
				class_type: "mob",
				game_class: "",
				game_classID: "warlord",
				level: "",
				currentExp: 0,
				expForDeath: "",
				expToTheNextLevel: "",
				side: "enemy",
				sex: "male",
				selected: false,
				being_hit: false,
				dead: false,
				moving: false,
				moving_speed: 1,
				moveID: "",
				going_around: false,
				position_X: "",
				position_Y: "",
				unit_width: 70,
				unit_height: 70,
				face_left: false,
				isAttacking: false,
				melee: true,
				attack_power: 110,
				max_live_points: 700,
				max_mana_points: 200,
				live_points: "",
				mana_points: "",
				attack_dist: 85,
				target_id: "",
				shell_target: "",
				background_image: "url('game/images/warlord.jpg')",
				weapon: false,
				lifeBar: false,
				lifeBarOnHover: false,
				cooldown: false,
				abilityManaCost: 0
		}
	};
	
			
	function Hero(parameters, X, Y, id, level) {								//creating of an usual hero unit
		this.id = id;
		this.name = parameters.name;
		this.class_type = parameters.class_type;
		this.game_class = parameters.game_class;
		this.game_classID = parameters.game_classID;
		this.level = level;
		this.currentExp = parameters.currentExp;
		this.expForDeath = 200 + level * 100;
		this.expToTheNextLevel = 200 + level * 100;
		this.side = parameters.side;
		this.sex = parameters.sex;
		this.selected = parameters.selected;
		this.being_hit = parameters.being_hit;
		this.dead = parameters.dead;
		this.moving = parameters.moving;
		this.moving_speed = parameters.moving_speed + (level - 1) * 15 ;
		this.moveID = parameters.moveID;
		this.going_around = parameters.going_around;
		this.position_X = X;
		this.position_Y = Y;
		this.unit_width = parameters.unit_width;
		this.unit_height = parameters.unit_height;
		this.face_left = parameters.face_left;
		this.isAttacking = parameters.isAttacking;
		this.melee =  parameters.melee;
		this.attack_power = parameters.attack_power + (level - 1) * 20;
		this.max_live_points = parameters.max_live_points + (level - 1) * 450;
		this.max_mana_points = parameters.max_mana_points + (level - 1) * 450;
		this.live_points = parameters.max_live_points + (level - 1) * 450;
		this.mana_points = parameters.max_mana_points + (level - 1) * 450;
		this.attack_dist = parameters.attack_dist;
		this.target_id = parameters.target_id;
		this.shell_target = parameters.shell_target;
		this.background_image = parameters.background_image;
		this.weapon = parameters.weapon;
		this.lifeBar = parameters.lifeBar;
		this.lifeBarOnHover = parameters.lifeBarOnHover;
		this.cooldown = parameters.cooldown;
		this.abilityManaCost = parameters.abilityManaCost + (level - 1) * 70;
		this.player_name = "";
	}
	
	Hero.prototype.load = function() {							//loading unit to DOM
		var hero = document.createElement("div");
		hero.setAttribute("id", this.id);
		hero.style.left = this.position_X - this.unit_width/2 + "px";
		hero.style.top = this.position_Y - this.unit_height/2 + "px";
		hero.style.width = this.unit_width + "px";
		hero.style.height = this.unit_height + "px";
		hero.style.zIndex = "5";
		hero.style.backgroundImage = this.background_image;
		hero.style.backgroundSize = this.unit_width + "px" + " " + this.unit_height + "px";
		hero.classList.add(this.class_type);
		hero.classList.add(this.side);
		var game_space = document.getElementById("game_space");
		game_space.appendChild(hero);
		
	};
	
	Hero.prototype.updateProp = function() {							//update units properties for example after gain level
		this.expForDeath = 200 + this.level * 100;
		this.expToTheNextLevel = 200 + this.level * 100;
		this.moving_speed = this.moving_speed + (this.level - 1) * 15 ;
		this.attack_power = this.attack_power + (this.level - 1) * 20;
		this.max_live_points = this.max_live_points + (this.level - 1) * 450;
		this.max_mana_points = this.max_mana_points + (this.level - 1) * 450;
		this.live_points = this.max_live_points;
		this.mana_points = this.max_mana_points;
		this.abilityManaCost = this.abilityManaCost + (this.level - 1) * 70;
	};
	
	
	
	Hero.prototype.attack = function() {		//at first do some preparation and assign all the nessassary variables
		if (!mapEditor) {
			this.isAttacking = true;				// we elliminate the possibility to attack again if multiclick
			var $sword = $("#" + this.id + " .sword");
			var unit = this;
			var target;
			var strike_delay = Math.floor(Math.random() * 500);			// make a random delay for people do not strike each other at the same time, at first it separates sounds for they do not overlap and the second it looks more realistic
			setTimeout(strike, strike_delay);
			
			function strike() {
				var targetID = unit.target_id;
				target = document.getElementById(targetID);
				if (targetID) {															//check if we have been redirected to a land point
					if (!units[targetID].dead && unit.target_id && !unit.dead) {				//check if somebody has already killed our target ot if we have been redirected to another point or we are dead=))
						var distance = unit.checkDistance(targetID);						//if target is running out- chase it
						if (distance > unit.attack_dist && units[targetID].moving) {
							unit.chase();
							unit.isAttacking = false;
							return;
						}																	
						$sword.show();
						
						// sound
						var sound_number = Math.floor(Math.random() * 6);				//randomly choose a strike sound
						var sound_link = "game/sounds/sword_" + sound_number + ".mp3";
						var strike_sound = new Audio(sound_link);
						if (sound) {
							strike_sound.volume = 0.4;
						} else {
							strike_sound.volume = 0;
						}
						strike_sound.play();
						//end sound
						
						target.style.zIndex = "4";									//put the target a little bit down to show the sword if unit cover the sword
						var timeoutID = window.setTimeout(hideSword, 500);							// after 0.5 sec we hide sword
						
						unit.afterStrike();				//do all the calculations and checks after every strike (calculate health, display health, etc.)
						
						if (units[targetID].live_points > 0) {			//check if target still alive
							setTimeout(strike, 1000);
						} else {
							console.log(targetID + " is dead");
							units[targetID].die();							//target dies
							unit.afterKill();		//do all the actions after kill (calculate experience, set to zero target_id variable, check for level UP and so on
							return;
						}
					} else {
						unit.target_id = "";				// reset to zero target_id property in case somebody killed the target before us
						unit.isAttacking = false;
					}
				} else {
					unit.target_id = "";				// reset to zero target_id property in case we have been redirected to a land point
					unit.isAttacking = false;
				}
					
			}
		}
		
		function hideSword() {					//hide the sword and put the target z-index back to show aword in any case
			$sword.hide();
			target.style.zIndex = "5";
		}
	}
	
	Hero.prototype.afterStrike = function(type) {			//do all the calculations and checks after every strike (calculate health, display health and so on)
		var targetID = this.target_id;
		if (!targetID) {							// if we redirected our caracter (target Id is empty string) while the shell is flying - we will use the shell target instead (it remembers the last attacked target)
			targetID = this.shell_target;
			console.log("Unit redirected - we use shell target for the current strike");
		}
		if (type === "power_blow") {															//check if it was usual strike or power blow (Alukard ability)
			units[targetID].live_points = units[targetID].live_points - this.attack_power*4;		//calculate life points after the power Blow (Alukard)
			console.log("Power Blow!!!");
			this.mana_points = this.mana_points - this.abilityManaCost;
		}
		if (type === "blast_wave") {															//check if it was usual strike or power blow (Alukard ability)
			units[targetID].live_points = units[targetID].live_points - this.attack_power*1.5;		//calculate life points after the power Blow (Alukard)
			console.log("Blast Wave!!!");
		} else {
			units[targetID].live_points = units[targetID].live_points - this.attack_power;		//calculate life points after the usual strike
		}
			
		if (units[targetID].live_points < 0) {		
			units[targetID].live_points = 0;
		}
		
		if (this.mana_points  < 0) {		
			this.mana_points  = 0;
		}
		
		if (unitOnThePanel.id === targetID || unitOnThePanel.id === this.id) {
			view.updateManaLifePanel(unitOnThePanel);	//update life_points on the panel (if unit is selected)
			view.updateManaLifeBars(unitOnThePanel);	//update healthBar on the panel (if unit is selected)
		}
		units[targetID].updateTopLifeBar();				//update lifebar above the head
	}
	
	Hero.prototype.updateTopLifeBar = function() {						//update lifebar above the head
		var lifebar = document.getElementById("lifebar_" + this.id);
		var lifebarWidth = Number(lifebar.getAttribute("width"));
		lifebarWidth = Math.floor(this.live_points/this.max_live_points * (this.unit_width + 10));		//calculate width of the lifebar above the head of the character
		if (lifebarWidth < 0) {
			lifebarWidth = 0;
		}
		lifebar.setAttribute("width", lifebarWidth);				//end of updating lifebar on the screen
	}
	
	
	Hero.prototype.afterKill = function() {
		this.isAttacking = false;						//now we can attack again
		var targetID = this.target_id;
		if (!targetID) {							// if we redirected our caracter (target Id is empty string) while the shell is flying - we will use the shell target instead (it remembers the last attacked target)
			targetID = this.shell_target;
			console.log("Unit redirected - we use shell target for the current strike");
		}
		var numberOfFriends = 0;
		if (this.side === "enemy" && this.class_type === "hero") { 									// if unit is from enemy side it takes all experience to himself
			this.currentExp = this.currentExp + units[targetID].expForDeath;
		}
		var x;
		for (x in units) {																			//firs of all we calculate the number of friends to divide the experience
			if (units[x].class_type === "hero") {
				if (this.side === "friend" && units[x].side === "friend" && !units[x].dead) { 
					numberOfFriends = numberOfFriends + 1;
				}
			}
		}
		for (x in units) {											// if unit is from friend side it divides all experience between his alive friends
			if (units[x].class_type === "hero") {
				if (this.side === "friend" && units[x].side === "friend" && !units[x].dead) {
					units[x].currentExp = Math.floor(units[x].currentExp + units[targetID].expForDeath/numberOfFriends);
				}
			}
		}
		this.target_id = "";						// reset to zero target_id property
		this.shell_target = "";						// reset to zero shell_target property
		for (x in units) {							// check for level UP and if it is - UP
			if (units[x].class_type === "hero") {
				units[x].checkForLevelUp();
			}				
		}
		view.updateExpBar(unitOnThePanel);		// update  experience bar on the panel
		if (units[targetID].game_classID === "baltazar") {		//if we killed the main boss - victory
			serviceObj.victory();
		}
	}
	
	Hero.prototype.chase = function() {							//chasing if target is running out of us
		var x = units[this.target_id].position_X;
		var y = units[this.target_id].position_Y;
		this.moving = true;
		this.move(x, y);
		console.log(this.id +" chases " + this.target_id + " to " + x + "  " +y);
	}
		
		
	Hero.prototype.die = function() {						//handle die action
		if (this.sex === "male") {											//randomly choose a death sound
			var sound_number = Math.floor(Math.random() * 6);
			var sound_link = "game/sounds/male_scream_" + sound_number + ".mp3";
		} else {
			var sound_number = Math.floor(Math.random() * 3);
			var sound_link = "game/sounds/female_scream_" + sound_number + ".mp3";
		}
		var death_sound = new Audio(sound_link);
		if (sound) {
			death_sound.volume = 0.2;
		} else {
			death_sound.volume = 0;
		}
		death_sound.play();
		
		this.dead = true;
		this.target_id = "";
		var character = document.getElementById(this.id);
		var dead_img = document.createElement("img");
		dead_img.src = "game/images/dead.png"
		dead_img.setAttribute("id", "dead_img_" + this.id);
		dead_img.classList.add("dead");
		dead_img.style.width = this.unit_width + "px";
		dead_img.style.height = this.unit_height + "px";
		character.appendChild(dead_img);
		if (character.classList.contains("friend")) {
			character.classList.remove("friend");
		}
		if (character.classList.contains("enemy")) {
			character.classList.remove("enemy");
		}
		character.classList.add("dead");
		serviceObj.removeUnit(this.id);
	}
	
	Hero.prototype.checkDistance = function(targetID, destX, destY) {
		if (targetID) {										// if we have specified target - calculate distance to it
			var x = this.position_X;
			var x0 = units[targetID].position_X;
			var y = this.position_Y;
			var y0 = units[targetID].position_Y;
			var a = x - x0;
			var b = y - y0;
			var distance = Math.sqrt( a*a + b*b );
		} else {											// if we do not have target - calculate distance to specified points
			var x = this.position_X;
			var x0 = destX;
			var y = this.position_Y;
			var y0 = destY;
			var a = x - x0;
			var b = y - y0;
			var distance = Math.sqrt( a*a + b*b );
		}
		return distance;
	}
	
	Hero.prototype.checkForLevelUp = function() {				//check should we increase level or not. And if yes - how we should do it
		if (this.currentExp >= this.expToTheNextLevel) {
			console.log(this.id + " level up!");
			this.currentExp = this.currentExp - this.expToTheNextLevel;
			this.level = this.level + 1;
			this.updateProp();
			this.updateTopLifeBar();
			this.levelUpAnimation();

			if (unitOnThePanel.id === this.id ) {
				view.updateImgOnPanel(this);
				view.updateParamOnPanel(this);
				view.updateManaLifePanel(this);
				view.updateExpBar(this);
				view.updateManaLifeBars(this);
				view.updateAbilityButton(this);
			}
		}
	}
	
	Hero.prototype.levelUpAnimation = function() {				//levelUp animation
		var unit = document.getElementById(this.id);
		var wasSelected;
		var isFriend;
		var isEnemy;
		var stage = 0;
		if (unit.classList.contains("selected")) {
			wasSelected = true;
			unit.classList.remove("selected");
		}
		if (unit.classList.contains("friend")) {
			isFriend = true;
			unit.classList.remove("friend");
		}
		if (unit.classList.contains("enemy")) {
			isEnemy= true;
			unit.classList.remove("enemy");
		}
		levelUpAnimat();

		function levelUpAnimat() {
			if (stage === 0) {
				unit.classList.add("levelUp_1");
				stage = stage + 1;
				setTimeout(levelUpAnimat, 300);
				return;
			}
			if (stage === 1) {
				unit.classList.remove("levelUp_1");
				unit.classList.add("levelUp_2");
				stage = stage + 1;
				setTimeout(levelUpAnimat, 300);
				return;
			}
			if (stage === 2) {
				unit.classList.remove("levelUp_2");
				if (wasSelected) {
					unit.classList.add("selected");
				}
				if (isFriend) {
					unit.classList.add("friend");
				}
				if (isEnemy) {
					unit.classList.add("enemy");
				}
				return;
			}
		}
	}
	
	Hero.prototype.distAttack = function() {		// distance attack function
		if (!mapEditor) {
			this.isAttacking = true;					// we elliminate the possibility to attack again if multiclick
			var $ball = $("#" + "ball_" + this.id);
			
			var unit = this;
			distStrike();
			function distStrike() {
				var targetID = unit.target_id;
				unit.shell_target = unit.target_id;
				if (targetID) {
					if (!units[targetID].dead && unit.target_id && !unit.dead) {				//check if somebody has already killed our target or if we have been redirected to another point or we are dead=))
						var distance = unit.checkDistance(targetID);						//if target is running out- chase it
						if (distance > unit.attack_dist && units[targetID].moving) {
							unit.isAttacking = false;										//now we can attack again
							unit.chase();
							return;
						}
						var x0 = unit.position_X - 10;					
						var x1 = units[targetID].position_X - 10;
						var y0 = unit.position_Y - 10;
						var y1 = units[targetID].position_Y - 10;

						$ball.css("left", x0 + "px");
						$ball.css("top", y0 + "px");
						$ball.show();
						
						// sound
						var sound_number = Math.floor(Math.random() * 3);				//randomly choose a strike sound
						var sound_link = "game/sounds/fireball_" + sound_number + ".mp3";
						var strike_sound = new Audio(sound_link);
						if (sound) {
							strike_sound.volume = 0.4;
						} else {
							strike_sound.volume = 0;
						}						
						strike_sound.play();
						//end sound
						
						var line = lineCoords(x0, y0, x1, y1);			//calculate the coordinates object using Bresenham's line algorithm
						var i = 0;
						moveShell();
					} else {
						unit.target_id = "";				// reset to zero target_id property in case somebody killed the target before us
						unit.isAttacking = false;			// now we can attack again
					}
				} else {
					unit.target_id = "";				// reset to zero target_id property in case somebody killed the target before us
					unit.isAttacking = false;			// now we can attack again
				}
				
				function moveShell() {						// move the shell along the calculated line
					if (i >= line.X.length) {			//check if the shell has hit the target
						unit.afterStrike();				//do all the calculations and checks after every strike (calculate health, display health, etc.)
						$ball.hide();
						if (units[targetID].live_points > 0) {			//check if target still alive
							setTimeout(distStrike, 1000);
						} else {
							if (!units[targetID].dead) {				// check if we killed the target or smb before us. If the target is already oficially dead - then smb was before us. Then we just reset our attack variables
								units[targetID].die();							//target dies
								unit.afterKill();		//do all the actions after kill (calculate experience, set to zero target_id variable, check for level UP and so on
							} else {
								unit.target_id = "";				// reset to zero target_id property in case somebody killed the target before us
								unit.isAttacking = false;
							}							
						}
						return;
					}
					if (i < line.X.length) {						//if shell has not hit the target yet - then fly further
						$ball.css("left", line.X[i] + "px");
						$ball.css("top", line.Y[i] + "px");
						i = i + 20;
						setTimeout(moveShell, 10);
					}
				}
			}
		}
	}
	
	Hero.prototype.heal = function() {								//heal ability
		if(!this.dead && this.mana_points >= this.abilityManaCost) {
			this.mana_points = this.mana_points - this.abilityManaCost;
				
			if (this.mana_points  < 0) {		
				this.mana_points  = 0;
			}
			
			if (unitOnThePanel.id === this.id) {
				view.updateManaLifePanel(unitOnThePanel);	//update life_points on the panel (if unit is selected)
				view.updateManaLifeBars(unitOnThePanel);	//update healthBar on the panel (if unit is selected)
			}
			// sound
			var heal_sound = new Audio("game/sounds/heal.mp3");
			if (sound) {
				heal_sound.volume = 0.4;
			} else {
				heal_sound.volume = 0;
			}
			heal_sound.play();
			//end sound
			
			var x;
			for (x in units) {																
				$("#" + units[x].id + " .healSign").fadeIn("slow").fadeOut("slow");				//we choose only units which have class .healSign (means our friends)
				if (units[x].class_type === "hero" && 
					units[x].side === "friend" && 
					!units[x].dead &&
					units[x].live_points < units[x].max_live_points) {
						units[x].live_points =  units[x].live_points + 100 + (units[x].level - 1) * 100;
						if (units[x].live_points > units[x].max_live_points) {
							units[x].live_points = units[x].max_live_points;
						}
						if (unitOnThePanel.id === units[x].id) {
							view.updateManaLifePanel(unitOnThePanel);				//update life_points on the panel (if unit is selected)
							view.updateManaLifeBars(unitOnThePanel);				//update healthBar on the panel (if unit is selected)
						}
						units[x].updateTopLifeBar();								//update lifebar above the head
				
				}
			}
		}
	}
	
	Hero.prototype.powerBlow = function() {
		var targetID = this.target_id;
		var target = document.getElementById(targetID);
		var distance = this.checkDistance(targetID);						//check distance
		if(targetID && !this.dead && this.mana_points  >= this.abilityManaCost && !units[targetID].dead && distance <= this.attack_dist) {
			$("#" + this.id).children(".powerBlowSign").fadeIn("fast").delay(500).fadeOut("fast");		//powerBlow animation
		
			// sound
			var sound_number = Math.floor(Math.random() * 3);				//randomly choose a strike sound
			var sound_link = "game/sounds/powerBlow_" + sound_number + ".mp3";
			var strike_sound = new Audio(sound_link);
			if (sound) {
				strike_sound.volume = 0.4;
			} else {
				strike_sound.volume = 0;
			}
			
			strike_sound.play();
			//end sound
						

			target.style.zIndex = "4";									//put the target a little bit down to show the sword if unit cover the sword
			this.afterStrike("power_blow");				//do all the calculations and checks after every strike (calculate health, display health, etc.)

			
			if (units[targetID].live_points <= 0) {			//check if target still alive
				console.log(targetID + " is dead");
				units[targetID].die();							//target dies
				this.afterKill();		//do all the actions after kill (calculate experience, set to zero target_id variable, check for level UP and so on
				return;
			}

		}
	}
	
	Hero.prototype.blastWave = function() {
		if(!this.dead && this.mana_points >= this.abilityManaCost) {
			this.mana_points = this.mana_points - this.abilityManaCost;
			
			if (this.mana_points  < 0) {		
				this.mana_points  = 0;
			}
			
			if (unitOnThePanel.id === this.id) {
				view.updateManaLifePanel(unitOnThePanel);	//update life_points on the panel (if unit is selected)
				view.updateManaLifeBars(unitOnThePanel);	//update healthBar on the panel (if unit is selected)
			}
			
			
			// sound
			var sound = new Audio("game/sounds/blastwave.mp3");
			if (sound) {
				sound.volume = 0.4;
			} else {
				sound.volume = 0;
			}
			sound.play();
			//end sound
			var x0 = this.position_X;										//animation starts
			var y0 = this.position_Y;
			var wave = Snap("#svg_background").select("circle").attr({
				cx: x0,
				cy: y0,
				stroke: "red"
			}).animate({r: 200}, 150, step2);
			function step2() {
				wave.attr({
					stroke: "transparent",
					r: 0
					});
			}																//animation ends
			
			//code to damage nearby units. Distance 200
			
			var result = [];
			for (var i = 0; i < listOfUnits.length; i++) {
				var enemyID = listOfUnits[i];
				if (enemyID !== this.id) {
					var distance = this.checkDistance(enemyID);
					if (distance < 200 && !units[enemyID].dead && (this.side !== units[enemyID].side)) {		//if unit sees an enemy
						
						this.target_id = enemyID;
						
						this.afterStrike("blast_wave");				//do all the calculations and checks after every strike (calculate health, display health, etc.)
						
						if (units[enemyID].live_points <= 0) {			//check if target still alive
							console.log(enemyID + " is dead");
							units[enemyID].die();							//target dies
							this.afterKill();		//do all the actions after kill (calculate experience, set to zero target_id variable, check for level UP and so on
						}
					}
										
				}
			}
					
			//end of the code to damage nearby units
		}
	}
	
	
	
	Hero.prototype.move = function(x1, y1) {						//handle movement 
		var unit = this;
		var character = document.getElementById(this.id);
		var targetID = this.target_id;
		if (targetID) {
			var targetIDsize = (units[targetID].unit_width + units[targetID].unit_height)/2;		// we assess the size of our target to not to overlap with it when reach
		}
		var x0 = this.position_X;
		var y0 = this.position_Y;
		var line = lineCoords(x0, y0, x1, y1);			//calculate the coordinates object using Bresenham's line algorithm
		
		var i = 0;
		
		if (x0 !== x1 || y0 !== y1) {
			moveCharacter();
		} else {
			console.log("The same point");
		}
				
		function moveCharacter() {			// moving function
			if (!unit.moving) {
				console.log("Programm moveCharacter stops the " + unit.id);
				return;
			}
			if (unit.dead) {
				console.log("Can't move - I am dead");
				return;
			}
			if ((targetID) && !unit.going_around && units[targetID].moving) {				// if target is moving, we take its new coordinates and chasing it. We will not chase target in going around mode, because in going around mode we get new coords and using current logic, we will think that target is moving. Adding this to ability walk through the caracters in going around mode it will bring us to coming in the center of target. So first finish going around, than try to chase. And we will not chase target which does not move because otherwise we will every step recalculate coordinates of the enemy and will not be able to keep distance between each other (each selected unit, see coordinate changes function in moving.js)
				var new_x = units[targetID].position_X;
				var new_y = units[targetID].position_Y;
				if (new_x !== x1 || new_y !== y1) {
					x0 = unit.position_X;
					y0 = unit.position_Y;
					x1 = new_x;
					y1 = new_y;
					
					line = lineCoords(x0, y0, x1, y1);			//recalculate the coordinates object using Bresenham's line algorithm
					i = 1;
				}
			}
			
			if (i >= line.X.length) {					// if we came to destination point and we are not in going around mode it means it is our real dest point  so we just stop
				if (!unit.going_around){
					unit.moving = false;
					return;
				}
				if (unit.going_around){						// If we came to destination point in going around mode, it means it is not our real dest point. It is just point in 10px left or rigth and so on from the point we hit another caracter. We call the function go around, which see that we are in going around mode, and it will remove this mode from us and provide us with old coordinates and try to send us to the old destination point. If we encounter another character againg we will run the going around function again. If we susseed and the way will be free - we continue to walk to destination point without any interruptions.
					goAround(x1, y1, anotherCharacterID);
					return;
				}
			}
			if (i < line.X.length) {				//if we are not at the end, we try to make  a step
				if (checkDist()[0] == true) {					//if way is free, we make a step
					makeStep();
				}
				
				var distance;						//intoduction of a new variable for distance calculation
				
				if (targetID) {								// if we have the target after every step we calculate distance to it
					distance = unit.checkDistance(targetID);
					
				} else {									// if we do not, we just calculate distance to the dist point
					distance = unit.checkDistance("", x1, y1);
				}
				
				if (distance < unit.attack_dist && !unit.melee && targetID && unit.side !== units[targetID].side) {   // after every step we try to shoot
					if (!unit.isAttacking) {
						unit.distAttack();
						return;
					} else {
						return;
					}
				}
				
				if (i < line.X.length && checkDist()[0] == false) {		// if we are still not in the dest point and if way is not free, it means we reach some character. We should now check if it our target, or point near target. we get the anotherCaracter ID which prevents us from moving
					var anotherCharacterID = checkDist()[1];		// if we are not in a going around mode and we are almost near the destination point - we give up and just stop. We can't do the same in going around mode, because our destination point in this mode is just 10 px aside (see new Coords function). We move with very little movements, trying to go around.
					if (!unit.going_around){
						if (distance < targetIDsize + 10) {		// we do not make explicit check if anotherCharacterID is enemy. Instead we just check the distance to our target. If distance is less then 80, we assume we are near our target and will try to attack it. It will help us not to be redirected to another enemy on our way to the targeted point.
							unit.moving = false;
							if (targetID && unit.side !== units[targetID].side && !unit.isAttacking) {
								unit.attack();											//if target is of opposite side we will attack it
							}
							return;
						} else {													// if we are not in the going around mode and far away of destination point we start going around mode
							goAround(x1, y1, anotherCharacterID);
							return;
						}
					}
					if (unit.going_around){			// if we are already in going around mode - we do make a step neglecting that we hit another caracter and even probably go throuh it (x and y coordinates are provided by goingAround function - see going around function)
						makeStep();
					}
				}
				unit.moveID = setTimeout(moveCharacter, 8);			//in the end call the move function again
			}
		}						//end of moveCharacter function
		
		
		function makeStep() {			// just one simple step function
			if (i > line.X.length-1) {
				unit.moving = false;
				console.log("There is no such i in line array");
				return;
			}
			character.style.left = line.X[i] - unit.unit_width/2 + "px";
			character.style.top =  line.Y[i] - unit.unit_height/2 + "px";
			unit.position_X = line.X[i];
			unit.position_Y = line.Y[i];
			i = i + 1;
		}
		
		function checkDist() {                         //check distance to other objects
			var result = [];
			for (var i = 0; i < listOfCharacters.length; i++) {
				var anotherCharacterID = listOfCharacters[i];
				var anotherCharacterIDsize = (units[anotherCharacterID].unit_width + units[anotherCharacterID].unit_height)/2;
				if (anotherCharacterID === unit.id) {
				} else {
					var distance = unit.checkDistance(anotherCharacterID);
					if (distance < anotherCharacterIDsize + 10) {
						result[0] = false;
						result[1] = anotherCharacterID;
						return result;
					}									
				}
			}
			result[0] = true;
			return result;
		}		// end of CheckDist function
				
		function goAround(x1, y1, anotherCharacterID) {			// go around the object. In general it is a new dest point in very near of current position (just in 10 px right or left and so on - see the NewCoords function). In this mode we can go through another unit without any problems. So we reach our destination point in any case.
			if (!unit.going_around){ 							// if we have just begun to go around - lets going around
				var x0 = units[anotherCharacterID].position_X;
				var y0 = units[anotherCharacterID].position_Y;
				var currentX = unit.position_X;
				var currentY = unit.position_Y;
				oldCoord[0] = x1;
				oldCoord[1] = y1;
				var newX = createNewCoordinates()[0];
				var newY = createNewCoordinates()[1];
				unit.going_around = true;
				unit.move(newX, newY);
				return;
			}
			if (unit.going_around){						// after any going around step we try to stop going around and go to the old coordinates. If we succed it in moveMe function - we will go, if  not - moveMe function call the goingAround again.
				unit.going_around = false;
				unit.move(oldCoord[0], oldCoord[1]);
			}
			
			function createNewCoordinates() {
				var opposite = Math.abs(oldCoord[1] - currentY);
				var adjacent = Math.abs(oldCoord[0] - currentX);
				if (adjacent !== 0) {
					var tangent = opposite/adjacent;
				}
				if (adjacent === 0) {
					var tangent = 60;
				}
				
				var newCoords = [];
				if (tangent <= 1) {
					if (currentX <= x0) {
						if (currentY <= y0) {				//1 sector =>
							newCoords[0] = currentX;
							newCoords[1] = currentY - 10;
							return newCoords;
						}
						if (currentY > y0) {				//4 sector =>
							newCoords[0] = currentX;
							newCoords[1] = currentY + 10;
							return newCoords;
						}
					}
					if (currentX > x0) {					//2 sector =>
						if (currentY <= y0) {
							newCoords[0] = currentX;
							newCoords[1] = currentY - 10;
							return newCoords;
						}
						if (currentY > y0) {				//3 sector
							newCoords[0] = currentX;
							newCoords[1] = currentY + 10;
							return newCoords;
						}
					}
				}
				if (tangent > 1){
					if (currentX <= x0) {
						if (currentY <= y0) {				//1 sector =>
							newCoords[0] = currentX - 10;
							newCoords[1] = currentY;
							return newCoords;
						}
						if (currentY > y0) {				//4 sector =>
							newCoords[0] = currentX - 10;
							newCoords[1] = currentY;
							return newCoords;
						}
					}
					if (currentX > x0) {					//2 sector =>
						if (currentY <= y0) {
							newCoords[0] = currentX + 10;
							newCoords[1] = currentY;
							return newCoords;
						}
						if (currentY > y0) {				//3 sector
							newCoords[0] = currentX + 10;
							newCoords[1] = currentY;
							return newCoords;
						}
					}
				}
				else {
					console.log("Something is wrong");
				}
				
			} 	// end of createNewCoordinates function
			
		}	// end of goAround function	
			
	}	// end of Move function
	
	
	//Bresenham's line algorithm
	function lineCoords(x0, y0, x1, y1) {		//function was taken from https://rosettacode.org/wiki/Bitmap/Bresenham%27s_line_algorithm#JavaScript
		var lineCoords = {};
		var arrayX = [];
		var arrayY = [];
		
		var dx = Math.abs(x1 - x0);
		var sx;
		if (x0 < x1) {
			sx = 1;
		} else {
			sx = -1;
		}
		
		var dy = Math.abs(y1 - y0);
		var sy;
		if (y0 < y1) {
			sy = 1;
		} else {
			sy = -1;
		}
		
		var err;
		if (dx > dy) {
			err = dx / 2;
		} else {
			err = -dy / 2;
		}
		
		var i = 0;
		while (true) {						//infinite loop
			arrayX[i] = x0;
			arrayY[i] = y0;
			if (x0 === x1 && y0 === y1) break;		//loop only finished if we come to the end point
			var e2 = err;
			if (e2 > -dx) {
				err = err - dy;
				x0 = x0 + sx;
			}
			if (e2 < dy) {
				err = err + dx;
				y0 = y0 + sy;
			}
			i++;
			if (i > 7230) {
				console.log("Too long distance");
				console.log(units);
				console.log(arrayX);
				console.log(arrayY);
				console.log(x0 + ", " + y0 + ", " + x1 + ", "  +y1);
				break;
			}
		}

		lineCoords.X = arrayX;
		lineCoords.Y = arrayY;
		return lineCoords;
	}
	// end of the Bresenham's line algorithm
	
	
	Hero.prototype.watchForEnemy = function() {
		var unit = this;
		watchEnemy();
		function watchEnemy() {                         //check distance to other objects
			var result = [];
			for (var i = 0; i < listOfUnits.length; i++) {
				if (!mapEditor) {
					var enemyID = listOfUnits[i];
					if (enemyID !== unit.id) {
						var distance = unit.checkDistance(enemyID);
						if (distance < 400 && !units[enemyID].dead && (unit.side !== units[enemyID].side)) {		//if unit sees an enemy
						
							if (!unit.target_id) {						// and if unit does not have a target
								x = units[enemyID].position_X;
								y = units[enemyID].position_Y;
								var move_ID = unit.moveID;				//take MoveId from the database
								
								if (unit.moving) {				// handle redirecting already moving character
									unit.going_around = false;	// remove going around provolege
									unit.moving = false;
									clearTimeout(move_ID);					// stop the moveMe setTimeout instance if it exists
								}
								unit.moving = true;
								unit.target_id = enemyID;	// if we are going to the map point, then target ID is empty string
								unit.move(x, y);
							} else {
								// I already have the enemy
							}
						}
											
					}
				}
			}
			if (!unit.dead) {
				setTimeout(watchEnemy, 1000);
			}
		}
	}
	
	var oldCoord = [];		// for GoAround function (coord of the initial point before object goAroun)
	
	serviceObj.addUnit = function(parameters, X, Y, id, level) {
		units[id] = new Hero(chars[parameters], X, Y, id, level);
		units[id].load();
	}
	
	serviceObj.updateList = function() {			//Update list of characters
		listOfCharacters = Object.keys(units);
		listOfUnits = [];
		var id;
		for (id in units) {
			if (units[id].class_type === "mob" || units[id].class_type === "hero") {
				listOfUnits.push(units[id].id);
			}
		}
	}

	serviceObj.removeUnit = function(id) {			//remove character from the list
		var index = listOfCharacters.indexOf(id);
		if (index > -1) {
			listOfCharacters.splice(index, 1);
		}	
	}
	
	serviceObj.victory = function() {						//victory function
		var black_cover = document.createElement("div");		
		var game = document.getElementById("game");
		black_cover.setAttribute("id", "black_cover");
		black_cover.style.opacity = "0";
		black_cover.style.transition = "opacity 2s";
		game.appendChild(black_cover);
		
		var black_cover_create_delay = 2000;				//in 2 sec after victory black cover gradually cover the screen
		setTimeout(function() {
			black_cover.offsetHeight;
			black_cover.style.opacity = "1";
			
		}, black_cover_create_delay);
		
		
		var victory_delay = 5000;
		setTimeout(function() {									//in 5 sec after victory we begin to do this
			window.scrollTo(0, 0);								//after screen is covered we jump to coordinates 0,0
			var victory = document.createElement("div");
			victory.setAttribute("id", "victory");
			var victory_logo = document.createElement("img");
			victory_logo.setAttribute("id", "victory_logo");
			victory_logo.setAttribute("src", "images/victory_logo.png");
			var game = document.getElementById("game");
			game.appendChild(victory);										//and show victory screen
			victory.appendChild(victory_logo);
			var game_space = document.getElementById("game_space");
			game_space.style.display = "none";
			
		}, victory_delay);
		
		
		
		var victory_text_array = [
			["Credits:", 4000],
			["Game design – TermenVox Interactive studio", 5000],
			["Executive producer – TermenVox", 5000],
			["Art director – TermenVox", 5000],
			["Music - Kari Sigurdsson - Twist of Fate, Audiomachine – Sura, R. Armando Morabito - Sea of Atlas, Fearless Motivation Instrumentals - Revival", 10000],
			["Sounds - WarCraft III (Blizzard Entertainment), zapsplat.com, freesound.org", 6000],
			["Pictures - Internet and Dota 2", 5000],
			["Great thanx to all guys from stackoverflow.com. Without your immence help this project would be impossible", 8000],
			["Big Thanx to books 'Head First JavaScript Programming' and 'Head First HTML5 Programming' by Eric Freeman and Elisabeth Robson. They helped me to make first steps in the world of JavaScript ", 12000],
			["I do not own neither music nor pictures rights", 5000],
			["TermenVox Interactive studio, 2018. No rights reserved.", 5000]
			];
		var victory_text = document.createElement("p");
		victory_text.setAttribute("id", "victory_text");
		victory_text.style.opacity = "0";
		victory_text.style.transition = "opacity 1s";
		var victory_text_delay = 10000;									//victory text begin to appear in 10 sec after victory
		setTimeout(function() {
			var victory = document.getElementById("victory");
			victory.appendChild(victory_text);
			/*var victory_text_dissapear = 5000;*/
			var i = 0;
			showCredits();
			
			function showCredits() {								//we show next credit for 5 sec, then show nothing for 2 sec then next one
				if (i < victory_text_array.length) {
					victory_text.innerHTML = victory_text_array[i][0];
					victory_text.offsetHeight;
					victory_text.style.opacity = "1";
					if (i !== victory_text_array.length - 1) {		//if it is the last credit - we just show it forewer
						setTimeout(function() {
							victory_text.offsetHeight;
							victory_text.style.opacity = "0";
							i++;
							setTimeout(showCredits, 2000);
						}, victory_text_array[i][1]);
					}
				}
			}
			
		}, victory_text_delay);
		
	}

}










