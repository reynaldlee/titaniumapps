var args = arguments[0] || {};
var win = $.win;

$.buttonDownloadFile.addEventListener("click", function() {
	var xhr = Titanium.Network.createHTTPClient({
		onload : function() {
			// first, grab a "handle" to the file where you'll store the downloaded data
			var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'mygraphic.png');
			f.write(this.responseData);
			// write to the file
			Ti.App.fireEvent('graphic_downloaded', {
				filepath : f.nativePath
			});
		},
		timeout : 10000
	});
	xhr.open('GET', 'http://tctechcrunch2011.files.wordpress.com/2008/12/titanium_logo.png');
	xhr.send();

	Ti.App.addEventListener('graphic_downloaded', function(e) {
		// you don't have to fire an event like this, but perhaps multiple components will
		// want to know when the image has been downloaded and saved
		//win.remove(loadingLabel);
		$.image.image = e.filepath;
	});
	xhr.ondatastream = function(e) {
		$.progressBarUpload.value = e.progress;
		Ti.API.info('ONDATASTREAM - PROGRESS: ' + e.progress);
	};

});

$.buttonUploadFile.addEventListener("click", function() {
	Titanium.Media.openPhotoGallery({
		success : function(event) {
			/* success callback fired after media retrieved from gallery */
			var xhr = Titanium.Network.createHTTPClient();
			xhr.onload = function(e) {
				Ti.UI.createAlertDialog({
					title : 'Success',
					message : 'status code ' + this.status
				}).show();
			};
			xhr.open('POST', 'https://myserver.com/api/uploadAndPost.do');
			xhr.send({
				theImage : event.media, /* event.media holds blob from gallery */
				username : 'foo',
				password : 'bar'
			});
			xhr.onsendstream = function(e) {
				$.progressBarUpload.value = e.progress;
				Ti.API.info('ONSENDSTREAM - PROGRESS: ' + e.progress);
			};
		},
		error : function(event) {
			Ti.API.info('error bro, ra sido upload');
		}
	});
});
