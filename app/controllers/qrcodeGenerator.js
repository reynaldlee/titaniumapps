var args = arguments[0] || {};

var qrview = $.webqr;
var pageLoaded = false;

//
qrview.addEventListener('load', function() {
	pageLoaded = true;
});

//Define function for inserting JS Script into webview
//Make sure page the page content is loaded before executing
function executeJS(text) {
	if (pageLoaded) {
		qrview.evalJS("$('#output').text('');");
		qrview.evalJS("jQuery(function() {jQuery('#output').qrcode(\"" + text + "\");});");
		Ti.API.log("text: " +  text);
	}
}

function convertText(e) {
	var qrtext = $.txtqr.value;
	executeJS(qrtext);
}

function convertMailto(e) {
	executeJS("mailto:contact@evotech.co.id");
}

function convertWebsite(e) {
	executeJS("www.evotech.co.id");
}

function convertContact(e) {
	var vcard = ["BEGIN:VCARD", "N:Reynald", "TEL:081314240802", "ORG:Evotech", "TITLE:Consultant", "EMAIL:mikepk@tenzerolab.com", "END:VCARD"];
	executeJS(vcard.join(" "));
}


