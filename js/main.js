if(Modernizr.cssvhunit) {
  $(".big").height($(window).outerHeight());
  $("main").css("marginTop",$(window).outerHeight());
}

// Fires whenever a player has finished loading
function onPlayerReady(event) { event.target.playVideo(); }

// Fires when the player's state changes.
function onPlayerStateChange(event) {
    // Go to the next video after the current one is finished playing
    if (event.data === 0) {
      $.fancybox.next();
    }
  }

// The API will call this function when the page has finished downloading the JavaScript for the player API
function onYouTubePlayerAPIReady() {

  // Initialise the fancyBox after the DOM is loaded
  $(".fancybox")
  .attr('rel', 'gallery')
  .fancybox({
    openEffect  : 'none',
    closeEffect : 'none',
    nextEffect  : 'none',
    prevEffect  : 'none',
    padding     : 0,
    margin      : 50,
    helpers     : {
      overlay: {
        locked: false
      }
    },
    beforeShow  : function() {
      // Find the iframe ID
      var id = $.fancybox.inner.find('iframe').attr('id');
      
      // Create video player object and add event listeners
      var player = new YT.Player(id, {
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    }
  });
}

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
        url:"http://getsimpleform.com/messages/ajax?form_api_token=d9661666346512e9947ea6fca1bcddf8",
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