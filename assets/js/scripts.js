"use strict";

function closeMenu() {
    $(".header__mobile").removeClass("header__active"), $(".header__menu").show(), $(".header__menu-close").hide();
}

function showMenu() {
    $(".header__mobile").addClass("header__active"), $(".header__menu").hide(), $(".header__menu-close").show();
}

$(document).ready(function() {
    $('a[href="#"]').click(function(e) {
        e.preventDefault();
    });
    var e = 0, t = 0;
    $(window).scroll(function() {
        e = $(this).scrollTop();
    }), setTimeout(function() {
        $(document).mousemove(function(a) {
            a.pageY - e <= 5 && 1 != t && ($(".modal-call").addClass("active"), 0 === $(".modal-bg").length && $(".modal-call").after('<div class="modal-bg"></div>'), 
            t = 1);
        });
    }, 15e3), setTimeout(function() {
        1 != t && ($(".modal-call").addClass("active"), 0 === $(".modal-bg").length && $(".modal-call").after('<div class="modal-bg"></div>'), 
        t = 1);
    }, 12e4), $(".js-form").on("click", function() {
        $(this).hasClass("js-form-help") ? ($(".modal h3").html("Still have questions?"), 
        $(".modal p").html("Our manager can call you and answer any of them!"), $("html").addClass("overflow")) : ($(".modal h3").html("Leave a request"), 
        $(".modal p").html("You can leave a request and our manager will contact you as soon as possible"), 
        $("html").addClass("overflow")), $(".modal").before('<div class="modal-bg"></div>'), 
        $(".modal").fadeIn(), $("html").addClass("overflow");
    }), $(".mini .mini__item").click(function() {
        var e = $(this).data("id");
        $(".gallery__item").removeClass("active"), $(".mini__item").removeClass("active"), 
        $(this).addClass("active"), $('.gallery__item[data-id="' + e + '"]').addClass("active");
    }), $(".gallery-left").click(function() {
        var e = $(".mini li").length, t = $(".mini__item.active").data("id") - 1;
        t < 1 && (t = e), $(".gallery__item").removeClass("active"), $(".mini__item").removeClass("active"), 
        $('.gallery__item[data-id="' + t + '"]').addClass("active"), $('.mini__item[data-id="' + t + '"]').addClass("active");
    }), $(".gallery-right").click(function() {
        var e = $(".mini li").length, t = $(".mini__item.active").data("id") + 1;
        t > e && (t = 1), $(".gallery__item").removeClass("active"), $(".mini__item").removeClass("active"), 
        $('.gallery__item[data-id="' + t + '"]').addClass("active"), $('.mini__item[data-id="' + t + '"]').addClass("active");
    }), $(".mini__item img").hover(function() {
        if ($(this).parent().hasClass("active")) ; else {
            var e = $(".mini__item.active img");
            e.css({
                transform: "none",
                outline: "none"
            }), $(this).click(function() {
                e.attr("style", "none");
            });
        }
    }, function() {
        $(".mini__item.active img").attr("style", "none");
    }), $(".video-btn").click(function() {
        $(this).before('<iframe src="https://www.youtube-nocookie.com/embed/MxSxCwk9Iio?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>'), 
        $(this).remove();
    }), $(".header__menu").click(function() {
        $(this).find("ul").toggleClass("active");
    }), ga(function(e) {
        var t = e.get("clientId");
        $.ajax({
            url: "http://tesla.flexcrm.ru/admin/api/tracker?lang=en&id=" + t,
            dataType: "jsonp",
            success: function(e) {
                $("body").append(e.result);
            }
        }), $(document).on("submit", ".modal form", function(e) {
            if (e.preventDefault(), $(this).validate(), $(this).find("button").attr("disabled", !0).text("Sending.."), 
            $(this).valid()) {
                var a = $(this).serialize();
                $.ajax({
                    url: "send.php",
                    data: a + "&gid=" + t,
                    type: "POST",
                    success: function(e) {
                        $(this).find("button").attr("disabled", !1).text("Send"), $(".modal").html(e), yaCounter42137194.reachGoal("ORDER");
                    },
                    error: function() {
                        $(this).find("button").attr("disabled", !1).text("Send");
                    }
                });
            } else $(this).find("button").attr("disabled", !1).text("Send");
        }), $(document).on("submit", ".modal-call form", function(e) {
            if ($(this).validate(), e.preventDefault(), $(this).find("button").attr("disabled", !0).text("Sending.."), 
            $(this).valid()) {
                var a = $(this).serialize();
                $.ajax({
                    url: "send.php",
                    data: a + "&gid=" + t,
                    type: "POST",
                    success: function(e) {
                        $(this).find("button").attr("disabled", !1).text("Send"), $(".modal-call").html(e), 
                        yaCounter42137194.reachGoal("ORDER"), $("html").removeClass("overflow");
                    },
                    error: function() {
                        $(this).find("button").attr("disabled", !1).text("Send");
                    }
                });
            } else $(this).find("button").attr("disabled", !1).text("Send");
        }), $(document).on("submit", ".oracle form", function(e) {
            if (e.preventDefault(), $(this).validate(), $(this).find("button").attr("disabled", !0).text("Sending.."), 
            $(this).valid()) {
                var a = $(this).serialize();
                $.ajax({
                    url: "send.php",
                    data: a + "&gid=" + t,
                    type: "POST",
                    success: function(e) {
                        $(this).find("button").attr("disabled", !1).text("Send"), $(".form__result").html(e), 
                        yaCounter42137194.reachGoal("ORDER"), $("html").removeClass("overflow");
                    },
                    error: function() {
                        $(this).find("button").attr("disabled", !1).text("Send");
                    }
                });
            } else $(this).find("button").attr("disabled", !1).text("Send");
        });
    });
}), $(document).on("click", ".modal .btn-close,.modal-call .btn-close, .modal-bg", function() {
    $(".modal-bg").remove(), $(this).parent().hasClass("modal") && $(this).parent().fadeOut(), 
    $(".modal-call").removeClass("active"), $(".modal").fadeOut(), $(".modal").html($(".default").html()), 
    $("html").removeClass("overflow");
}), $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(e) {
    if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
        var t = $(this.hash);
        (t = t.length ? t : $("[name=" + this.hash.slice(1) + "]")).length && (e.preventDefault(), 
        $("html, body").animate({
            scrollTop: t.offset().top - 50
        }, 1e3, function() {
            var e = $(t);
            if (e.focus(), e.is(":focus")) return !1;
            e.attr("tabindex", "-1"), e.focus();
        }));
    }
}), $(document).on("click", ".more-comp", function() {
    var e = $(this).parent();
    $(this).remove();
    var t = e.data("id");
    console.log(t);
    var a = $(".comp.wrapper").not(".comp--mobile").clone().addClass("comp--mobile").css("display", "table");
    $("thead", a).remove(), $("tr", a).each(function(e, a) {
        $("td", a).each(function(e, a) {
            0 != e && e != t && $(a).remove();
        });
    });
    var i = e.find("h4").text();
    e.after(a), e.after('<h4 class="comp__heading--phone">DETAILED CONFIGURATION:<br/> ' + i + "</h4>");
}), $(".header__menu").on("click", function() {
    showMenu();
}), $(".header__mobile a").on("click", function() {
    closeMenu();
}), $(document).mouseup(function(e) {
    var t = $(".header__mobile");
    t.is(e.target) || 0 !== t.has(e.target).length || closeMenu();
});
//# sourceMappingURL=scripts.js.map