$(document).ready(function () {
  // Collapsing Sections
  $('.port-item').on('click', function (e) {
    e.preventDefault();
    $('.collapse').collapse('hide');
  });

  // Toggling Tabs Smooth Scroll
  $('.toggling-tab').on('click', function () {
    let targetOffset = $(this).offset().top + ($('.banner').height() - 400);
    $('html, body').animate({ scrollTop: targetOffset }, 'slow');
  });

  // FancyBox
  $('[data-fancybox]').fancybox({
    protect: true,
    loop: false
  });

  // Preserve the last accordion tab on refresh
  $('.sections').on('show.bs.collapse', function (e) {
    sessionStorage.setItem('activeTab', "#" + e.target.id);
  });

  let activeTab = sessionStorage.getItem('activeTab');

  if (activeTab) {
    $(activeTab).collapse('show');
  } else {
    $('#home').collapse('show');
  }

  // Add .active to current accordion tab

  $('.sections').on('shown.bs.collapse', function (e) {
    let currentTab = e.target.id;
    $('div[data-target="' + '#' + currentTab + '"]').parent().addClass('active');
  });

  $('.sections').on('hidden.bs.collapse', function (e) {
    let prevTab = e.target.id;
    $('div[data-target="' + '#' + prevTab + '"]').parent().removeClass('active');
  });

  // Sweetalert2
  $('#downloadBtn').on('click', function () {
    Swal.fire({
      position: 'center',
      type: 'success',
      backdrop: 'swal2-backdrop-show',
      title: 'Thank you',
      text: 'for downloading my resume',
      icon: 'success',
      showConfirmButton: true,
      confirmButtonText: 'Dismiss',
      showCloseButton: false
    });
  });

  // Back to top
  $('#back_to_top').on('click', function (e) {
    e.preventDefault();
    let pageTop = $('#top');
    $('html, body').animate(
      {
        scrollTop: pageTop.offset().top
      },
      550
    );
  });
});

console.log(
  '%cBelieve me, there is nothing important here for you 😜!!!',
  'color: #dc3545; font-family: sans-serif; font-size: 3em; font-weight: bolder; text-shadow: #232323 1px 1px 1px;'
);
