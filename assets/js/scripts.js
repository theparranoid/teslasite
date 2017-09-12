"use strict";

$(document).ready(function() {
    $('a[href="#"]').click(function(t) {
        t.preventDefault();
    });
    var t = 0, e = 0;
    $(window).scroll(function() {
        t = $(this).scrollTop();
    }), setTimeout(function() {
        $(document).mousemove(function(a) {
            a.pageY - t <= 5 && 1 != e && ($(".modal-call").addClass("active"), 0 === $(".modal-bg").length && $(".modal-call").after('<div class="modal-bg"></div>'), 
            e = 1);
        });
    }, 15e3), setTimeout(function() {
        1 != e && ($(".modal-call").addClass("active"), 0 === $(".modal-bg").length && $(".modal-call").after('<div class="modal-bg"></div>'), 
        e = 1);
    }, 12e4), $(".js-form").on("click", function() {
        $(this).hasClass("js-form-help") ? ($(".modal h3").html("Still have questions?"), 
        $(".modal p").html("Our manager can call you and answer any of them!"), $("html").addClass("overflow")) : ($(".modal h3").html("Leave a request"), 
        $(".modal p").html("You can leave a request and our manager will contact you as soon as possible"), 
        $("html").addClass("overflow")), $(".modal").before('<div class="modal-bg"></div>'), 
        $(".modal").fadeIn(), $("html").addClass("overflow");
    }), $(".mini .mini__item").click(function() {
        var t = $(this).data("id");
        $(".gallery__item").removeClass("active"), $(".mini__item").removeClass("active"), 
        $(this).addClass("active"), $('.gallery__item[data-id="' + t + '"]').addClass("active");
    }), $(".gallery-left").click(function() {
        var t = $(".mini li").length, e = $(".mini__item.active").data("id") - 1;
        e < 1 && (e = t), $(".gallery__item").removeClass("active"), $(".mini__item").removeClass("active"), 
        $('.gallery__item[data-id="' + e + '"]').addClass("active"), $('.mini__item[data-id="' + e + '"]').addClass("active");
    }), $(".gallery-right").click(function() {
        var t = $(".mini li").length, e = $(".mini__item.active").data("id") + 1;
        e > t && (e = 1), $(".gallery__item").removeClass("active"), $(".mini__item").removeClass("active"), 
        $('.gallery__item[data-id="' + e + '"]').addClass("active"), $('.mini__item[data-id="' + e + '"]').addClass("active");
    }), $(".mini__item img").hover(function() {
        if ($(this).parent().hasClass("active")) ; else {
            var t = $(".mini__item.active img");
            t.css({
                transform: "none",
                outline: "none"
            }), $(this).click(function() {
                t.attr("style", "none");
            });
        }
    }, function() {
        $(".mini__item.active img").attr("style", "none");
    }), $(".video-btn").click(function() {
        $(this).before('<iframe src="https://www.youtube-nocookie.com/embed/MxSxCwk9Iio?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>'), 
        $(this).remove();
    }), $(".header__menu").click(function() {
        $(this).find("ul").toggleClass("active");
    }), ga(function(t) {
        var e = t.get("clientId");
        $.ajax({
            url: "http://tesla.flexcrm.ru/admin/api/tracker?lang=en&id=" + e,
            dataType: "jsonp",
            success: function(t) {
                $("body").append(t.result);
            }
        }), $(document).on("submit", ".modal form", function(t) {
            if (t.preventDefault(), $(this).validate(), $(this).find("button").attr("disabled", !0).text("Sending.."), 
            $(this).valid()) {
                var a = $(this).serialize();
                $.ajax({
                    url: "send.php",
                    data: a + "&gid=" + e,
                    type: "POST",
                    success: function(t) {
                        $(this).find("button").attr("disabled", !1).text("Send"), $(".modal").html(t), yaCounter42137194.reachGoal("ORDER");
                    },
                    error: function() {
                        $(this).find("button").attr("disabled", !1).text("Send");
                    }
                });
            } else $(this).find("button").attr("disabled", !1).text("Send");
        }), $(document).on("submit", ".modal-call form", function(t) {
            if ($(this).validate(), t.preventDefault(), $(this).find("button").attr("disabled", !0).text("Sending.."), 
            $(this).valid()) {
                var a = $(this).serialize();
                $.ajax({
                    url: "send.php",
                    data: a + "&gid=" + e,
                    type: "POST",
                    success: function(t) {
                        $(this).find("button").attr("disabled", !1).text("Send"), $(".modal-call").html(t), 
                        yaCounter42137194.reachGoal("ORDER"), $("html").removeClass("overflow");
                    },
                    error: function() {
                        $(this).find("button").attr("disabled", !1).text("Send");
                    }
                });
            } else $(this).find("button").attr("disabled", !1).text("Send");
        }), $(document).on("submit", ".oracle form", function(t) {
            if (t.preventDefault(), $(this).validate(), $(this).find("button").attr("disabled", !0).text("Sending.."), 
            $(this).valid()) {
                var a = $(this).serialize();
                $.ajax({
                    url: "send.php",
                    data: a + "&gid=" + e,
                    type: "POST",
                    success: function(t) {
                        $(this).find("button").attr("disabled", !1).text("Send"), $(".form__result").html(t), 
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
}), $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(t) {
    if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
        var e = $(this.hash);
        (e = e.length ? e : $("[name=" + this.hash.slice(1) + "]")).length && (t.preventDefault(), 
        $("html, body").animate({
            scrollTop: e.offset().top - 50
        }, 1e3, function() {
            var t = $(e);
            if (t.focus(), t.is(":focus")) return !1;
            t.attr("tabindex", "-1"), t.focus();
        }));
    }
}), $(document).on("click", ".more-comp", function() {
    var t = $(this).parent();
    $(this).remove();
    var e = t.data("id");
    console.log(e);
    var a = $(".comp.wrapper").not(".comp--mobile").clone().addClass("comp--mobile").css("display", "table");
    $("thead", a).remove(), $("tr", a).each(function(t, a) {
        $("td", a).each(function(t, a) {
            0 != t && t != e && $(a).remove();
        });
    });
    var i = t.find("h4").text();
    t.after(a), t.after('<h4 class="comp__heading--phone">DETAILED CONFIGURATION:<br/> ' + i + "</h4>");
}), $(".menu-icon").on("click", function() {
    $(".header").addClass("header__active"), $(".menu-icon").hide();
}), $(document).mouseup(function(t) {
    var e = $(".header");
    e.is(t.target) || 0 !== e.has(t.target).length || e.removeClass("header__active"), 
    $(".menu-icon").show();
});
//# sourceMappingURL=scripts.js.map