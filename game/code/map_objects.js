function mapObjects() {
	var svg = document.getElementById("svg_background");
	svg.addEventListener("click", addMapObject);
	window.addEventListener("keydown", mapEditorMode);		//handle E button to activate map editor mode
	
	var objectToAdd = "";
	var listOfButtons = {};
	
	var map_objects ={};
	
	var number = function() {					// get a random number
		var currentDate = new Date();
		return currentDate.getTime();
	}
	
	//editor function - add buttons
	
	var buttons = document.getElementById("object_buttons");
	
	function assignClick() {
		var x;
		for (x in buttons.children) {								//remove selected from all buttons
			var check = Number(x);
			if (!isNaN(check)) {
				var name = buttons.children[x].id;
				listOfButtons[name] = buttons.children[x];
				listOfButtons[name].addEventListener("click", chooseObj);
			}
		}
	}

	assignClick();
	
	function chooseObj(e) {											//select which object we are going to add
		var obj_name = e.target.id.replace("button", "");
		if (objectToAdd === obj_name) {								//second click on the same - no selection
			objectToAdd = "";
			toggleButtons();
		} else {
			objectToAdd = obj_name;
			console.log("Adding " + objectToAdd);
			toggleButtons();
		}
	}

	function toggleButtons() {							//toggle buttons view
		var x;
		for (x in listOfButtons) {								//remove selected from all buttons
			listOfButtons[x].classList.remove("selected");
		}
		if (objectToAdd !== "") {									//if we have selected button - add selected only to it
			var button_name = objectToAdd + "button";
			console.log(button_name);
			console.log(listOfButtons[button_name]);
			listOfButtons[button_name].classList.add("selected");
		}
	}
	
	function mapEditorMode(e) {			//handle E button to activate map editor mode
		var key = e.keyCode;
		var unit_info = document.getElementById("unit_info");
		var map_editor = document.getElementById("map_editor");
		if (key === 69) {
			if (!mapEditor) {
				mapEditor = true;
				console.log("Map editor mode activated");
				map_editor.style.display = "block";
				unit_info.style.display = "none";
			} else {
				mapEditor = false;
				console.log("Game mode activated");
				map_editor.style.display = "none";
				unit_info.style.display = "block";
			}
		}
	}
	
	function addMapObject(e) {		// add new objects to the map
		if (!mapEditor) {			// function addMapObject is unavailable in Game Mode
			return;
		}
		if (e.target.id === "svg_background" ||
			e.target.id === "map" ||
			e.target.id === "left" ||
			e.target.id === "right" ||
			e.target.id === "top" ||
			e.target.id === "bottom" ||
			e.target.id === "top_left_div" ||
			e.target.id === "top_right_div" ||
			e.target.id === "bottom_left_div" ||
			e.target.id === "bottom_right_div") {
				var X = e.pageX;
				var Y = e.pageY;
				
				var id = objectToAdd + "_" + number();
				var parname = objectToAdd + "Parameters";
				var level_field = document.getElementById("level_inp_field");
				var level = level_field.value;
				
				if (objectToAdd === "") {
					console.log("Choose object which are you going to put on map, please");
				} else {
					if (objectToAdd === "spruce" || objectToAdd === "house") {
						units[id] = new MapObject(mapobjs[parname], X, Y);		//add mapobjects to global database units
						units[id].load();
					}
					if (objectToAdd === "alucard" ||
						objectToAdd === "baltazar" ||
						objectToAdd === "uter"	||
						objectToAdd === "morane" ||
						objectToAdd === "centaur"	||
						objectToAdd === "dark_mage"	||
						objectToAdd === "lich"	||
						objectToAdd === "phantom_assassin"	||
						objectToAdd === "stone_giant"	||
						objectToAdd === "warlord") {
						serviceObj.addUnit(parname, X, Y, id, level);
					}
					mapDataBase[id] = [];						//add objects coordinates to the mapDataBase
					mapDataBase[id][0] = X;
					mapDataBase[id][1] = Y;
					mapDataBase[id][2] = objectToAdd;
					mapDataBase[id][3] = level;
																
					serviceObj.updateList();							// update list of characters global variable with newly added units
					serviceObj.assignBeTarget();					// add beTarget ability to all new units
					serviceObj.handleSelection();						//assign selected ability
					serviceObj.giveSword();							//gives a sword or a fireball to every character
					serviceObj.enableLifeBar();						//gives a lifebar to every character
					serviceObj.showLifeBarOnHover();				// gives everybody possibility to show lifebar on hover
					serviceObj.coords();							//show objects in viewport after loading
					if (objectToAdd === "alucard" ||
						objectToAdd === "baltazar" ||
						objectToAdd === "uter"	||
						objectToAdd === "morane" ||
						objectToAdd === "centaur"	||
						objectToAdd === "dark_mage"	||
						objectToAdd === "lich"	||
						objectToAdd === "phantom_assassin"	||
						objectToAdd === "stone_giant"	||
						objectToAdd === "warlord") {
						units[id].watchForEnemy();
					}
									
					console.log(mapDataBase);
					console.log(units);
					console.log("Level of added unit is " + level);
				}
					
		}
	}
						
var mapobjs = {
	spruceParameters: {
		id: "spruce_",
		class_type: "map_object",
		game_class: "trees",
		side: "none",
		position_X: "",
		position_Y: "",
		unit_width: 88,
		unit_height: 141,
		background_image: "url('game/images/spruce.png')",
	},
	
	houseParameters: {
		id: "house_",
		class_type: "map_object",
		game_class: "buildings",
		side: "none",
		position_X: "",
		position_Y: "",
		unit_width: 150,
		unit_height: 150,
		background_image: "url('game/images/house.png')",
	}
}
	

	function MapObject(parameters, X, Y, id) {								//creating of an usual map object
		this.id = id;
		this.class_type = parameters.class_type;
		this.game_class = parameters.game_class;
		this.side = parameters.side;
		this.position_X = X;
		this.position_Y = Y;
		this.unit_width = parameters.unit_width;
		this.unit_height = parameters.unit_height;
		this.background_image = parameters.background_image;
	}
	
	MapObject.prototype.load = function() {							//loading unit to DOM
		var map_object = document.createElement("div");
		map_object.setAttribute("id", this.id);
		map_object.style.left = this.position_X - this.unit_width/2 + "px";
		map_object.style.top = this.position_Y - this.unit_height/2 + "px";
		map_object.style.width = this.unit_width + "px";
		map_object.style.height = this.unit_height + "px";
		map_object.style.zIndex = "2";
		map_object.style.backgroundImage = this.background_image;
		map_object.style.backgroundSize = this.unit_width + "px" + " " + this.unit_height + "px";
		map_object.style.display = "none";
		map_object.classList.add(this.class_type);
		map_object.classList.add(this.side);
		map_object.classList.add(this.game_class);
		var game_space = document.getElementById("game_space");
		game_space.appendChild(map_object);
		
	};
	
	function loadMapObjects() {										//load all the mapObjects in the DOM
		var id;
		for (id in mapDataBase) {
			var X = mapDataBase[id][0];
			var Y = mapDataBase[id][1];
			var parname = mapDataBase[id][2] + "Parameters";
			if (parname === "spruceParameters" || parname === "houseParameters") {
				units[id] = new MapObject(mapobjs[parname], X, Y, id);
				units[id].load();
			}
			if (parname === "alucardParameters" || 
				parname === "moraneParameters" || 
				parname === "baltazarParameters" ||
				parname === "uterParameters" ||
				parname === "centaurParameters" || 
				parname === "dark_mageParameters" || 
				parname === "lichParameters" || 
				parname === "phantom_assassinParameters" || 
				parname === "stone_giantParameters" || 
				parname === "warlordParameters") {
				var level = Number(mapDataBase[id][3]);
				serviceObj.addUnit(parname, X, Y, id, level);
				units[id].watchForEnemy();
			}
		}
	}
	
	loadMapObjects();
	serviceObj.updateList();							// update list of characters global variable with newly added units

	
}