$(document).ready(function(){

	"use strict";

    // fixed header
    if($(window).width() > 974){
        var stk_header = $('.header');
        var winSelector = $(window);
        $(window).on('scroll', function() {
            if (winSelector.scrollTop() > 70) {
                stk_header.addClass('is-sticky');
            } else {
                stk_header.removeClass('is-sticky');
            }
        });
        if (winSelector.scrollTop() > 70) {
            stk_header.addClass('is-sticky');
        } else {
            stk_header.removeClass('is-sticky');
        }
    }
    if($(window).width() < 974){
        $('.arrow').on('click', function(){
            $(this).next().toggleClass('active');
        })
    }




	// page-loader
	$(window).on('load', function() {
	    $('#page-loader').delay(350).fadeOut('slow', function() {
	        $(this).remove();
	    });
	});



	/// Scroll to top
	$(window).on('scroll', function() {
	    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
	        $('.scroll-top.active').removeClass('active');
	        $('.scroll-top').addClass('active');    // Fade in the arrow
	    } else {
	        $('.scroll-top').removeClass('active');   // Else fade out the arrow
	    }
	});
	$('.scroll-top').on('click', function() {      // When arrow is clicked
	    $('body,html').animate({
	        scrollTop : 0                       // Scroll to top of body
	    }, 2000);
	});


});

