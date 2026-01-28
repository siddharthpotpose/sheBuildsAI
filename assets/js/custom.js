(function ($) {
	
	"use strict";

	// Page loading animation
	$(window).on('load', function() {

        $('#js-preloader').addClass('loaded');

    });


	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
	  var box = $('.header-text').height();
	  var header = $('header').height();

	  if (scroll >= box - header) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }
	})

	var width = $(window).width();
		$(window).resize(function() {
		if (width > 767 && $(window).width() < 767) {
			location.reload();
		}
		else if (width < 767 && $(window).width() > 767) {
			location.reload();
		}
	})

	const elem = document.querySelector('.event_box');
	const filtersElem = document.querySelector('.event_filter');
	if (elem) {
		const rdn_events_list = new Isotope(elem, {
			itemSelector: '.event_outer',
			layoutMode: 'masonry'
		});
		if (filtersElem) {
			filtersElem.addEventListener('click', function(event) {
				if (!matchesSelector(event.target, 'a')) {
					return;
				}
				const filterValue = event.target.getAttribute('data-filter');
				rdn_events_list.arrange({
					filter: filterValue
				});
				filtersElem.querySelector('.is_active').classList.remove('is_active');
				event.target.classList.add('is_active');
				event.preventDefault();
			});
		}
	}


	$('.owl-banner').owlCarousel({
		center: true,
      items:1,
      loop:true,
      nav: true,
	  navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
      margin:30,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      responsive:{
        992:{
            items:1
        },
		1200:{
			items:1
		}
      }
	}).on('changed.owl.carousel', function(event) {
		// Re-trigger animations on carousel slide change
		var currentItem = $('.owl-banner .owl-item').eq(event.item.index);
		var animatedElements = currentItem.find('.animate__animated');
		
		// Remove animation classes
		animatedElements.each(function() {
			var element = $(this);
			var animationClasses = element.attr('class').match(/animate__\w+/g) || [];
			
			// Store animation classes
			element.data('animation-classes', animationClasses);
			
			// Remove all animate classes
			animationClasses.forEach(function(animClass) {
				element.removeClass(animClass);
			});
		});
		
		// Force reflow
		void currentItem[0].offsetWidth;
		
		// Re-add animation classes
		animatedElements.each(function() {
			var element = $(this);
			var animationClasses = element.data('animation-classes') || [];
			
			animationClasses.forEach(function(animClass) {
				element.addClass(animClass);
			});
		});
	});

	$('.owl-testimonials').owlCarousel({
	  center: true,
      items:1,
      loop:true,
      nav: true,
	  navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
      margin:30,
      responsive:{
        992:{
            items:1
        },
		1200:{
			items:1
		}
      }
	});


	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var width = $(window).width();
				if(width < 767) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);	
				}				
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});

	$(document).ready(function () {
	    $(document).on("scroll", onScroll);
	    
	    //smoothscroll
	    $('.scroll-to-section a[href^="#"]').on('click', function (e) {
	        e.preventDefault();
	        $(document).off("scroll");
	        
	        $('.scroll-to-section a').each(function () {
	            $(this).removeClass('active');
	        })
	        $(this).addClass('active');
	      
	        var target = this.hash,
	        menu = target;
	       	var target = $(this.hash);
	        $('html, body').stop().animate({
	            scrollTop: (target.offset().top) - 79
	        }, 500, 'swing', function () {
	            window.location.hash = target;
	            $(document).on("scroll", onScroll);
	        });
	    });
	});

	function onScroll(event){
	    var scrollPos = $(document).scrollTop();
	    $('.nav a').each(function () {
	        var currLink = $(this);
	        var refElement = $(currLink.attr("href"));
	        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	            $('.nav ul li a').removeClass("active");
	            currLink.addClass("active");
	        }
	        else{
	            currLink.removeClass("active");
	        }
	    });
	}


	// Page loading animation
	$(window).on('load', function() {
		if($('.cover').length){
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#preloader").animate({
			'opacity': '0'
		}, 600, function(){
			setTimeout(function(){
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});

	const dropdownOpener = $('.main-nav ul.nav .has-sub > a');

    // Open/Close Submenus
    if (dropdownOpener.length) {
        dropdownOpener.each(function () {
            var _this = $(this);

            _this.on('tap click', function (e) {
                var thisItemParent = _this.parent('li'),
                    thisItemParentSiblingsWithDrop = thisItemParent.siblings('.has-sub');

                if (thisItemParent.hasClass('has-sub')) {
                    var submenu = thisItemParent.find('> ul.sub-menu');

                    if (submenu.is(':visible')) {
                        submenu.slideUp(450, 'easeInOutQuad');
                        thisItemParent.removeClass('is-open-sub');
                    } else {
                        thisItemParent.addClass('is-open-sub');

                        if (thisItemParentSiblingsWithDrop.length === 0) {
                            thisItemParent.find('.sub-menu').slideUp(400, 'easeInOutQuad', function () {
                                submenu.slideDown(250, 'easeInOutQuad');
                            });
                        } else {
                            thisItemParent.siblings().removeClass('is-open-sub').find('.sub-menu').slideUp(250, 'easeInOutQuad', function () {
                                submenu.slideDown(250, 'easeInOutQuad');
                            });
                        }
                    }
                }

                e.preventDefault();
            });
        });
    }

	// FAQ Accordion
	$('.faq-question').on('click', function() {
		var $faqItem = $(this).parent('.faq-item');
		
		// Close all other FAQ items
		$('.faq-item').not($faqItem).removeClass('active');
		
		// Toggle current FAQ item
		$faqItem.toggleClass('active');
	});

	// Scroll-triggered animations using Animate.css
	$(document).ready(function() {
		// Function to check if element is in viewport
		function isElementInViewport(el) {
			var rect = el.getBoundingClientRect();
			return (
				rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
				rect.bottom >= 0
			);
		}

		// Function to add animation class when element is in viewport
		function animateOnScroll() {
			var animatedElements = document.querySelectorAll('.animate-on-scroll');
			
			animatedElements.forEach(function(element, index) {
				if (isElementInViewport(element) && !element.classList.contains('animate__animated')) {
					// Add animation classes with staggered delay based on index
					var animationType = 'animate__fadeInUp';
					var delay = (index % 3) * 0.2; // Stagger animations in groups of 3
					
					element.style.animationDelay = delay + 's';
					element.classList.add('animate__animated', animationType);
				}
			});
		}

		// Initial check on page load
		animateOnScroll();

		// Check on scroll
		$(window).on('scroll', function() {
			animateOnScroll();
		});

		// Add hover effects for interactive elements
		$('.service-item, .feature-item, .tech-item, .team-member, .events_item').hover(
			function() {
				$(this).addClass('animate__pulse');
			},
			function() {
				$(this).removeClass('animate__pulse');
			}
		);

		// Add animation to section headings
		$('.section-heading').each(function(index) {
			$(this).addClass('animate-on-scroll');
		});

		// Add animation to counters
		$('.counter').each(function(index) {
			$(this).addClass('animate-on-scroll');
		});

		// Add animation to step items
		$('.step-item').each(function(index) {
			$(this).addClass('animate-on-scroll');
		});

		// Add animation to FAQ items
		$('.faq-item').each(function(index) {
			$(this).addClass('animate-on-scroll');
		});

		// Add animation to event items
		$('.events .item').each(function(index) {
			$(this).addClass('animate-on-scroll');
		});

		// Add animation to contact form
		$('#contact-form').addClass('animate-on-scroll');
	});

})(window.jQuery);