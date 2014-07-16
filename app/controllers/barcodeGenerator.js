var args = arguments[0] || {};

function generateBC(e){
	if($.txtBarcode.value != ""){
		$.lblBC.text = "*" + $.txtBarcode.value + "*";
	}else{
		alert("Please Insert Text!");
	}
}