/*The MIT License (MIT)

Copyright (c) 2013 Igor Shabat, shabat.igor@gmail.com, infiman.com

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/

;(function( $ ){
  $.fn.makeCollage = function (height, margin) {
    
    //Some settings which are used in this plugin
    var settings = $.extend({
      "targetHeight" : height,                    //max height of row
      "albumWidth"   : $(this).width(),  //width of collage. it sets automatically
      "margin"       : margin
    });
    
    //Getting "collage" div. Parsing and resizing images. 
    var imgArr = [];
    
    $(this).css("display", "block");
    $(this).css("opacity", 0);
    
    var $boxes = $(this).children();  //getting images divs
    
    $boxes.css("float", "left");
    $boxes.css("position", "relative");
    $boxes.css("margin-bottom", settings.margin);
    
    $boxes.each(function( index ) {
      var $imgs = $(this).children("img");  //getting images from divs
      
      $imgs.css("z-index", -1);
      $imgs.css("position", "absolute");
      
      var $box  = $(this);
    
      $imgs.each(function( index ) {
        var $img = $(this);
        
        //resizing images with settings.targetHeight option
        var w = $img.width() / $img.height() * settings.targetHeight;
        var h = settings.targetHeight;
        
        $box.width(w);  
        $box.height(h);
      
        $img.width(w);
        $img.height(h);
        
        //making array of resized divs and images
        imgArr.push([$box, $img]);
      });
    });
    
    
    //resizing images in a row to fit settings.albumWidth
    var dw = 0;
    var dh = 0;
    
    var mar = 0;

    var lastItem = 0;
    
    var delta = 0;
    var sum = 0;
    
    for (var _i = 0; _i < imgArr.length; _i++) {
      //finding images that can fit in one row
      dw += imgArr[_i][1].width();  
      
      if (dw >= settings.albumWidth) {
        delta = (settings.albumWidth - mar) / dw;  //coefficient of resizing
        
        //resizing founded before images 
        for (var _j = lastItem; _j <= _i; _j++, lastItem = _j) {
          if(_j < _i) {
            imgArr[_j][0].width(Math.floor(imgArr[_j][0].width() * delta));  
            imgArr[_j][0].height(Math.floor(imgArr[_j][0].height() * delta));
          
            imgArr[_j][1].width(Math.floor(imgArr[_j][1].width() * delta));
            imgArr[_j][1].height(Math.floor(imgArr[_j][1].height() * delta));
            
            imgArr[_j][0].css("margin-right", settings.margin);
          }
          else if(_j == _i) {  //fitting last image in the remaining segment of row
            imgArr[_j][0].width(settings.albumWidth - sum - mar);
            imgArr[_j][0].height(Math.floor(imgArr[_j - 1][0].height()));
            
            imgArr[_j][1].width(settings.albumWidth - sum - mar);
            imgArr[_j][1].height(Math.floor(imgArr[_j - 1][1].height()));
          }
            
          imgArr[_j][1].data("width", imgArr[_j][1].width());
          imgArr[_j][1].data("height", imgArr[_j][1].height());
        
          sum += Math.floor(imgArr[_j][1].width());
        }
        
        dw = 0;
        sum = 0;
        mar = 0;
      }
      else {
        mar += settings.margin;
      }
    }
    
    var t = 0;
    
    if (lastItem < imgArr.length) {
      dw = 0;
      
      for (_i = lastItem; _i < imgArr.length; _i++) {
        dw += imgArr[_i][1].width();
        
        if(_i < imgArr.length - 1) { 
            imgArr[_i][0].css("margin-right", settings.margin);
        }
        
        imgArr[_i][1].data("width", imgArr[_i][1].width());
        imgArr[_i][1].data("height", imgArr[_i][1].height());
      }
      
      t = Math.ceil((settings.albumWidth - dw) / 2);
    }
    
    //Fading out when all images are loaded and sorted.
    $(this).fadeTo(1000, 1);
  }
})( jQuery );