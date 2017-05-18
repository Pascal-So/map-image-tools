function getColor(ctx, x, y){
    var data = ctx.getImageData(x, y, 1, 1).data;
    return [data[0], data[1], data[2]]; // [r, g, b]
}

function getImg(url){
    var img = document.createElement('img');
    img.crossOrigin = "anonymous";
    img.src = url;
    return img;
}

// return array of the 4 borders (top, right, bottom, left), all in clockwise direction
function getBorders(img){ // [[Color]]  
    console.log(img);
    var width = img.width;
    var height = img.height;
    var canvas = document.createElement('canvas');
    console.log(width, height);
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);  
    var ctx = canvas.getContext('2d');
    
    ctx.drawImage(img, 0, 0);    

    var top = [];
    var right = [];
    var bottom = [];
    var left = [];

    for(var x = 0; x < width; x++){
	top.push(getColor(ctx, x, 1));
    }

    for(var y = 0; y < height; y++){
	right.push(getColor(ctx, width-1, y));
    }

    for(var x = width-1; x >= 0; x--){
	bottom.push(getColor(ctx, x, height-1));
    }

    for(var y = height-1; y >= 0; y--){
	left.push(getColor(ctx, 1, y));
    }

    return [top, right, bottom, left];
}
