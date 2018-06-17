$(document).ready(function(){
	
	if (navigator.geolocation) {
  	navigator.geolocation.getCurrentPosition(function(position) {
  		var apikey = "87703fa249f2f3ce";
    	var str = "https://api.wunderground.com/api/" + apikey + "/conditions/q/" + position.coords.latitude + "," + position.coords.longitude + ".json";

    	function getFahrenheit(value){
    		var fahrenheit = (value * 1.8 - 459.67).toFixed(2);
    		return fahrenheit;
    	}

    	function getCelsius(value){
    		var celsius = (value - 273.15).toFixed(2);
    		return celsius;
    	}

    	$.getJSON(str, function(json){

    		var tempc = json.current_observation.temp_c;
    		var tempf = json.current_observation.temp_f;
    		
    		$("#place").html(json.current_observation.display_location.full);

    		$("#temp_value").html(tempc);

    		$("#description").html(json.current_observation.weather);

    		$("#humidity_value").html(json.current_observation.relative_humidity);

    		$("#feelLike_value").html(json.current_observation.feelslike_c + "&deg;C");

    		$("#visibility_value").html(json.current_observation.visibility_km);

    		if (tempc > 25){
    			$("body").css("background-image", "url(hot.jpg)").css("color", "white");
    		} else if (tempc > 5 && tempc <= 25){
    			$("body").css("background-image", "url(warm.jpg)").css("color", "white");
    		} else {
    			$("body").css("background-image", "url(cold.jpg)").css("color", "black");
    		}

    		$("button").click(function(){
    			var text = $("#changeText").text();
    			if (text == "C"){
    				$("#changeText").html("F");
    				$("#temp_value").html(tempf);
    				$("#feelLike_value").html(json.current_observation.feelslike_f + "&deg;F");
    			} else {
    				$("#changeText").html("C");
    				$("#temp_value").html(tempc);
    				$("#feelLike_value").html(json.current_observation.feelslike_c + "&deg;C");
    			}
    		});


    	});
 	});
	}
});