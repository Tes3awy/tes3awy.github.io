$('.port-item').click(function (e) {
    e.preventDefault();
    $('.collapse').collapse('hide');
});

$('[data-fancybox]').fancybox({
    protect: true,
    loop: true
});