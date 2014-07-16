
$.index.open();

$.buttonBarcode.addEventListener('click', function(e){
	navigateTo({name : 'scannerBarcode'});
});

$.buttonGeotagging.addEventListener('click', function(e){
	navigateTo({name : 'geotagging'});
});

$.buttonUploadFile.addEventListener('click', function(e){
	navigateTo({name : 'uploadFile'});
});

$.buttonAdMob.addEventListener('click', function(e){
	navigateTo({name : 'admob'});
});

$.buttonFacebook.addEventListener('click', function(e){
	navigateTo({name : 'facebookMod'});
});

$.buttonPaint.addEventListener('click', function(e){
	navigateTo({name : 'paint'});
});

$.buttonBarcode2.addEventListener('click', function(e){
	navigateTo({name : 'barcode'});
});

function navigateTo(e){
	var controller = Alloy.createController(e.name);
	var win = controller.getView();
	win.open();
}
