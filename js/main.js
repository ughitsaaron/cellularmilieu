if(Modernizr.cssvhunit) {
  $(".big").height($(window).outerHeight());
  $("main").css("marginTop",$(window).outerHeight());
}

$(".fancybox").fancybox({
  padding:0,
  helpers: {
    overlay: {
      locked: false
    }
  }
});

(function($) {
  "use strict";

  /* Autohider by Aaron Petcoff https://gist.github.com/aptkf/1a5ffdad876a80610b63 */
 
  $.fn.autohider = function(args) {
 
    var defaults = {
      toggle: "visible",
      buffer:70,
      tolerance: 8
    };
 
    args = $.extend(defaults, args);
 
    return this.each(function() {
      
      var last;
      var $this = $(this);
 
      $(window).scroll(function() {
 
        var current = $(this).scrollTop();
 
        if(current > last && current >= args.buffer) {
          // scrolling down and past the buffer
          $this.removeClass(args.toggle);
        } else if (last - current > args.tolerance && !(current < args.buffer)) {
          // scrolling up past the tolerance level
          $this.addClass(args.toggle);
        } else if (current < args.buffer && $this.hasClass(args.toggle)) {
          $this.removeClass(args.toggle);
        }

        // record last scroll position
        last = current;
      });
    });
  };
})(jQuery);


$(document).ready(function() {
  "use strict";

  (function() {
    var header = $('header').position().top+$('header').outerHeight(true);
    var $navTop = $(".nav-top");

    $(".header-link").click(function(e) {
      e.preventDefault();
      $("html, body").animate({
        scrollTop:header
      }, 1000);
    });

    $navTop.click(function(e) {
      e.preventDefault();
      $("html, body").animate({
        scrollTop:0
      }, 1000);
    });

    $navTop.autohider({
      buffer:header
    })
  })();

  (function() {

    var formData = {};

    $("#form").on("submit", function(e) {
      e.preventDefault();

      $("button").prop("disabled",true);

      formData.name = $(".contact-name").val();
      formData.tel = $(".contact-phone").val();
      formData.email = $(".contact-email").val();
      formData.message = $(".contact-message").val();

      $.ajax({
        dataType:"jsonp",
        url:"http://getsimpleform.com/messages/ajax?form_api_token=73c1d46b39e675e7fca674e839f9513d",
        data: formData
      }).done(function() {
        $("#contact").addClass("success");
        $(".contact-confirm").text("Thank you for contacting us.");
        $(".contact-name,.contact-phone,.contact-email,.contact-message").val(undefined);
      }).error(function() {
        $("#contact").addClass("error");
        $(".contact-confirm").text("There was an error sending your message.");
        $("button").prop("disabled",false);
      });
    });
  })();
});