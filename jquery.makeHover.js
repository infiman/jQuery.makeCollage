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

;(function( $ ) {
  $.fn.makeHover = function() {

    var settings = $.extend({
    });

    $('.box').on({

      mouseenter: function() {
        $(this).css('z-index', 3000);
        $(this).children('img').stop().animate(
          { 
            height: Math.ceil($(this).children('img').data("height") * 1.5), 
            width:  Math.ceil($(this).children('img').data("width") * 1.5), 
            left:   -Math.ceil((($(this).children('img').data("width") / 2) * 1.5) - 
                    Math.ceil(($(this).children('img').data("width") / 2))),
            top:    -Math.ceil((($(this).children('img').data("height") / 2) * 1.5) - 
                    Math.ceil(($(this).children('img').data("height") / 2))) 
          },
          150,
          'linear',
          function() {
            scaleBar(this, "upscale")
          });    
      },

      mouseleave: function() {
        $(this).children('img').stop().animate(
          { 
            height: $(this).children('img').data("height"), 
            width:  $(this).children('img').data("width"), 
            left:   0,
            top:    0 
          },
          1,
          'linear',
          function() {
            $(this).parent().css('z-index', 0);

            scaleBar(this, "downscale")
          });   
      }
    });

    function scaleBar(owner, condition) {
      if (condition == "upscale") {
        var top = parseInt($(owner).css('top'), 10) + 
                  parseInt($(owner).css('height'), 10) - 
                  $(owner).parent().children('.photo-bar').height();
                                                   
        var left = Math.ceil(parseInt($(owner).css('left'), 10));
                                                   
        var width = parseInt($(owner).css('width'), 10);

        $(owner).parent().children('.photo-bar').css('z-index', 2);
        $(owner).parent().children('.photo-bar').css("top", top);
        $(owner).parent().children('.photo-bar').css("left", left);
        $(owner).parent().children('.photo-bar').css("width", width);
        $(owner).parent().children('.photo-bar').stop().animate({opacity: 0.9}, 300);
      }
      else if (condition == "downscale") {
        $(owner).parent().children('.photo-bar').css('z-index', 0);
        $(owner).parent().children('.photo-bar').stop().animate({opacity: 0}, 1);
      }
    }
  }
})( jQuery );