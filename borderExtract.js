function getRandomMapImg(callback){
    function receiveCoords(lat, lng){
	coords = "" + lat + "," + lng;
	var img = getImg(getStaticMapUrl(coords, 8));
	callback(img);
    }
    getRandomLandCoordinates(15, receiveCoords);
}

getRandomMapImg(function(mapImg){
    //document.body.appendChild(mapImg);
    
    console.log(mapImg);
    $(mapImg).load(function(){
  	console.log("asdf");
  	var border = getBorders(mapImg)[3];
	console.log(border);
    });
})
