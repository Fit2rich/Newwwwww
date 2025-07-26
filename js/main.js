AOS.init({
  duration: 800,
  easing: 'slide'
});

(function($) {
  "use strict";

  // 1. Hero Section Full Height Fix (with mobile vh support)
  function fullHeightFix() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    $('.js-fullheight').css('height', `calc(var(--vh, 1vh) * 100)`);
  }

  $(document).ready(function () {
    fullHeightFix();
    $(window).on('resize orientationchange', fullHeightFix);
  });

  // 2. Loader
  var loader = function() {
    setTimeout(function() {
      $('#ftco-loader').removeClass('show');
    }, 1);
  };
  loader();

  // 3. Stellar Parallax
  $(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });

  // 4. Scrollax on All Devices
  if ($.Scrollax) {
    $.Scrollax();
  }

  // 5. Burger Menu Toggle
  var burgerMenu = function() {
    $('body').on('click', '.js-fh5co-nav-toggle', function(event) {
      event.preventDefault();
      $(this).toggleClass('active');
    });
  };
  burgerMenu();

  // 6. Smooth Scroll
  var onePageClick = function() {
    $(document).on('click', '#ftco-nav a[href^="#"]', function(event) {
      event.preventDefault();
      var target = $($.attr(this, 'href'));
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 70
        }, 500);
      }
    });
  };
  onePageClick();

  // 7. Owl Carousel
  var carousel = function() {
    $('.home-slider').owlCarousel({
      loop: true,
      autoplay: true,
      margin: 0,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      nav: false,
      autoplayHoverPause: false,
      items: 1,
      navText: [
        "<span class='ion-md-arrow-back'></span>",
        "<span class='ion-chevron-right'></span>"
      ]
    });
  };
  carousel();

  // 8. Dropdown Menu Hover
  $('nav .dropdown').hover(function() {
    var $this = $(this);
    $this.addClass('show');
    $this.find('> a').attr('aria-expanded', true);
    $this.find('.dropdown-menu').addClass('show');
  }, function() {
    var $this = $(this);
    $this.removeClass('show');
    $this.find('> a').attr('aria-expanded', false);
    $this.find('.dropdown-menu').removeClass('show');
  });

  // 9. Navbar Scroll Effects
  var scrollWindow = function() {
    $(window).scroll(function() {
      var st = $(this).scrollTop();
      var navbar = $('.ftco_navbar');
      var sd = $('.js-scroll-wrap');

      if (st > 150) {
        navbar.addClass('scrolled');
      } else {
        navbar.removeClass('scrolled sleep');
      }

      if (st > 350) {
        navbar.addClass('awake');
        sd.addClass('sleep');
      } else {
        navbar.removeClass('awake').addClass('sleep');
        sd.removeClass('sleep');
      }
    });
  };
  scrollWindow();

  // 10. Counter Animation
  var counter = function() {
    $('#section-counter, .hero-wrap, .ftco-counter, .ftco-about').waypoint(function(direction) {
      if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
        var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
        $('.number').each(function() {
          var $this = $(this),
              num = $this.data('number');
          $this.animateNumber({
            number: num,
            numberStep: comma_separator_number_step
          }, 7000);
        });
      }
    }, { offset: '95%' });
  };
  counter();

  // 11. Animate Elements on Scroll
  var contentWayPoint = function() {
    var i = 0;
    $('.ftco-animate').waypoint(function(direction) {
      if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
        i++;
        $(this.element).addClass('item-animate');
        setTimeout(function() {
          $('body .ftco-animate.item-animate').each(function(k) {
            var el = $(this);
            setTimeout(function() {
              var effect = el.data('animate-effect');
              if (effect === 'fadeIn') {
                el.addClass('fadeIn ftco-animated');
              } else if (effect === 'fadeInLeft') {
                el.addClass('fadeInLeft ftco-animated');
              } else if (effect === 'fadeInRight') {
                el.addClass('fadeInRight ftco-animated');
              } else {
                el.addClass('fadeInUp ftco-animated');
              }
              el.removeClass('item-animate');
            }, k * 50, 'easeInOutExpo');
          });
        }, 100);
      }
    }, { offset: '95%' });
  };
  contentWayPoint();

  // 12. Fallback: Trigger animations on load if visible (for mobile fix)
  $.fn.visible = function(partial) {
    var $t = $(this),
        $w = $(window),
        viewTop = $w.scrollTop(),
        viewBottom = viewTop + $w.height(),
        _top = $t.offset().top,
        _bottom = _top + $t.height(),
        compareTop = partial ? _bottom : _top,
        compareBottom = partial ? _top : _bottom;
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
  };

  $(window).on('load', function () {
    $('.ftco-animate').each(function () {
      if ($(this).visible(true)) {
        $(this).addClass('fadeInUp ftco-animated');
      }
    });
  });

  // 13. Magnific Popup - Image
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300
    }
  });

  // 14. Magnific Popup - Iframe (YouTube, Vimeo, Google Maps)
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

})(jQuery);
