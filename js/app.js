thisrgb = new Object();
var chartcolor1 = "";
var chartcolor2 = "";
var chartcolor3 = "";
var chartcolor4 = "";
var chartcolor5 = "";

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
  
  $scope.rval = 0;
  $scope.gval = 0;
  $scope.bval = 0;
  
  $scope.$watch('rval', function() { $scope.rval = parseFloat($scope.rval); });
  $scope.$watch('gval', function() { $scope.gval = parseFloat($scope.gval); });
  $scope.$watch('bval', function() { $scope.bval = parseFloat($scope.bval); });
  
  $scope.change = function() {
    
    var hex = rgbToHex(parseFloat($scope.rval), parseFloat($scope.gval), parseFloat($scope.bval));
    // making the color the value of the input
    $('#rgb input').val((parseFloat($scope.rval)) + ", " + (parseFloat($scope.gval)) + ", " + (parseFloat($scope.bval)));
    $('#hex input').val(hex);
    $('#selectedcolor').css("background-color", hex);	

    thisrgb.r = parseFloat($scope.rval);
    thisrgb.g = parseFloat($scope.gval);
    thisrgb.b = parseFloat($scope.bval);

    temphsv = RGB2HSV(thisrgb);
    temphsv.hue = HueShift(temphsv.hue, 72.0);
    temprgb = HSV2RGB(temphsv);

    temphsv1 = RGB2HSV(thisrgb);
    temphsv1.hue = HueShift(temphsv1.hue, 144.0);
    temprgb1 = HSV2RGB(temphsv1);

    temphsv2 = RGB2HSV(thisrgb);
    temphsv2.hue = HueShift(temphsv2.hue, 216.0);
    temprgb2 = HSV2RGB(temphsv2);

    temphsv3 = RGB2HSV(thisrgb);
    temphsv3.hue = HueShift(temphsv3.hue, 288.0);
    temprgb3 = HSV2RGB(temphsv3);

    document.getElementById("code").innerHTML = 'colors="' + rgbToHex(parseFloat($scope.rval), parseFloat($scope.gval), parseFloat($scope.bval)) + ',' + rgbToHex(temprgb.r, temprgb.g, temprgb.b) + ',' + rgbToHex(temprgb1.r, temprgb1.g, temprgb1.b) + ',' + rgbToHex(temprgb2.r, temprgb2.g, temprgb2.b) + ',' + rgbToHex(temprgb3.r, temprgb3.g, temprgb3.b) + '"';

    document.getElementById("color1").innerHTML = rgbToHex(parseFloat($scope.rval), parseFloat($scope.gval), parseFloat($scope.bval));
    document.querySelector("#color1").style.backgroundColor = rgbToHex(parseFloat($scope.rval), parseFloat($scope.gval), parseFloat($scope.bval));

    document.getElementById("color2").innerHTML = rgbToHex(temprgb.r, temprgb.g, temprgb.b);
    document.querySelector("#color2").style.backgroundColor = rgbToHex(temprgb.r, temprgb.g, temprgb.b);

    document.getElementById("color3").innerHTML = rgbToHex(temprgb1.r, temprgb1.g, temprgb1.b);
    document.querySelector("#color3").style.backgroundColor = rgbToHex(temprgb1.r, temprgb1.g, temprgb1.b);

    document.getElementById("color4").innerHTML = rgbToHex(temprgb2.r, temprgb2.g, temprgb2.b);
    document.querySelector("#color4").style.backgroundColor = rgbToHex(temprgb2.r, temprgb2.g, temprgb2.b);

    document.getElementById("color5").innerHTML = rgbToHex(temprgb3.r, temprgb3.g, temprgb3.b);
    document.querySelector("#color5").style.backgroundColor = rgbToHex(temprgb3.r, temprgb3.g, temprgb3.b);

    chartcolor1 = rgbToHex(parseFloat($scope.rval), parseFloat($scope.gval), parseFloat($scope.bval));
    chartcolor2 = rgbToHex(temprgb.r, temprgb.g, temprgb.b);
    chartcolor3 = rgbToHex(temprgb1.r, temprgb1.g, temprgb1.b);
    chartcolor4 = rgbToHex(temprgb2.r, temprgb2.g, temprgb2.b);
    chartcolor5 = rgbToHex(temprgb3.r, temprgb3.g, temprgb3.b);
  };
  
  

  //RGB to Hex
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  function RGB2HSV(rgb) {
    hsv = new Object();
    max = max3(rgb.r, rgb.g, rgb.b);
    dif = max - min3(rgb.r, rgb.g, rgb.b);
    hsv.saturation = (max == 0.0) ? 0 : (100 * dif / max);
    if (hsv.saturation == 0) hsv.hue = 0;
    else if (rgb.r == max) hsv.hue = 60.0 * (rgb.g - rgb.b) / dif;
    else if (rgb.g == max) hsv.hue = 120.0 + 60.0 * (rgb.b - rgb.r) / dif;
    else if (rgb.b == max) hsv.hue = 240.0 + 60.0 * (rgb.r - rgb.g) / dif;
    if (hsv.hue < 0.0) hsv.hue += 360.0;
    hsv.value = Math.round(max * 100 / 255);
    hsv.hue = Math.round(hsv.hue);
    hsv.saturation = Math.round(hsv.saturation);
    return hsv;
  }

  // RGB2HSV and HSV2RGB are based on Color Match Remix [http://color.twysted.net/]
  // which is based on or copied from ColorMatch 5K [http://colormatch.dk/]
  function HSV2RGB(hsv) {
    var rgb = new Object();
    if (hsv.saturation == 0) {
      rgb.r = rgb.g = rgb.b = Math.round(hsv.value * 2.55);
    } else {
      hsv.hue /= 60;
      hsv.saturation /= 100;
      hsv.value /= 100;
      i = Math.floor(hsv.hue);
      f = hsv.hue - i;
      p = hsv.value * (1 - hsv.saturation);
      q = hsv.value * (1 - hsv.saturation * f);
      t = hsv.value * (1 - hsv.saturation * (1 - f));
      switch (i) {
        case 0:
          rgb.r = hsv.value;
          rgb.g = t;
          rgb.b = p;
          break;
        case 1:
          rgb.r = q;
          rgb.g = hsv.value;
          rgb.b = p;
          break;
        case 2:
          rgb.r = p;
          rgb.g = hsv.value;
          rgb.b = t;
          break;
        case 3:
          rgb.r = p;
          rgb.g = q;
          rgb.b = hsv.value;
          break;
        case 4:
          rgb.r = t;
          rgb.g = p;
          rgb.b = hsv.value;
          break;
        default:
          rgb.r = hsv.value;
          rgb.g = p;
          rgb.b = q;
      }
      rgb.r = Math.round(rgb.r * 255);
      rgb.g = Math.round(rgb.g * 255);
      rgb.b = Math.round(rgb.b * 255);
    }
    return rgb;
  }

  //Adding HueShift via Jacob (see comments)
  function HueShift(h, s) {
    h += s;
    while (h >= 360.0) h -= 360.0;
    while (h < 0.0) h += 360.0;
    return h;
  }

  //min max via Hairgami_Master (see comments)
  function min3(a, b, c) {
    return (a < b) ? ((a < c) ? a : c) : ((b < c) ? b : c);
  }

  function max3(a, b, c) {
    return (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);
  }  
	
  
  
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
  
  //jQuery onClick Function
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
    
    $scope.rval = R;
    $scope.gval = G;
    $scope.bval = B;
    $scope.change();

  });

};

});


//window.onload = function() {
//
//  var c = document.getElementById('canvas_picker');
//  var ctx = c.getContext("2d");
//
//  // create an image object and get it’s source
//  var img = new Image();
//  img.src = '../img/colorwheel.png';
//  img.crossOrigin = "Anonymous";
//	
//  img.addEventListener("load", function() {
//  	ctx.drawImage(img, 0, 0);
//  }, false);	
//	
//  // http://www.javascripter.net/faq/rgbtohex.htm
//  function rgbToHex(R, G, B) {
//    return toHex(R) + toHex(G) + toHex(B)
//  }
//
//  function toHex(n) {
//    n = parseInt(n, 10);
//    if (isNaN(n)) return "00";
//    n = Math.max(0, Math.min(n, 255));
//    return "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16);
//  }
//  
//  //jQuery onClick Function
//  $('#canvas_picker').click(function(event) {
//	  
//    // getting user coordinates
//    var x = event.pageX - this.offsetLeft;
//    var y = event.pageY - this.offsetTop;
//
//    // getting image data and RGB values
//    var img_data = ctx.getImageData(x, y, 1, 1).data;
//    var R = img_data[0];
//    var G = img_data[1];
//    var B = img_data[2];
//    var rgb = R + ',' + G + ',' + B;
//    // convert RGB to HEX
//
//    var hex = rgbToHex(R, G, B);
//    // making the color the value of the input
//    $('#rgb input').val(rgb);
//    $('#hex input').val('#' + hex);
//    $('#selectedcolor').css("background-color", '#' + hex);
//
//  });
//
//};

