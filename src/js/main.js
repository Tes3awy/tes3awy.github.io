$('.port-item').click(function (e) {
    e.preventDefault();
    $('.collapse').collapse('hide');
});

$('[data-fancybox]').fancybox({
    protect: true,
    loop: true
});

$('.toggling-tabs').on('click', function (event) {
    var targetOffset = $(this).offset().top;
    $('html, body').animate({scrollTop: targetOffset}, 'slow');
});