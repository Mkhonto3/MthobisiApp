var btn = document.getElementById('fltBtn');
var act = document.getElementsByClassName('action');
$(document).ready(function() {

    $('.fab-overlay, .hamburger').click(function() {
        closeFab();
        $(".collapse-card").css("z-index", 0);
    });

    $('.header .btn-cover, .st-container').click(function() {
        setTimeout(function() {
            $(".collapse-card.active").css("z-index", 200);
        }, 250);
    });

    $('.floating-container.desktop-float .floating-btn,.floating-container.mobile-float .floating-btn').click(function() {
        if (!$('p', this).hasClass('textpand')) {
            $('p', this).addClass('textpand');
            $(this).addClass('boxspand');
            setTimeout(
                function() {
                    $('.action:nth-child(1)').addClass('actionive');
                }, 1);
            setTimeout(
                function() {
                    $('.action:nth-child(2)').addClass('actionive');
                }, 70);
            setTimeout(
                function() {
                    $('.action:nth-child(3)').addClass('actionive');
                }, 140);
            setTimeout(function() {
                $('.action:nth-child(4)').addClass('actionive');
            }, 210);

            $(".fab-overlay").removeClass("hide");
            $(".fab-overlay").addClass("animateFabOverlayIn");
            $(".fab-overlay").removeClass("animateFabOverlayOut");
            setTimeout(function() {
                $(".amimateLabel").removeClass("animateRight");
                $(".amimateLabelOne").css("width", "150px");
                $(".amimateLabelOne").addClass("animateLeft");
            }, 300);
            setTimeout(function() {
                $(".amimateLabel").removeClass("animateRight");
                $(".amimateLabelTwo").css("width", "150px");
                $(".amimateLabelTwo").addClass("animateLeft");
            }, 400);
            setTimeout(function() {
                $(".amimateLabel").removeClass("animateRight");
                $(".amimateLabelThree").css("width", "150px");
                $(".amimateLabelThree").addClass("animateLeft");

                $(".amimateLabelThreeAt").css("width", "200px");
                $(".amimateLabelThreeAt").addClass("animateLeft");
            }, 500);

            setTimeout(function() {
                $(".amimateLabelOne").css("color", "rgba(255,255,255,1)");
            }, 400);
            setTimeout(function() {
                $(".amimateLabelTwo").css("color", "rgba(255,255,255,1)");
            }, 500);
            setTimeout(function() {
                $(".amimateLabelThree").css("color", "rgba(255,255,255,1)");
                $(".amimateLabelThreeAt").css("color", "rgba(255,255,255,1)");
            }, 600);

        } else {
            closeFab();
        }
    });
});

function closeFab() {
    setTimeout(function() {
        $(".amimateLabel").removeClass("animateLeft");
        $(".amimateLabelOne").css("width", "0px");
        $(".amimateLabelOne").addClass("animateRight");
    }, 300);
    setTimeout(function() {
        $(".amimateLabel").removeClass("animateLeft");
        $(".amimateLabelTwo").css("width", "0px");
        $(".amimateLabelTwo").addClass("animateRight");
    }, 200);
    setTimeout(function() {
        $(".amimateLabel").removeClass("animateLeft");
        $(".amimateLabelThree").css("width", "0px");
        $(".amimateLabelThree").addClass("animateRight");

        $(".amimateLabelThreeAt").css("width", "0px");
        $(".amimateLabelThreeAt").addClass("animateRight");
    }, 100);

    setTimeout(function() {
        $(".amimateLabelOne").css("color", "rgba(255,255,255,0)");
    }, 350);
    setTimeout(function() {
        $(".amimateLabelTwo").css("color", "rgba(255,255,255,0)");
    }, 250);
    setTimeout(function() {
        $(".amimateLabelThree").css("color", "rgba(255,255,255,0)");
        $(".amimateLabelThreeAt").css("color", "rgba(255,255,255,0)");
    }, 150);

    setTimeout(function() {
        /*$('p',this).removeClass('textpand');
        $(this).removeClass('boxspand');*/
        $('p , .floating-container.desktop-float .floating-btn,.floating-container.mobile-float .floating-btn').removeClass('textpand');
        $('p , .floating-container.desktop-float .floating-btn,.floating-container.mobile-float .floating-btn').removeClass('boxspand');
        $('.action:nth-child(1)').removeClass('actionive');
        $('.action:nth-child(2)').removeClass('actionive');
        $('.action:nth-child(3)').removeClass('actionive');
        $('.action:nth-child(4)').removeClass('actionive');

        $(".fab-overlay").addClass("animateFabOverlayOut");
        $(".fab-overlay").removeClass("animateFabOverlayIn");
    }, 500);

    setTimeout(function() {
        $(".fab-overlay").addClass("hide");
    }, 700);
};

$(".menu-icon-top-hover").hide();
$(".menu-icon-center-hover").hide();
$(".menu-icon-bottom-hover").hide();
$(".top-icon").hover(function() {
    $(".menu-icon-not").hide();
    $(".menu-icon-top-hover").show();
    $(".menu-icon-back-not").css("background-color", "#ffffff");
}, function() {
    $(".menu-icon-not").show();
    $(".menu-icon-top-hover").hide();
    $(".menu-icon-back-not").css("background-color", "#f39200");
});

$(".center-icon").hover(function() {
    $(".menu-icon-fav").hide();
    $(".menu-icon-center-hover").show();
    $(".menu-icon-back-fav").css("background-color", "#ffffff");
}, function() {
    $(".menu-icon-fav").show();
    $(".menu-icon-center-hover").hide();
    $(".menu-icon-back-fav").css("background-color", "#f39200");
});

$(".grayed-out.center-icon").hover(function() {
    $(".menu-icon-center-hover").hide();
    $(".menu-icon-fav").show();
});
$(".grayed-out.top-icon").hover(function() {
    $(".menu-icon-top-hover").hide();
    $(".menu-icon-not").show();
});
$("grayed-out.bottom-icon").hover(function() {
    $(".menu-icon-bottom-hover").hide();
    $(".menu-icon-per").show();
});


$(".bottom-icon").hover(function() {
    $(".menu-icon-per").hide();
    $(".menu-icon-bottom-hover").show();
    $(".menu-icon-back-per").css("background-color", "#ffffff");
}, function() {
    $(".menu-icon-per").show();
    $(".menu-icon-bottom-hover").hide();
    $(".menu-icon-back-per").css("background-color", "#f39200");
});



//AT-fab
$(".menu-icon-top-at-hover").hide();
$(".menu-icon-center-at-hover").hide();
$(".menu-icon-bottom-at-hover").hide();
$(".top-icon-at").hover(function() {
    $(".menu-icon-back-not-at").css("background-color", "#ED1C24");
}, function() {
    $(".menu-icon-back-not-at").css("background-color", "#029EE3");
});

$(".center-icon-at").hover(function() {
    $(".menu-icon-back-fav-at").css("background-color", "#ED1C24");
}, function() {
    $(".menu-icon-back-fav-at").css("background-color", "#029EE3");
});

$(".bottom-icon-at").hover(function() {
    $(".menu-icon-back-per-at").css("background-color", "#ED1C24");
}, function() {
    $(".menu-icon-back-per-at").css("background-color", "#029EE3");
});
