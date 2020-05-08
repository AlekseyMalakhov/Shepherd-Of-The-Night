var express = require('express');
var app = express();
var serv = require("http").Server(app);
var io = require('socket.io')(serv);

var user_names = [];                    // array of usernames
var users = {};                         //here we keep all users names and their chosen heroes.
var clients = {};                       // all our sockets (clients) are here
console.log("Hi all! Server starts! Version_6");

app.get('/', function(req, res){            // when browser connects to a root route it gets a game file
  res.sendFile(__dirname + "/game.html");
});

app.use("/game", express.static(__dirname + "/game"));   //for all requests to /game route express will use static files from __dirname + "/game"

var PORT = process.env.PORT || 8080;         // it is google's demand - port can be changed by App Engine
serv.listen(PORT, function(){               //start our server
  console.log('Game server is listening on port ' + PORT);
});


io.on('connection', function (socket) {
  var addedUser = false;

  clients[socket.id] = socket;

  socket.on("disconnect", function() {
    console.log(socket.username + " disconnected");
    io.emit("user disconnected", socket.username, users);
    removeUserName(socket.username);
    delete users[socket.username];
    delete clients[socket.id];
    console.log("disconnect");
    console.log(users);
  });

  //chat functionality

  socket.on("chat message", function(msg, username) {
    io.emit("chat message", msg, username);
  });

  socket.on("user connected", function(username) {
    users[username] = [];
    io.emit("user connected", username, users);
    console.log("user connected");
    console.log(users);
  });


  socket.on('add user', (username) => {
    if (addedUser) return;
    socket.username = username;     // we store the username in the socket session for this client
    addedUser = true;

  });


  //hero selection

  socket.on("user_choise", function(data) {               //data = [username, userChoiseName, game_class_id]
    users[data[0]] = [data[1], data[2]];
    io.emit("user_choise", data);
    user_names.push(data[0]);
    console.log("number of players - " + user_names.length);
    if (user_names.length === 3) {                              //if there is enough users - start the game
      io.emit("game_start", users);
      console.log("game starts");
    }
    

    console.log(users);
  });

  socket.on("user_canceled_hero", function(data) {        //data = [username, userChoiseName, game_class_id]
    io.emit("user_canceled_hero", data);
    users[data[0]] = [];
    removeUserName(data[0]);
    console.log("user canceled hero");
    console.log(users);
    console.log("number of players - " + user_names.length);
  });

  function removeUserName(username) {                   //remove username from the array
    var index = user_names.indexOf(username);
		if (index > -1) {
			user_names.splice(index, 1);
		}
  }

  socket.on("left_click", function(username, target_id) {
    console.log(username + " left clicked");
    io.emit("left_click", username, target_id);
  });

  socket.on("right_click", function(username, x, y, target_id, selected_char_id) {
    console.log(username + " right clicked");
    io.emit("right_click", username, x, y, target_id, selected_char_id);
  });

  socket.on("ability1_click", function(username) {
    console.log(username + " ability1_clicked");
    io.emit("ability1_click", username);
  });

  socket.on("server_restart", function() {
    console.log("Server restarted");
    user_names = [];
    users = {};
    clients = {};
    console.log(users);
    console.log(user_names);
  });
  
});

