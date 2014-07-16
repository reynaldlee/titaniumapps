var args = arguments[0] || {};

var MapModule = require('ti.map');

var myPos;
var LatLon = require('latLon');
var radius = 3;
var mapview;

var places = [];
places[0] = new LatLon(-6.174085, 106.827393);
places[1] = new LatLon(-6.153280, 106.786358);
places[2] = new LatLon(-6.172213, 106.788321);
cekGoogleService();

function setRadius(e) {
	Ti.API.info('findPlace : ' + JSON.stringify(e));
	radius = $.textViewSearch.value;
	setAnnotation(radius);
}

function createMap() {

	mapview = MapModule.createView({
		mapType : MapModule.NORMAL_TYPE,
		userLocation : true,
		zIndex : 1,
	});

	Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
	Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;

	Ti.Geolocation.getCurrentPosition(function(e) {
		if (e.success) {
			myPos = new LatLon(e.coords.latitude, e.coords.longitude);
			var currentPosition = MapModule.createAnnotation({
				latitude : myPos.lat(),
				longitude : myPos.lon(),
				title : 'My Location',
				subtitle : 'My location',
				pincolor : MapModule.ANNOTATION_AZURE
			});
			mapview.annotations = [currentPosition];
			mapview.region = {
				longitude : myPos.lon(),
				latitude : myPos.lat(),
				latitudeDelta : 0.1,
				longitudeDelta : 0.1
			};
		} else {
			alert(e.error);
		}
	});

	// Add this annotation after creation
	$.viewMap.add(mapview);
	setAnnotation();
}

function setAnnotation(radius) {
	mapview.removeAllAnnotations();
	for (var j = 0; j < places.length; j++) {
		Ti.API.info('distance: ' + myPos.distanceTo(places[j], 21));
		if (myPos.distanceTo(places[j], 21) <= radius) {
			var pos = MapModule.createAnnotation({
				latitude : places[j].lat(),
				longitude : places[j].lon(),
				pincolor : MapModule.ANNOTATION_RED,
			});
			mapview.addAnnotation(pos);
		}
	}
}

function cekGoogleService() {
	var rc = MapModule.isGooglePlayServicesAvailable();
	switch (rc) {
		case MapModule.SUCCESS:
			Ti.API.info('Google Play services is installed.');
			//simpleMode();
			createMap();
			break;
		case MapModule.SERVICE_MISSING:
			alert('Google Play services is missing. Please install Google Play services from the Google Play store.');
			break;
		case MapModule.SERVICE_VERSION_UPDATE_REQUIRED:
			alert('Google Play services is out of date. Please update Google Play services.');
			break;
		case MapModule.SERVICE_DISABLED:
			alert('Google Play services is disabled. Please enable Google Play services.');
			break;
		case MapModule.SERVICE_INVALID:
			alert('Google Play services cannot be authenticated. Reinstall Google Play services.');
			break;
		default:
			alert('Unknown error.');
			break;
	}

}
