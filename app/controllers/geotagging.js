var args = arguments[0] || {};

var isSimpleMode = false;
var isActivated = false;

$.buttonSimpleMode.addEventListener("click", function(e) {
	simpleMode(e);
});

$.buttonManualMode.addEventListener("click", function(e) {
	manualMode(e);
	$.labelInfo.text = "GPS is activated";

});

$.buttonMap.addEventListener("click", function(e) {
	if (Ti.Geolocation.locationServicesEnabled) {
		var controller = Alloy.createController("mapGoogle");
		var win = controller.getView();
		win.open();
	} else {
		alert('Please enable location services');
	}
});

function manualMode(e) {
	// demonstrates manual mode:
	var providerGps = Ti.Geolocation.Android.createLocationProvider({
		name : Ti.Geolocation.PROVIDER_GPS,
		minUpdateDistance : 0.0,
		minUpdateTime : 0
	});
	Ti.Geolocation.Android.addLocationProvider(providerGps);
	Ti.Geolocation.Android.manualMode = true;
	var locationCallback = function(e) {
		if (!e.success || e.error) {
			Ti.API.info('error:' + JSON.stringify(e.error));
			$.textAreaInfo.setValue(e.coords);
		} else {
			Ti.API.info('coords: ' + JSON.stringify(e.coords));
			$.textAreaInfo.setValue(e.coords);
		}
	};
	Titanium.Geolocation.addEventListener('location', locationCallback);
}

var i = 0;
function simpleMode(e) {

	var locationAdded = false;
	var handleLocation = function(e) {
		if (!e.error) {
			Ti.API.info(i + ' -> ' + JSON.stringify(e.coords));
			$.textAreaInfo.setValue(e.coords);
			i++;
		} else {
			$.textAreaInfo.setValue(e.coords);
		}
	};
	var addHandler = function() {
		if (!locationAdded) {
			Ti.Geolocation.addEventListener('location', handleLocation);
			locationAdded = true;
		}
	};
	var removeHandler = function() {
		if (locationAdded) {
			Ti.Geolocation.removeEventListener('location', handleLocation);
			locationAdded = false;
		}
	};

	Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
	Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;

	if (Ti.Geolocation.locationServicesEnabled) {

		addHandler();

		var activity = Ti.Android.currentActivity;
		activity.addEventListener('destroy', removeHandler);
		activity.addEventListener('pause', removeHandler);
		activity.addEventListener('resume', addHandler);
	} else {
		alert('Please enable location services');
	}

}