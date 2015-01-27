$(document).ready(function() {
  $(".big").height($(window).outerHeight());
  $("video")[0].play();
});

$(document).ready(function() {
  "use strict";

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
});