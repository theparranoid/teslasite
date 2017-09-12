$(document).ready(function() {

  $('a[href="#"]').click(function(event){
    event.preventDefault();
  });
  var scroll = 0;
  var displayed = 0;
  $(window).scroll(function () {
    scroll = $(this).scrollTop();
  });


  setTimeout(function(){
    $(document).mousemove(function(e) {
      if(e.pageY - scroll <= 5 && displayed != 1) {
        $('.modal-call').addClass('active');
        if ($('.modal-bg').length === 0) {
          $('.modal-call').after('<div class="modal-bg"></div>');
        }
        displayed = 1;
      }
    });
  },15000);

  
  setTimeout(function(){
    if (displayed != 1) {
      $('.modal-call').addClass('active');
      if ($('.modal-bg').length === 0) {
        $('.modal-call').after('<div class="modal-bg"></div>');
      }
      displayed = 1;
    }
  },120000);
  //
  // $(window).on("scroll", function() {
  //   if ($(window).scrollTop() > 50) {
  //     $('.header').addClass('header--sticky');
  //   } else {
  //     $('.header').removeClass('header--sticky');
  //   }
  // });

  $('.js-form').on('click',function(){
    if ($(this).hasClass('js-form-help')) {
      $('.modal h3').html('Still have questions?');
      $('.modal p').html('Our manager can call you and answer any of them!');
      $('html').addClass('overflow');
    } else {
      $('.modal h3').html('Leave a request');
      $('.modal p').html('You can leave a request and our manager will contact you as soon as possible');
      $('html').addClass('overflow');
    }
    $('.modal').before('<div class="modal-bg"></div>');
    $('.modal').fadeIn();
    $('html').addClass('overflow');
  });

  $('.mini .mini__item').click(function(){
    var id = $(this).data('id');
    $('.gallery__item').removeClass('active');
    $('.mini__item').removeClass('active');
    $(this).addClass('active');
    $('.gallery__item[data-id="'+id+'"]').addClass('active');
  });

  $('.gallery-left').click(function(){
    var count = $('.mini li').length;
    var now = $('.mini__item.active').data('id');
    var next = now - 1;
    if (next < 1)
      next = count;
    $('.gallery__item').removeClass('active');
    $('.mini__item').removeClass('active');
    $('.gallery__item[data-id="'+next+'"]').addClass('active');
    $('.mini__item[data-id="'+next+'"]').addClass('active');
  });

  $('.gallery-right').click(function(){
    var count = $('.mini li').length;
    var now = $('.mini__item.active').data('id');
    var next = now + 1;
    if (next > count)
      next = 1;
    $('.gallery__item').removeClass('active');
    $('.mini__item').removeClass('active');
    $('.gallery__item[data-id="'+next+'"]').addClass('active');
    $('.mini__item[data-id="'+next+'"]').addClass('active');
  });

  $('.mini__item img').hover(function(){
      if ($(this).parent().hasClass('active')) {
      } else {
        var $active = $('.mini__item.active img');
        $active.css({'transform':'none','outline':'none'});
        $(this).click(function(){
          $active.attr('style','none');
        });
      }
  },function(){
      $('.mini__item.active img').attr('style','none');
  });

  $('.video-btn').click(function(){
    $(this).before('<iframe src="https://www.youtube-nocookie.com/embed/MxSxCwk9Iio?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>');
    $(this).remove();
  });

  $('.header__menu').click(function(){
    $(this).find('ul').toggleClass('active');
  });

  ga(function(tracker) {
    var clientId = tracker.get('clientId');
    $.ajax({
      url: "http://tesla.flexcrm.ru/admin/api/tracker?lang=en&id="+clientId,
      dataType: 'jsonp',
      success: function(result){
        $('body').append(result.result);
      }
    });

    $(document).on('submit','.modal form',function(event){
      event.preventDefault();
      $(this).validate();
      $(this).find('button').attr('disabled',true).text('Sending..');
      if ($(this).valid()) {
        var form = $(this).serialize();
        $.ajax({
          'url':'send.php',
          'data':form + '&gid=' + clientId,
          'type':'POST',
          success: function(result) {
              $(this).find('button').attr('disabled',false).text('Send');
              $('.modal').html(result);
              yaCounter42137194.reachGoal('ORDER');
          },
          error: function() {
            $(this).find('button').attr('disabled',false).text('Send');
          }
        });
      } else {
        $(this).find('button').attr('disabled',false).text('Send');
      }
    });

    $(document).on('submit','.modal-call form',function(event){
      $(this).validate();
      event.preventDefault();
      $(this).find('button').attr('disabled',true).text('Sending..');
      if ($(this).valid()) {
        var form = $(this).serialize();
        $.ajax({
          'url':'send.php',
          'data':form + '&gid=' + clientId,
          'type':'POST',
          success:function(result){
              $(this).find('button').attr('disabled',false).text('Send');
              $('.modal-call').html(result);
              yaCounter42137194.reachGoal('ORDER');
              $('html').removeClass('overflow');
          },
          error: function(){
            $(this).find('button').attr('disabled',false).text('Send');
          }
        });
      } else {
        $(this).find('button').attr('disabled',false).text('Send');
      }
    });

    $(document).on('submit','.oracle form',function(event){
      event.preventDefault();
      $(this).validate();
      $(this).find('button').attr('disabled',true).text('Sending..');
      if ($(this).valid()) {
        var form = $(this).serialize();
        $.ajax({
          'url':'send.php',
          'data': form + '&gid=' + clientId,
          'type':'POST',
          success:function(result){
              $(this).find('button').attr('disabled',false).text('Send');
              $('.form__result').html(result);
              yaCounter42137194.reachGoal('ORDER');
              $('html').removeClass('overflow');
          },
          error: function(){
            $(this).find('button').attr('disabled',false).text('Send');
          }
        });
      } else {
        $(this).find('button').attr('disabled',false).text('Send');
      }
    });

  });

});

$(document).on('click','.modal .btn-close,.modal-call .btn-close, .modal-bg',function(){
  $('.modal-bg').remove();
  if ($(this).parent().hasClass('modal')) {
    $(this).parent().fadeOut();
  }
  $('.modal-call').removeClass('active');
  $('.modal').fadeOut();
  $('.modal').html($('.default').html());
  $('html').removeClass('overflow');
});

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 50
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
});

$(document).on('click','.more-comp',function(){
  var $plan = $(this).parent();
  $(this).remove();
  var ind = $plan.data('id');
  console.log(ind);
  var html = $('.comp.wrapper').not(".comp--mobile").clone().addClass('comp--mobile').css('display','table');
  $('thead',html).remove();

  $('tr',html).each(function(i,e){
    $('td',e).each(function(i,e){
      if (i != 0 && i != ind) {
        $(e).remove();
      }
    });
  });
  var plan = $plan.find('h4').text();
  $plan.after(html);
  $plan.after('<h4 class="comp__heading--phone">DETAILED CONFIGURATION:<br/> '+plan+'</h4>');

});


$('.menu-icon').on('click',function(){
    $('.header').addClass('header__active');
    $('.menu-icon').hide();
  });


    
$(document).mouseup(function (e){
	var div = $(".header");
	if (!div.is(e.target)
	    && div.has(e.target).length === 0) {
		div.removeClass('header__active');
	};
    
    $('.menu-icon').show();
});

// $(document).on('click','.help-icon, .help__title',function(){
//   $('.help').addClass('active');
// });
// $(document).on('click','.help__content li',function(){
//   $('.help').removeClass('active');
// });
