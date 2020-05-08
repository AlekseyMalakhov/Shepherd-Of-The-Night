function scroll() {
	
	//create svg for minimap
	
	var mapWidth = $("#map").width();							//take all preliminary information
	var mapHeight = $("#map").height();
	
	var minimapWidth = Math.floor(mapWidth/26);						//minimap will be 26 times less than game map
	var minimapHeight = Math.floor(mapHeight/26);

	$("#minimap").width(minimapWidth);								//assign minimap size to minimap div
	$("#minimap").height(minimapHeight);
	$("#minimap").css("background-size", minimapWidth + "px " + minimapHeight + "px");
	
	
	var svg_back = Snap(minimapWidth,minimapHeight);			//and create SVG background for minimap
	var minimap = Snap("#minimap");
	minimap.append(svg_back);
	svg_back.rect(0, 0, 1, 1);									//create screen frame on minimap
	
	serviceObj.minimapFrameUpdate = function() {				//we will update screen frame rect when scrool				
		var screenMinimapFrameCoords = [];
		
		screenMinimapFrameCoords[0] = Math.floor(window.scrollX/26);						//frame top left corner X coord
		screenMinimapFrameCoords[1] = Math.floor(window.scrollY/26);						//frame top left corner Y coord
		screenMinimapFrameCoords[2] = Math.floor(window.innerWidth/26);					//frame width
		screenMinimapFrameCoords[3] = Math.floor(window.innerHeight/26);				//frame height
			
		svg_back.select("rect").attr({
			x: screenMinimapFrameCoords[0],
			y: screenMinimapFrameCoords[1],
			width: screenMinimapFrameCoords[2],
			height: screenMinimapFrameCoords[3],
			fill: "transparent",
			stroke: "white",
			strokeWidth: 1
		});
	}
	
	serviceObj.minimapFrameUpdate();						//update first time after creation
	
	//end code for minimap screen frame
	
			
	serviceObj.coords = function() {						//show objects which are only in viewport. Hide objects outside viewport
		viewportCoords[0] = window.scrollX;		//coords of the top left corner of the viewport
		viewportCoords[1] = window.scrollY;
		var w = window.innerWidth;
		var h = window.innerHeight;
		viewportCoords[2] = viewportCoords[0] + w;			//coords of the bottom right corner of the viewport
		viewportCoords[3] = viewportCoords[1] + h;
				
		var id;
		for (id in mapDataBase) {
			var X = mapDataBase[id][0];
			var Y = mapDataBase[id][1];
			var name = mapDataBase[id][2];
			if (name === "spruce" || name === "house") {
				var obj = document.getElementById(id);					// if the object is inside viewport + 50px in all directions - show it, else - hide it
				if (((viewportCoords[0] - 50) < X) && (X < (viewportCoords[2] + 50)) && ((viewportCoords[1] - 50) < Y) && (Y < (viewportCoords[3] + 50))) {
					obj.style.display = "block";
				} else {
					obj.style.display = "none";
				}
			}
		}
	}
	
	 
	// code for mouse scrolling

	function handleScrollAbility() {
		var mouseOnBorder = {
			left: false,
			right: false,
			top: false,
			bottom: false,
			top_left: false,
			top_right: false,
			bottom_left: false,
			bottom_right: false
		};
			
		scrollAbility("left");
		scrollAbility("right");
		scrollAbility("top");
		scrollAbility("bottom");
		scrollAbility("top_left");
		scrollAbility("top_right");
		scrollAbility("bottom_left");
		scrollAbility("bottom_right");
		

		function scrollAbility(direction) {
			var directionId = document.getElementById(direction);

			directionId.addEventListener("mouseover", function() {
													mouseOnBorder[direction] = true;
													scroll(direction);
													});
			directionId.addEventListener("mouseout", function() {
													mouseOnBorder[direction] = false;
													});
		}


		function scroll(direction) {
			if(direction == "left") {
				scrollLeft();
			}
			if(direction == "right") {
				scrollRight();
			}
			if(direction == "top") {
				scrollTop();
			}
			if(direction == "bottom") {
				scrollBottom();
			}
			if(direction == "top_left") {
				scrollTopLeft();
			}
			if(direction == "top_right") {
				scrollTopRight();
			}
			if(direction == "bottom_left") {
				scrollBottomLeft();
			}
			if(direction == "bottom_right") {
				scrollBottomRight();
			}
			
					
			
			
			function scrollLeft() {
				window.scrollBy(-10, 0);
				serviceObj.coords();
				serviceObj.minimapFrameUpdate();
				if (mouseOnBorder[direction]) {
					setTimeout(scrollLeft, 20);
				}
			}
			
			function scrollRight() {
				window.scrollBy(10, 0);
				serviceObj.coords();
				serviceObj.minimapFrameUpdate();
				if (mouseOnBorder[direction]) {
					setTimeout(scrollRight, 20);
				}
			}
			
			function scrollTop() {
				window.scrollBy(0, -10);
				serviceObj.coords();
				serviceObj.minimapFrameUpdate();
				if (mouseOnBorder[direction]) {
					setTimeout(scrollTop, 20);
				}
			}
			
			function scrollBottom() {
				window.scrollBy(0, 10);
				serviceObj.coords();
				serviceObj.minimapFrameUpdate();
				if (mouseOnBorder[direction]) {
					setTimeout(scrollBottom, 20);
				}
			}
			
			function scrollTopLeft() {
				window.scrollBy(-7.5, -7.5);
				serviceObj.coords();
				serviceObj.minimapFrameUpdate();
				if (mouseOnBorder[direction]) {
					setTimeout(scrollTopLeft, 20);
				}
			}
			
			function scrollTopRight() {
				window.scrollBy(7.5, -7.5);
				serviceObj.coords();
				serviceObj.minimapFrameUpdate();
				if (mouseOnBorder[direction]) {
					setTimeout(scrollTopRight, 20);
				}
			}
			
			function scrollBottomLeft() {
				window.scrollBy(-7.5, 7.5);
				serviceObj.coords();
				serviceObj.minimapFrameUpdate();
				if (mouseOnBorder[direction]) {
					setTimeout(scrollBottomLeft, 20);
				}
			}
			
			function scrollBottomRight() {
				window.scrollBy(7.5, 7.5);
				serviceObj.coords();
				serviceObj.minimapFrameUpdate();
				if (mouseOnBorder[direction]) {
					setTimeout(scrollBottomRight, 20);
				}
			}
		}
	}


	// code for keyboard scrolling



	function handleScrollKeys() {

				
		window.addEventListener("keydown", PushScrollKeys);
		window.addEventListener("keyup", ReleaseScrollKeys);
			
		var keyIsHold = {
			37: false,    //left
			39: false,    //right
			38: false,    // top
			40: false	  //bottom
		};		
			
		
		function PushScrollKeys(event){ 		//handle what keys are pushed now
			var key = event.keyCode;
					
			if (keyIsHold[key] === false) {				
					keyIsHold[key] = true;
					scrollKeys();
			}
		}
		
		function ReleaseScrollKeys(event){      //handle what keys are released now
			var key = event.keyCode;
			keyIsHold[key] = false;
			scrollKeys();
		}
		
		function scrollKeys() {
			if (keyIsHold[37]) {		//handle Left key
				if (keyIsHold[38]) {
					scrollTopLeftKey();
				}
				if (keyIsHold[40]) {
					scrollBottomLeftKey();
					
				} else {
					scrollLeftKey();
				}
			}
					
			if (keyIsHold[38]) {		//handle Top key
				if (keyIsHold[37]) {
					scrollTopLeftKey();
				}
				if (keyIsHold[39]) {
					scrollTopRightKey();
				} else {
					scrollTopKey();
				}
			}
			
			if (keyIsHold[39]) {		//handle Right key
				if (keyIsHold[38]) {
					scrollTopRightKey();
				}
				if (keyIsHold[40]) {
					scrollBottomRightKey();
				} else {
					scrollRightKey();
				}
			}
			
			if (keyIsHold[40]) {		//handle Bottom key
				if (keyIsHold[39]) {
					scrollBottomRightKey();
				}
				if (keyIsHold[37]) {
					scrollBottomLeftKey();
				} else {
					scrollBottomKey();
				}
			}
		}
		
		// scroll functions
		
		function scrollLeftKey() {
				if (keyIsHold[37]) {
					if (!keyIsHold[38] && !keyIsHold[40]) {
						window.scrollBy(-10, 0);
						serviceObj.coords();
						serviceObj.minimapFrameUpdate();
						setTimeout(scrollLeftKey, 20);
					}
				}
		}
		
		function scrollRightKey() {
				if (keyIsHold[39]) {
					if (!keyIsHold[38] && !keyIsHold[40]) {
						window.scrollBy(10, 0);
						serviceObj.coords();
						serviceObj.minimapFrameUpdate();
						setTimeout(scrollRightKey, 20);
					}
				}
		}
		
		function scrollTopKey() {
				if (keyIsHold[38]) {
					if (!keyIsHold[37] && !keyIsHold[39]) {
						window.scrollBy(0, -10);
						serviceObj.coords();
						serviceObj.minimapFrameUpdate();
						setTimeout(scrollTopKey, 20);
					}
				}
		}
		
		function scrollBottomKey() {
				if (keyIsHold[40]) {
					if (!keyIsHold[37] && !keyIsHold[39]) {
						window.scrollBy(0, 10);
						serviceObj.coords();
						serviceObj.minimapFrameUpdate();
						setTimeout(scrollBottomKey, 20);
					}
				}
		}
		
		function scrollTopLeftKey() {
				if (keyIsHold[38] && keyIsHold[37]) {
					window.scrollBy(-7.5, -7.5);
					serviceObj.coords();
					serviceObj.minimapFrameUpdate();
					setTimeout(scrollTopLeftKey, 20);
				}
		}
		
		function scrollTopRightKey() {
				if (keyIsHold[38] && keyIsHold[39]) {
					window.scrollBy(7.5, -7.5);
					serviceObj.coords();
					serviceObj.minimapFrameUpdate();
					setTimeout(scrollTopRightKey, 20);
				}
		}
		
		function scrollBottomRightKey() {
				if (keyIsHold[40] && keyIsHold[39]) {
					window.scrollBy(7.5, 7.5);
					serviceObj.coords();
					serviceObj.minimapFrameUpdate();
					setTimeout(scrollBottomRightKey, 20);
				}
		}
		
		function scrollBottomLeftKey() {
				if (keyIsHold[40] && keyIsHold[37]) {
					window.scrollBy(-7.5, 7.5);
					serviceObj.coords();
					serviceObj.minimapFrameUpdate();
					setTimeout(scrollBottomLeftKey, 20);
				}
		}
	}
	
	handleScrollAbility();    // code for mouse scrolling
	handleScrollKeys();       // code for keyboard scrolling
	serviceObj.coords();		//show objects in viewport after loading
}


		
		
		


 
 

 
 
 
 
 
 