function randomInRange(start, end){ // :: Double -> Double -> Double
    var diff = end-start;
    return Math.random()*diff + start;
}

function coordsToString(lat, lng){ // :: Double -> Double -> String
    var prec = 7;
    
    var lat_s = lat.toString().substr(0, prec);
    var lng_s = lng.toString().substr(0, prec);
    return lat_s + "," + lng_s;
}

function getStaticMapUrl(lat,lng,zoom){ // :: Double -> Double -> Int -> String
    var center = coordsToString(lat,lng);
    return "https://maps.googleapis.com/maps/api/staticmap?center=" + center + "&zoom=" + zoom + "&size=256x256&maptype=satellite";
}

function getRandomLandCoordinates(attemptsLeft, callback){ // :: Int -> (Double -> Double -> ?) -> Void
    if(attemptsLeft <= 0){
	alert("Too many failed attempts to get coordinates.");
	return;
    }

    lat = randomInRange(-80, 80);
    lng = randomInRange(-180, 180);

    var coord_string = coordsToString(lat, lng);

    console.log("Generated coordinates", coord_string);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + coord_string, true);
    xhr.send();
    
    xhr.onreadystatechange = processRequest;
    
    function processRequest(e) {
	if(xhr.readyState == 4){
	    if (xhr.status == 200) {
	        var response = JSON.parse(xhr.responseText);
		if(response.status == "ZERO_RESULTS"){
		    console.log("Generated coordinates were in ocean");
		    getCoordinates(attempts_left-1, callback);
		}else{
		    callback(lat, lng);
		}
	    }else{
		// has returned, but not 400
		console.log("getCoordinates failed xhr request");
		getCoordinates(attempts_left-1, callback);
	    }
	}
    }
}
