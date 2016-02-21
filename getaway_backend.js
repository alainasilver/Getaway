
var querystring = require('querystring');
var express = require('express');
var app = express();
var request = require('request');
var auth_token; 
var url = require('url');
var user_access_token;
var myhtml = '<html><input type="button"></html>'

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views')); 


app.get ('/oauth', function(req,res){
	
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var code = query.code;
	//debugger;
	var postData = {grant_type: 'authorization_code', code:code, scope: 'public offline rides.read rides.request'};
	var username = '0pb_Ej-bhQ7n';
	var password = 'REDACTED';
	var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
	var options = {
		body: JSON.stringify(postData), 
		headers:{
			'content-type': 'application/json',
			'Authorization': auth
		}
	};

	console.log(options);

	request.post('https://api.lyft.com/oauth/token', options, function (error, response, body) {
	    var info = JSON.parse(body);
	    user_access_token = info['access_token'];

		var postData = {ride_type: 'lyft', origin:{"lat" : 39.953322, "lng" : -75.198623 }};

		var options = {
			body: JSON.stringify(postData), 
			headers:{
				'content-type': 'application/json',
				'Authorization': 'Bearer ' + user_access_token
	//			'Authorization': 'Bearer SANDBOX-gAAAAABWyQg2oeWes3c9GrGrGI89F1pJx_hUybgJAoROr4PCNfa0qwtwM2gUyIZp938hpjWEgiSEUms-r8FZQZp1sjuw5i5ulM87csg0tT0wHlH8YwE_77hDPbXQYLnE2-d2kwsevn-E1AYafKGWUJkWecuOZVoarll1rHXVD9xJ0Pr9CQ0C2FxEyF3uTsiCeUJ19v8VXPNyn9HmqUfZJNPb_ktZR0h9gjw1JTakdYp7wRetMnYlVILXWaLjm_9atjlWZzp9UpAmmyYcy9Y6XdnZVzzg6Yfv0_6shrorj4AS6s6oB9Ide04kCYvrWeqvajypIcWq0CPh'
			}
		};

		console.log(options);

		request.post('https://api.lyft.com/v1/rides', options, function (error, response, body) {
		    var info = JSON.parse(body);
			res.render('index', { 'ride_sent': true});
		});	    //res.redirect('/ride');
		    //res.send(body);
		});
		console.log(req);
})


app.get ('/login', function(req, res){
	res.redirect('https://api.lyft.com/oauth/authorize?client_id=0pb_Ej-bhQ7n&response_type=code&scope=public offline rides.request rides.read&state=what')

/*	var token;
	var postData = {
		"grant_type": "client_credentials",
		"scope": "public offline rides.request rides.read"
	};
	var username = '0pb_Ej-bhQ7n';
	var password = 'Cnh3CqGqyRpe2WEdtYUf_vkVVcHtc1cG';
	var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
	var options = {
		form: postData,  
		headers:{
			'Authorization': auth,
			'content-type': 'application/json'
		}
	};

	request.post('https://api.lyft.com/oauth/token', options, function (error, response, body) {
	        var info = JSON.parse(body);
	        token = info['access_token'];
	        auth_token = token;
	        console.log(token); 
	        console.log(body);
	        res.send(auth_token);
	    });
*/
});


app.get('/ride', function(req, res){
	var postData = {ride_type: 'lyft', origin:{"lat" : 39.953322, "lng" : -75.198623 }};

	var options = {
		body: JSON.stringify(postData), 
		headers:{
			'content-type': 'application/json',
			'Authorization': 'Bearer ' + user_access_token
//			'Authorization': 'Bearer SANDBOX-gAAAAABWyQg2oeWes3c9GrGrGI89F1pJx_hUybgJAoROr4PCNfa0qwtwM2gUyIZp938hpjWEgiSEUms-r8FZQZp1sjuw5i5ulM87csg0tT0wHlH8YwE_77hDPbXQYLnE2-d2kwsevn-E1AYafKGWUJkWecuOZVoarll1rHXVD9xJ0Pr9CQ0C2FxEyF3uTsiCeUJ19v8VXPNyn9HmqUfZJNPb_ktZR0h9gjw1JTakdYp7wRetMnYlVILXWaLjm_9atjlWZzp9UpAmmyYcy9Y6XdnZVzzg6Yfv0_6shrorj4AS6s6oB9Ide04kCYvrWeqvajypIcWq0CPh'
		}
	};

	console.log(options);

	request.post('https://api.lyft.com/v1/rides', options, function (error, response, body) {
	    var info = JSON.parse(body);
		res.render('index', { 'ride_sent': true});
	});
});


//var geolocation = require('node-geolocation');
/*
var GooglePlaces = require('google-places');

var places = new GooglePlaces('AIzaSyD0GEzAGID9cgGDwhrQ_N4kCwyisJjFIo0');

places.search({keyword: 'Public Building Near Me'}, function(err, response) {
  console.log("search: ", response.results);

  places.details({reference: response.results[0].reference}, function(err, response) {
    console.log("search details: ", response.result.website);
    // search details:  http://www.vermonster.com/
  });
}); */
/*
function onPositionUpdate(position)
        {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            alert("Current position: " + lat + " " + lng);
        }


/*
var ride = {
	status: "pending", 
	ride_id: "8859269784951491080", 
	destination: null, 
	origin: {
		lat: 34.305658, 
		lng: -118.8893667, 
		address: null}, 
		passenger: {
			rating: null, 
			first_name: "Jane", 
			last_name: "Doe", 
			image_url: "https://public-api.lyft.com/static/images/user.png"
		}
	}; */
//
/*
var x = {eta_estimates: 
	[{display_name: 
		"Lyft Line", ride_type: "lyft_line", "eta_seconds": 212},
		 {display_name: "Lyft", ride_type: "lyft", eta_seconds: 212}, 
		 {display_name: "Lyft Plus", ride_type: "lyft_plus", eta_seconds: 295}]}


}*/

