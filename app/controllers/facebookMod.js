var args = arguments[0] || {};

// Don't forget to set your appid and requested permissions, else the login button
// won't be effective.
// var win = $.win;

var fb = require('facebook');

$.win.open();

fbInit();
showMenu();

$.buttonShowProfile.addEventListener('click', showProfile);
$.buttonCreateEvent.addEventListener('click', createEvent);
$.buttonFacebookDialog.addEventListener('click', facebookDialog);
$.buttonPostStatus.addEventListener('click', postStatus);

function facebookDialog(e) {
	var data = {
		link : "http://www.acc.co.id/",
		name : "Astra Credit Company",
		message : "ACC adalah perusahaan pembiayaan mobil dan alat berat terbesar di Indonesia",
		caption : "Astra Credit Company",
		picture : "http://www.acc.co.id/files/template_images/astra-credit-companies.png",
		description : "ACC didirikan  guna mendukung bisnis otomotif kelompok Astra. " + "PT Astra Sedaya Finance, yang merupakan cikal bakal ACC berdiri pada 15 Juli 1982, dengan nama PT Rahardja Sedaya."
	};
	fb.dialog("feed", data, function(e) {
		if (e.success && e.result) {
			alert("Success! New Post ID: " + e.result);
		} else {
			if (e.error) {
				alert(e.error);
			} else {
				alert("User canceled dialog.");
			}
		}
	});
}

function facebookDialog2(e){
	
}

function showMenu() {
	if (fb.loggedIn) {
		$.viewMenu.visible = true;
	} else {
		$.viewMenu.visible = false;
	}
}

function fbInit() {

	fb.appid = 562477560501939;
	fb.permissions = ['publish_stream'];
	fb.permissions = ['create_event'];
	fb.forceDialogAuth = false;

	fb.addEventListener('login', function(e) {
		if (e.success) {
			Ti.API.info('success callback fb: ' + JSON.stringify(e));
			showMenu();
		}
	});
	fb.addEventListener('logout', function(e) {
		alert('Logged out');
		showMenu();
	});

	// Add the button.  Note that it doesn't need a click event listener.
	$.win.add(fb.createLoginButton({
		top : 50,
		style : fb.BUTTON_STYLE_WIDE
	}));
}

function postStatus(e) {
	// Now create the status message after you've confirmed that authorize() succeeded
	fb.requestWithGraphPath('me/feed', {
		message : "Trying out FB Graph API and it's fun!"
	}, "POST", function(e) {
		if (e.success) {
			alert("Success!  From FB: " + e.result);
		} else {
			if (e.error) {
				alert(e.error);
			} else {
				alert("Unkown result");
			}
		}
	});
}

function showProfile(e) {
	fb.requestWithGraphPath('me', {}, 'GET', function(e) {
		if (e.success) {
			alert(e.result);
		} else if (e.error) {
			alert(e.error);
		} else {
			alert('Unknown response');
		}
	});

}

function createEvent(e) {
	// Now create the event after you've confirmed authorize() was successful.
	var starttime = new Date(2014, 7, 31, 19, 0, 0);
	// Ti.API.info('startTime : ' + starttime);
	// Ti.API.info('startTime stringify : ' + JSON.stringify(starttime));
	var endtime = new Date(2014, 7, 31, 22, 0, 0);
	// Ti.API.info('endTime : ' + endtime);
	var title = "Barry's Birthday Celebration";
	var description = "Barry will have a great party";
	var data = {
		start_time : starttime.toISOString(), // API expects a JSON stringified date
		end_time : endtime.toISOString(),
		summary : description,
		name : title
	};
	fb.requestWithGraphPath('me/events', data, 'POST', function(e) {
		if (e.success) {
			alert("Success! Returned from FB: " + e.result);
		} else {
			if (e.error) {
				alert(e.error);
			} else {
				alert("Unknown result");
			}
		}
	});
}
