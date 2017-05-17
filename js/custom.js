(function($) {
    $('.carousel').owlCarousel({
        items: 3,
        loop: true,
        autoplay: false,
        autoplayHoverPause: true,
        autoplaySpeed: 1700,
        dotsSpeed: 1500,
        dots: true,
        dotsEach: true,
        nav: true,
        navText: true,
        responsive: {
            0: {
                items: 1,
                nav: false,
                navText: false //["prev", "next"]
            },
            320: {
                items: 2,
                margin: 5,
                nav: false,
                navText: false //["prev", "next"]
            },

            360: {
                items: 2,
                margin: 5,
                nav: false,
                navText: false //["prev", "next"]
            },

            460: {
                items: 3,
                margin: 0,
                nav: false,
                navText: false //["prev", "next"]
            },

            624: {
                items: 4,
                margin: 0,
                nav: false,
                navText: false //["prev", "next"]
            },

            768: {
                items: 4,
                margin: 0,
                nav: false,
                navText: false //["prev", "next"]
            },

            992: {
                items: 6,
                margin: 0,
                nav: false,
                navText: false,
                dots: false,
                autoplay: false,
                loop: false,
                mouseDrag: false
            },

            1024: {
                items: 6,
                margin: 0,
                nav: false,
                navText: false,
                dots: false,
                autoplay: false,
                loop: false,
                mouseDrag: false
            },

            1200: {
                items: 6,
                margin: 10,
                dots: false,
                autoplay: false,
                loop: false,
                mouseDrag: false,
                nav: false,
                navText: false
            }
        }
    });

    //Bootstrap tootips
    $('[data-toggle="popover"]').popover();

})(jQuery);
