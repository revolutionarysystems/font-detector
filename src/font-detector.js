var FontDetector = function(targetDocument) {
	
	targetDocument = targetDocument || document;

	var initialised = false;

	var h;
	var d;
	var s;

	var defaultWidth;
	var defaultHeight;

	function init() {
		h = targetDocument.getElementsByTagName("BODY")[0];
		d = targetDocument.createElement("DIV");
		s = targetDocument.createElement("SPAN");
		d.appendChild(s);
		d.style.fontFamily = "serif"; //font for the parent element DIV.
		s.style.fontFamily = "serif"; //serif font used as a comparator.
		s.style.fontSize = "72px"; //we test using 72px font size, we may use any size. I guess larger the better.
		s.innerHTML = "mmmmmmmmmmlil"; //we use m or w because these two characters take up the maximum width. And we use a L so that the same matching fonts can get separated
		h.appendChild(d);
		defaultWidth = s.offsetWidth; //now we have the defaultWidth
		defaultHeight = s.offsetHeight; //and the defaultHeight, we compare other fonts with these.
		h.removeChild(d);
		initialised = true;
	}

	function test(font) {
		if(!initialised){
			init();
		}
		h.appendChild(d);
		s.style.fontFamily = font;
		var width = s.offsetWidth; // Width
		var height = s.offsetHeight; // Height
		h.removeChild(d);
		font = font.toLowerCase();
		if (font == "serif") {
			return true; // to set arial and sans-serif true
		} else {
			return (width != defaultWidth || height != defaultHeight); // Detected?
		}
	}

	this.test = test;
};