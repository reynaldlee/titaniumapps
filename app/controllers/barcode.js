var args = arguments[0] || {};

var titaniumBarcode = require('id.evo.prototype');

titaniumBarcode.scan({
  success: function (data) {
    if(data && data.barcode) {
      var label = Titanium.UI.createLabel({
        text:'Barcode: ' + data.barcode,
        textAlign:'center',
        width:'auto'
      });
      win.add(label);
    } else {
      alert(JSON.stringify(data));
    }
  },

  error: function (err) { 
    alert("Error!! " + err); 
  },

  cancel: function () { 
    alert("cancel"); 
  }
});