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
      text: 'Thank you for downloading my resume',
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
      800
    );
  });

  // Keep current accordion  on page refresh
  // var selectedCollapse = sessionStorage.getItem('selectedCollapse');
  // if (selectedCollapse != null) {
  //   // $('.accordion .collapsed').removeClass('show');
  //   $(selectedCollapse).addClass('show');
  // }
  // //To set, which one will be opened
  // $('.accordion .port-item').on('click', function() {
  //   var target = $(this).data('target');
  //   //Save data to sessionStorage
  //   sessionStorage.setItem('selectedCollapse', target);
  // });
});

// particlesJS.load('particles-js', 'particles.json');

console.log(
  '%cBelieve me, there is nothing important here for you 😜!!!',
  'color: #dc3545; font-family: sans-serif; font-size: 3em; font-weight: bolder; text-shadow: #232323 1px 1px 1px;'
);
