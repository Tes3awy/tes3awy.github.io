$('.port-item').click(function (e) {
    e.preventDefault();
    $('.collapse').collapse('hide');
});
$(document).on('click', '[data-toggle="lightbox"]', function (e) {
    e.preventDefault();
    $(this).ekkoLightbox();
});