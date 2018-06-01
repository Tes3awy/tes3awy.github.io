$(document).ready(function() {
    var myLazyLoad = new LazyLoad();

    // Toggling colored class
    $(".my-skills").hover(function() {
        $(this)
            .find("i.devicons")
            .toggleClass("colored");
        $(this)
            .find("i.devicons")
            .css("color", "none");
    });

    // Collapsing Sections
    $(".port-item").on("click", function(e) {
        e.preventDefault();
        $(".collapse").collapse("hide");
    });

    // FancyBox
    $("[data-fancybox]").fancybox({
        protect: true,
        loop: true,
    });

    // Toggling Tabs Smooth Scroll
    $(".toggling-tabs").on("click", function(event) {
        var targetOffset = $(this).offset().top;
        $("html, body").animate({ scrollTop: targetOffset }, "slow");
    });

    $('[data-toggle="tooltip"]').tooltip();
});

// var name = $("#name").val();
// var email = $("#email").val();
// var message = $("#message").val();

// Submit form using AJAX
// $(function () {
//     $('.contact-form').on('submit', function (e) {
//         e.preventDefault();
//         $.ajax({
//             type: 'POST',
//             url: 'mailto:osaid2512@gmail.com',
//             data: $('.contact-form').serialize(),
//             success: function () {
//                 alert('Your message has been sent successfully. Thank you for contacting me.');
//             }
//         });
//     });
// });
