jQuery.makeCollage
==================

jQuery plugin for making interactive photo collages.

It's very simple to use:

1) This plugin works with jQuery API, so you need to include it to your project.

2) Add jquery.makeCollage.js or min.js to your project.

3) If you want just make collage without hover type this in your js file:
			
			$(".class_or_#id_of_collage").makeCollage(maxHeight, whiteSpaceWidth);
			
4) If you want hover effect just type this:

			$(".class_or_#id_of_collage").makeHover();
			
			or play with CSS3 transforms.
			
Structure of HTML divs must looks like this:

	<div class="collage">		<!--Collage container. To this container in js you must apply .makeCollage( ... )-->
      		<div class="box">	<!--Container of image-->
        		<a href="#"><span class="link"></span></a>	<!--If you want wrap image with link-->
        		<img src="http://placehold.it/350x150/69D2E7/ffffff">	<!--Your image-->
        		<div class="photo-bar">				<!--Bottom bar for some info-->
          			Some stuff 
        		</div>
      		</div>
      	</div>
			
Also don't be shy to fork it :)
Have a nice day!
