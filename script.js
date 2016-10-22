
function displayWeather(){

	var city = document.getElementById("main").value;

	var xmlhttp = new XMLHttpRequest(); //Creates a new XMLHttpRequest object (to retrieve data from a web server)
	var url = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=8ee882673408269ed12c658c1a82db6c&units=metric";
	xmlhttp.onreadystatechange = function() {

    	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { 

        	var myObject = JSON.parse(xmlhttp.responseText); //responseText	Returns the response data as a string

        	var resultsArray = myObject.weather;

        	var html = '';
			for(var i = 0;i<resultsArray.length;i++){
				html += '<div class="result">'
					+'Temparature: '+resultsArray[i].main+'<br>'
					+'temp: '+myObject.icon+ '<br>'
					+'Humidity: '+resultsArray[i].description+ '<br>'
					+'Icon: '+myObject.main.temp+ '<br>'
					+'Min-temp: '+myObject.main.temp_min+ '<br>'
					+'Max-temp: '+myObject.main.temp_max+ '<br>'
					+'Sea-Level: '+myObject.main.sea_level+ '<br>'
					+'Grnd-Level: '+myObject.main.grnd_level+ '<br>'
					+'Wind: '+myObject.wind.speed+ '<br>'
					+'Clouds: '+myObject.clouds.all+ '<br>'
					+'Country: '+myObject.sys.country+ '<br>'
					+'Sunrise: '+myObject.sys.sunrise+ '<br>'
					+'Sunset: '+myObject.sys.sunset+ '<br>'



					// +'MapUrl: '+resultsArray[i].MapUrl+'<br>'	
					// +'Address: '+resultsArray[i].Address+', '+resultsArray[i].City+' '+resultsArray[i].State+'<br>'
					// +'Phone: '+resultsArray[i].Phone+'
					'</div>';


// html=html+'<tr><td><img src="'+img+'" ></td><td><b><a href="/city/'+JSONobject.list[i].id+'">'+ name+'</a></b>'+
// ' <img src="'+flag+'" >  <b><i>' +text+'</i> </b>' + 
// '<p>  <span class="badge badge-info">'+temp +'°С </span> ' +
// 'temperature from '+tmin+' to '+tmax+'°С, wind '+gust+ 'm/s. clouds '+cloud+'%, ' +pressure+
// ' hpa</p><p>Geo coords  <a href="/Maps?zoom=12&lat='+JSONobject.list[i].coord.lat+'&lon='+JSONobject.list[i].coord.lon+'&layers=B0FTTFF">[ '+
//  JSONobject.list[i].coord.lon+", "+ JSONobject.list[i].coord.lat +' ]</a></p></td></tr>';

//   }






			}
			document.getElementById("results").innerHTML = html;
    	}
	};
	//To send a request to a server, we use the open() and send() methods of the XMLHttpRequest object
	xmlhttp.open("GET", url, true);	
	xmlhttp.send();	 //Sends the request to the server Used for GET requests
	
}
// #main 

function hourlyWeather(){

	var city = document.getElementById("hourly").value;

	var xmlhttp = new XMLHttpRequest(); //Creates a new XMLHttpRequest object (to retrieve data from a web server)
	var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+city+"&mode=xml&units=metric&cnt=7&APPID=8ee882673408269ed12c658c1a82db6c&units=metric";
	xmlhttp.onreadystatechange = function() {

    	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { 

        	var myObject1 = JSON.parse(xmlhttp.responseText); //responseText	Returns the response data as a string

        	var resultsArray1 = myObject1.list;

        	var html1 = '';
			for(var i = 0;i<resultsArray.length;i++){
				html1 += '<div class="result">'
					+'Main: '+resultsArray1[i].main+'<br>'
					+'Weather: '+resultsArray1[i].weather+ '<br>'
					+'Clouds: '+resultsArray1.clouds+ '<br>'
					// +'MapUrl: '+resultsArray[i].MapUrl+'<br>'	
					// +'Address: '+resultsArray[i].Address+', '+resultsArray[i].City+' '+resultsArray[i].State+'<br>'
					// +'Phone: '+resultsArray[i].Phone+'
					'</div>';
			}
			document.getElementById("results").innerHTML = html;
    	}
	};
	//To send a request to a server, we use the open() and send() methods of the XMLHttpRequest object
	xmlhttp.open("GET", url, true);	
	xmlhttp.send();	 //Sends the request to the server Used for GET requests
	
} // #hourly



function dailyWeather(){

	var city = document.getElementById("daily").value;

	var xmlhttp = new XMLHttpRequest(); //Creates a new XMLHttpRequest object (to retrieve data from a web server)
	var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+city+"&mode=xml&units=metric&cnt=7&APPID=8ee882673408269ed12c658c1a82db6c&units=metric";
	xmlhttp.onreadystatechange = function() {

    	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { 

        	var myObject2 = JSON.parse(xmlhttp.responseText); //responseText	Returns the response data as a string

        	var resultsArray = myObject2.list;

        	var html = '';
			for(var i = 0;i<resultsArray.length;i++){
				html += '<div class="result">'
					+'Temparature: '+resultsArray[i].pressure+'<br>'
					+'Weather: '+resultsArray[i].humidity+ '<br>'
					+'Clouds: '+resultsArray[i].weather+ '<br>'
					// +'MapUrl: '+resultsArray[i].MapUrl+'<br>'	
					// +'Address: '+resultsArray[i].Address+', '+resultsArray[i].City+' '+resultsArray[i].State+'<br>'
					// +'Phone: '+resultsArray[i].Phone+'
					'</div>';
			}
			document.getElementById("results").innerHTML = html;
    	}
	};
	//To send a request to a server, we use the open() and send() methods of the XMLHttpRequest object
	xmlhttp.open("GET", url, true);	
	xmlhttp.send();	 //Sends the request to the server Used for GET requests
	
} // #daily
