window.onload = function() {

  var c = document.getElementById('canvas_picker');
  var ctx = c.getContext("2d");

  // create an image object and get it’s source
  var img = new Image();
  img.src = '../img/colorwheel.png';
  img.crossOrigin = "Anonymous";
	
  img.addEventListener("load", function() {
  	ctx.drawImage(img, 0, 0);
  }, false);	
	
  

  // http://www.javascripter.net/faq/rgbtohex.htm
  function rgbToHex(R, G, B) {
    return toHex(R) + toHex(G) + toHex(B)
  }

  function toHex(n) {
    n = parseInt(n, 10);
    if (isNaN(n)) return "00";
    n = Math.max(0, Math.min(n, 255));
    return "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16);
  }

  $('#canvas_picker').click(function(event) {
	  
    // getting user coordinates
    var x = event.pageX - this.offsetLeft;
    var y = event.pageY - this.offsetTop;

    // getting image data and RGB values
    var img_data = ctx.getImageData(x, y, 1, 1).data;
    var R = img_data[0];
    var G = img_data[1];
    var B = img_data[2];
    var rgb = R + ',' + G + ',' + B;
    // convert RGB to HEX

    var hex = rgbToHex(R, G, B);
    // making the color the value of the input
    $('#rgb input').val(rgb);
    $('#hex input').val('#' + hex);
    $('#selectedcolor').css("background-color", '#' + hex);	

  });

};