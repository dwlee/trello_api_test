
/**
 * Module dependencies.
 */


//var Trello = require("node-trello");
//var t = new Trello("cd0f18922b9eb5085356874cb7a12b69", "785f93b857559cec5d127a426d83304461c81c744c79201c9b8cf3101e6559a4");

//t.get("/1/members/me", function(err, data) {
//  if (err) throw err;
//  console.log(data);
//});
//
//// URL arguments are passed in as an object.
//t.get("/1/members/me", { cards: "open" }, function(err, data) {
//  if (err) throw err;
//  console.log(data);
//});

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.post('/test_page', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    console.log("post received: %s %s", username, password);
    res.send("received post");
});

app.get('/rest_api_test', function(req, res) {
	console.log("get calling in /rest_api_test");
	console.log(res);
	
//	var username = req.body.username;
//	var password = req.body.password;
//	console.log("post received: %s %s", username, password);
	res.send("received data");
});

app.post('/rest_api_test', function(req, res) {
	console.log(req.param("id"))
	console.log("post calling in /rest_api_test");
	//console.log(req.body);
	
//	var username = req.body.username;
//	var password = req.body.password;
//	console.log("post received: %s %s", username, password);
	res.send("received data");
});



