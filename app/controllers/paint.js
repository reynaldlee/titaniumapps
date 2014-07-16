var args = arguments[0] || {};

var Paint = require("ti.paint");

var paint = Paint.createPaintView({
	strokeWidth : 6,
	strokeColor : '#2a81df',
	bottom : 10,
	top : 30
});
$.viewPaint.add(paint);

function saveButton() {
	var saveImage = paint.toImage().media;
	Ti.API.info(JSON.stringify(saveImage));
	//$.showPaint.image = saveImage;
	$.blob.text = Ti.Utils.base64encode(saveImage).toString();
	Ti.API.info (Ti.Utils.base64encode(saveImage).toString());
	
	// dari blob ke image
	var image2 = Ti.Utils.base64decode(Ti.Utils.base64encode(saveImage).toString());
	$.showPaint.image = image2;

}