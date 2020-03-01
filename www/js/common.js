/*
 * Permatex
 * (c) 2013, Web factory Ltd
 */
 
jQuery(function($) {
  // main menu
  $('#main-navigation>li').hover(function(){
    var sub = $('.sub-menu', $(this));

    if ($(sub).length) {
      $(sub).fadeIn(300);
    }
  }, function(){
    var sub = $('.sub-menu', $(this));
    
    if ($(sub).length) {
      $(sub).stop().fadeOut(300);
    }
  });
  
  // generate mobile menu
  if ($('.menu_mobile').length) {
    var mobile_menu = $('.menu_mobile');
    $('#main-navigation li a').each(function(index, elem) {
      if ($(elem).parents('ul.sub-menu').length) {
        tmp = '&nbsp;&nbsp;-&nbsp;' + $(elem).html();
      } else {
        tmp = $(elem).html();
      }

      if ($(elem).parent('li').hasClass('current-menu-item')) {
        mobile_menu.append($('<option></option>').val($(elem).attr('href')).html(tmp).attr('selected', 'selected'));
      } else {
        mobile_menu.append($('<option></option>').val($(elem).attr('href')).html(tmp));
      }
    });
  }

  // mobile menu click
  $('.menu_mobile').change(function() {
    link = $(this).val();
    if (!link) {
      return;
    }
    document.location.href = link;
  });
  
  // lightbox gallery on carosel
  if ($(window).width() > 767) {
    if ($("a[data-gal^='prettyPhoto']").length) {
      $("a[data-gal^='prettyPhoto']").each(function(ind, el) {
        $(el).attr('rel', $(el).attr('data-gal'));
      });
      
      $("a[rel^='prettyPhoto']").prettyPhoto({social_tools: false, deeplinking: false});
    }
  } else {
    $("a[data-gal^='prettyPhoto']").click(function() {
      return false;
    });
  }
 
  // carosel slider/gallery
  if ($(window).width() > 767) {
    if ($('.flexslider-carousel').length) {
      $('.flexslider-carousel').flexslider({
        animation: "slide",
        easing: "swing",
        slideshow: true,
        slideshowSpeed: 7000,
        animationSpeed: 600,
        touch: true,
        controlNav: false,
        directionNav: true,
        animationLoop: true,
        itemWidth: 220,
        itemMargin: 0,
        minItems: 4,
        maxItems: 4
      });
    }
  }
  
  // header slider
  if ($('.flexslider').length) {
    $('.flexslider').flexslider({
      animation: "fade",
      directionNav: true,
      controlNav: false,
      pauseOnAction: true,
      pauseOnHover: true,
      direction: "horizontal",
      slideshowSpeed: 5500
    });
  }

  // Twitter feed
  if ($('#tweet').length) {
    $('#tweet').tweet({
            username: 'envato',
            join_text: 'auto',
            avatar_size: 0,
            count: 1,
            auto_join_text_default: ' we said, ',
            auto_join_text_ed: ' we ',
            auto_join_text_ing: ' we were ',
            auto_join_text_reply: ' we replied to ',
            auto_join_text_url: ' we were checking out ',
            loading_text: 'Loading tweets...'
        });
  };
  
  // blockquote rotator
  $('#quotes blockquote').quovolver(500, 6000);
  
  // simple open/close FAQ
  $('#faqholder').simpleFaq();
  
  // tooltips on social icons
  $('.social-icons a').tooltip();
  
  // smooth scrolling anchors
  $('.smoothscroll').click(function(e) {
    el = $(this).attr('href');
    $('html, body').animate({scrollTop: $(el).offset().top - 0}, 'slow');
    e.preventDefault();
    
    return false;
  });

  // gmap init
  $('.gmap').each(function(index, element) {
    var gmap = $(element);
    var addr = 'http://maps.google.com/maps?hl=en&ie=utf8&output=embed&sensor=true&iwd=1&mrt=loc&t=m&q=' + encodeURIComponent(gmap.attr('data-address'));
    addr += '&z=' + gmap.attr('data-zoom');
    if (gmap.attr('data-bubble') == 'true') {
      addr += '&iwloc=addr';
    } else {
      addr += '&iwloc=near';
    }
    gmap.attr('src', addr);
  });

  // links & icons hover effects
  $('#logo,.store-buttons a,.social-icons a,.flexslider-carousel img').css('opacity', '1');
  $('#logo,.store-buttons a,.social-icons a,.flexslider-carousel img').hover(
    function () {
      $(this).stop().animate({ opacity: .35 }, 'normal');
    },
    function () {
      $(this).stop().animate({ opacity: 1 }, 'normal');
  });
    
  $('.over').css('opacity', '0');
  $('.over').hover(
    function () {
       $(this).stop().animate({ opacity: 1 }, 'slow');
    },
    function () {  
       $(this).stop().animate({ opacity: 0 }, 'slow');
  });
 
  // init newsletter subscription AJAX handling
  if ($('#newsletterform').length) {
    if ($('#newsletterform').attr('data-mailchimp') == 'true') {
      $('#newsletterform').attr('action', '_newsletter-subscribe-mailchimp.php');
      $('#newsletterform').ajaxForm({ dataType: 'json',
                                       timeout: 2000,
                                       success: newsletterResponseMailchimp});
    } else {
      $('#newsletterform').attr('action', '_newsletter-subscribe.php');
      $('#newsletterform').ajaxForm({ dataType: 'json',
                                      timeout: 2000,
                                      success: newsletterResponse});
    }
    $('#button-newsletter').click(function() { $('#newsletterform').submit(); return false; });
  } // if newsletter form
  
  // load captcha question for contact form
  if ($('#captcha-img').length) {
    $.get('_captcha.php?generate', function(response) {
      $('#captcha-img').html(response);
    }, 'html');
  }
  
  // contact form
  if ($('#contact_form').length) {
    $('#contact_form').validate({ rules: { name: { required: true},
                                          email: { required: true, email: true },
                                          message: { required: true },
                                          type: { required: true },
                                          _captcha: { required: true, remote: '_captcha.php' }},
                                 messages: { name: 'This field is required.',
                                             email: { required: 'This field is required.',
                                                      email: 'Please enter a valid email address.'},
                                             message: 'This field is required.',
                                             _captcha: 'Are you really a human?'},
                                 submitHandler: function(form) {  $(form).ajaxSubmit({ dataType: 'json',
                                                                                        success: contactFormResponse }); }
                              });
  } // if contact form
}); // onload

// handle contact form AJAX response
function contactFormResponse(response) {
  if (response.responseStatus == 'err') {
    if (response.responseMsg == 'ajax') {
      alert('Error - this script can only be invoked via an AJAX call.');
    } else if (response.responseMsg == 'notsent') {
      alert('We are having some mail server issues. Please refresh the page or try again later.');
    } else {
      alert('Undocumented error. Please refresh the page and try again.');
    }
  } else if (response.responseStatus == 'ok') {
    alert('Thank you for contacting us! We\'ll get back to you ASAP.');
  } else {
    alert('Undocumented error. Please refresh the page and try again.');
  }
  
  location.reload(true);
} // contactFormResponse

// handle newsletter subscribe AJAX response
function newsletterResponse(response) {
  if (response.responseStatus == 'err') {
    if (response.responseMsg == 'ajax') {
      alert('Error - this script can only be invoked via an AJAX call.');
    } else if (response.responseMsg == 'fileopen') {
      alert('Error opening $emailsFile. Please refer to documentation for help.');
    } else if (response.responseMsg == 'name') {
      alert('Please enter a valid name.');
    } else if (response.responseMsg == 'email') {
      alert('Please enter a valid email address.');
    } else if (response.responseMsg == 'duplicate') {
      alert('You are already subscribed to our newsletter.');
    } else if (response.responseMsg == 'filewrite') {
      alert('Error writing to $emailsFile. Please refer to documentation for help.');
    } else {
      alert('Undocumented error. Please refresh the page and try again.');
    }
  } else if (response.responseStatus == 'ok') {
    alert('Thank you for subscribing to our newsletter! We will not abuse your address.');
  } else {
    alert('Undocumented error. Please refresh the page and try again.');
  }
} // newsletterResponse

// handle newsletter subscribe AJAX response - Mailchimp ver
function newsletterResponseMailchimp(response) {
  if (response.responseStatus == 'err') {
    if (response.responseMsg == 'ajax') {
      alert('Error - this script can only be invoked via an AJAX call.');
    } else if (response.responseMsg == 'name') {
      alert('Please enter a valid name.');
    } else if (response.responseMsg == 'email') {
      alert('Please enter a valid email address.');
    } else if (response.responseMsg == 'listid') {
      alert('Invalid MailChimp list name.');
    } else if (response.responseMsg == 'duplicate') {
      alert('You are already subscribed to our newsletter.');
    } else {
      alert('Undocumented error (' + response.responseMsg + '). Please refresh the page and try again.');
    }
  } else if (response.responseStatus == 'ok') {
    alert('Thank you for subscribing! Please confirm your subscription in the email you\'ll receive shortly.');
  } else {
    alert('Undocumented error. Please refresh the page and try again.');
  }
} // newsletterResponseMailchimp

(function($){
  $.fn.simpleFaq = function() {  
    return this.each(function() {
      var $this = $(this);
      $('dd', $this).hide();
      $('dt', $this).bind('click', function(){
        $(this).toggleClass('open').next().slideToggle();
      });
    });
  };
})(jQuery); // simple faq plugin