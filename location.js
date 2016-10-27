
var currentLocation = 20770;
var areCoordinatesAvailable = false;

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function getStored() {
	var storedNames = JSON.parse(localStorage.getItem("names"));
	if(storedNames != null){
		var html = '<div class="panel panel-info"><div class="panel-heading">Previous Search</div><div class="panel-body">';

		for(var i=0;i<storedNames.length;i++){
			html += ' <button type="button" class="btn btn-primary" onclick="getWeatherFor(\''+storedNames[i]+'\')">'+storedNames[i]+'</button> ';
		}
		html += '</div></div>';
		$("#otherLocations").html(html);
	}
}

getStored();

$("#weatherNew").submit(function( event ) {
  	event.preventDefault();
  	var location = $("#newLocation").val();
  	var storedNames = JSON.parse(localStorage.getItem("names"));
  	if(storedNames == null){
  		var names = [];
		names.push(location);
		localStorage.setItem("names", JSON.stringify(names));
		console.log("no");
  	} else {
  		console.log("yes");
  		if(!storedNames.contains(location)){
  			storedNames.push(location);
			localStorage.setItem("names", JSON.stringify(storedNames));
  		}
  	}


	console.log("Stored"+storedNames);
  	console.log(location);
	getWeatherFor(location);

	getStored();
});

function getWeatherFor(locationName){
	$.getJSON("http://api.openweathermap.org/data/2.5/weather?q="+locationName+",us&APPID=94479d3e62bc9e274be58066c734148d&units=imperial", function( data ) {
		drawData(data);
	});
}

function showPosition(position) {
	if(position.coords.latitude){

		var lat = position.coords.latitude;
		var lng = position.coords.longitude;	
		localStorage.setItem("localLat",lat);		
		localStorage.setItem("localLng",lng);
		setWeatherFor(lat, lng);
	} else {
		if(localStorage.getItem("localLat")){
			setWeatherFor(localStorage.getItem("localLat"), localStorage.getItem("localLng"));
		} else {

		}
	}
}

function setWeatherFor(lat, lng){
	$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&APPID=94479d3e62bc9e274be58066c734148d&units=imperial", function( data ) {
		drawData(data);
	});
}

function drawData(data){
	$("#location").html("Weather in the city of "+data.name + " <br><br> <img src='http://openweathermap.org/img/w/"+data.weather[0].icon+".png'> "+ data.main.temp +"&deg;F");
	$("#thelocationdaily").html(data.name);
	$("#thelocationhour").html(data.name);
	$('#thelocationdetails').html(data.name);

	$('#currentPressure').html(data.main.pressure +" in");
	$('#currentHumidity').html(data.main.humidity +"%");
	$('#currentMin').html(data.main.temp_min +"&deg;F");
	$('#currentMax').html(data.main.temp_max +"&deg;F");

	var lat = data.coord.lat;
	var lon = data.coord.lon;

	$.getJSON("http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=94479d3e62bc9e274be58066c734148d&units=metric", function( hourdata ) {
		var html = "";
		var details = hourdata.list;
		html += "<tr>";
		for(var i = 0;i<details.length;i++){
			if(i%3 == 0){
				html += "</tr><tr>";
			}
			html +="<td>"+details[i].dt_txt+"</td><td><img src='http://openweathermap.org/img/w/"+details[i].weather[0].icon+".png'>"+details[i].main.temp+"&deg;F</td>";
		}
		$("#hourlyData").html(html);
	});


	$.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?lat="+lat+"&lon="+lon+"&appid=94479d3e62bc9e274be58066c734148d&units=metric", function( dailydata ) {
		var html = "";
		var details = dailydata.list;
		html += "<tr>";
		for(var i = 0;i<details.length;i++){
			if(i%3 == 0){
				html += "</tr><tr>";
			}
			var date = new Date(details[i].dt*1000);
			var thedate = date.getDate();
			var theMonth = date.getMonth();
			var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];


			html +="<td>"+thedate +" "+months[theMonth]+"</td><td><img src='http://openweathermap.org/img/w/"+details[i].weather[0].icon+".png'>"+details[i].temp.day+"&deg;F</td>";
		}
		$("#dailyData").html(html);
	});

}

function setDefaultWeather(){
	$.getJSON("http://api.openweathermap.org/data/2.5/weather?zip=20770&units=metric&appid=94479d3e62bc9e274be58066c734148d", function( data ) {
		drawData(data);
	});
}

getLocation();