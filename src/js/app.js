$(document).ready(function() {
  // Collapsing Sections
  $('.port-item').on('click', function(e) {
    e.preventDefault();
    $('.collapse').collapse('hide');
  });

  // FancyBox
  $('[data-fancybox]').fancybox({
    protect: true,
    loop: true
  });

  // Toggling Tabs Smooth Scroll
  $('.toggling-tabs').on('click', function() {
    var targetOffset = $(this).offset().top + $('.toggling-tabs').height();
    $('html, body').animate({ scrollTop: targetOffset }, 'slow');
  });

  $('#downloadBtn').on('click', function() {
    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'My Resume',
      text: 'Thank you for downloading my resume 😄',
      showConfirmButton: false,
      showCloseButton: true
    });
  });

  $('#back_to_top').on('click', function(e) {
    e.preventDefault();
    var target = $('#top');
    $('html, body').animate(
      {
        scrollTop: target.offset().top
      },
      1000
    );
  });
});

console.log(
  '%cBelieve me, there is nothing important here for you 😜!',
  'color: #a52122; font-family: sans-serif; font-size: 3em; font-weight: bolder; text-shadow: #222 1px 1px 1px;'
);

// var name = $("#name").val();
// var email = $("#email").val();
// var message = $("#message").val();

// Submit form using AJAX
// $(function () {
//     $('.contact-form').on('submit', (e) => {
//         e.preventDefault();
//         $.ajax({
//             type: 'POST',
//             url: 'mailto:osaid2512@gmail.com',
//             data: $('.contact-form').serialize(),
//             success: () => {
//                 swal('Your message has been sent successfully. Thank you for contacting me :).');
//             }
//         });
//     });
// });
