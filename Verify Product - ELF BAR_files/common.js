$(function(){
    //banner swiper
    $.fn.bannerRoll=function(obj,pagination, speed) {
        var speed = speed || 400;
        var mySwiper = new Swiper(obj, {
            loop: true,
            autoplay: 5000,
            speed: speed,
            pagination:pagination,
            paginationClickable: true
        });

        $(this).find('.arrow-left').on('click', function () {
            mySwiper.swipePrev();
        });
        $(this).find('.arrow-right').on('click', function () {
            mySwiper.swipeNext();
        });


        $(this).mouseenter(function () {
            mySwiper.stopAutoplay();
        });
        $(this).mouseleave(function () {
            mySwiper.startAutoplay();
        })
    }


    window.createUrl = function (uri) {
        return window.location.protocol+'//'+window.location.host+'/'+uri;
    };

    // 手机端回退
    $('.mobile-back').click(function () {
      window.history.back(-1);
    })
    if($(window).width() <= 420){
        $('.public-header .top-nav li').mouseup(function () {
            if(!$(this).hasClass('showlanguagebox')){
              $('.openheaderbar').show()
              $('.closeheaderbar').hide()
              setTimeout(function () {
                $('.public-header').css('overflow','hidden')
                $('.top-nav').removeClass('in');
              },300)
            }
        })
    }
    // 手机端导航响应
    $('.openheaderbar').click(function () {
        $('.public-header').css('overflow','visible')
        $('.closeheaderbar').show()
        $(this).hide()
        setTimeout(function () {
            $('.top-nav').addClass('transition in');
            // $('.top-nav').height($(window).height())
        },100)
        if ($(window).scrollTop() > 100) {
            $(".top-nav").css("top","56px")
        } else{
            $(".top-nav").css("top","104px")

        }
    })

    $('.closeheaderbar').click(function () {
        $('.top-nav').removeClass('in');
        $('.openheaderbar').show()
        $(this).hide()
        setTimeout(function () {
            $('.public-header').css('overflow','hidden')
        },300)
    })
    if(window.innerWidth > 1024) {
        $('.slide-li').hover(function(){
            $(this).find('.category-wrapper').stop().slideDown();
            $(this).find('a').addClass("active")
        }, function(){
            $(this).find('.category-wrapper').stop().slideUp();
            $(this).find('a').removeClass("active")
        });
    }
    if(window.innerWidth >= 1024) {
        $('.navbar .nav-item').on('mouseenter',function(){
            var index = $(this).data('index');
            $(this).find('a').addClass('active');
            $(this).siblings().find('a').removeClass('active');
            $(".dropdown-list[data-index="+index+"]").slideDown().siblings('.dropdown-list').hide();
            if(index == 1 || index == 4){
                $('.dropdown-mask').show();
            }else {
                $('.dropdown-mask').hide();
            }
        })
    }else {
        $('.navbar .nav-item-show').on('click',function(){
            var index = $(this).data('index');
            $('.dropdown-list').show();
            $(this).addClass('show').siblings().removeClass('show');
            $(".dropdown-list[data-index="+index+"]").addClass('nav-item-spread').siblings('.dropdown-list').removeClass('nav-item-spread');
        })
    }

    $('.navbar-wrapper').on('mouseleave',function(){
        $('.dropdown-list').slideUp();
        $('.navbar .nav-item a').removeClass('active');
        $('.dropdown-mask').hide();
        $('.navbar .nav-item').removeClass('show');
    });

    $('#J_swith_menu').on('click',function(){
        $('body').toggleClass('menu-open').toggleClass('overflow-hide');
        if(!$('body').hasClass('overflow-hide')){
            $('.dropdown-mask').hide();
            $('.dropdown-list').hide();
        }else{
            $('.dropdown-mask').show();
        }
        
    });


    function isIE() {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            return true;
        } else {
            return false;
        }
    }
    function isIE11() {
        if ((/Trident\/7\./).test(navigator.userAgent)) {
            return true;
        } else {
            return false;
        }
    }

    // calculate ScrollBar width
    function getScrollbarWidth() {
        var oP = document.createElement('p'),
            styles = {
                width: '100px',
                height: '100px',
                overflowY: 'scroll'
            }, i, scrollbarWidth;
        for (i in styles) oP.style[i] = styles[i];
        document.body.appendChild(oP);
        scrollbarWidth = oP.offsetWidth - oP.clientWidth;
        if (isIE() || isIE11()) {
            oP.parentNode.removeChild(oP);
        } else {
            oP.remove();
        }

        return scrollbarWidth;
    }

    var scrollWidth = getScrollbarWidth();

    // handle Navigation Bar Offset problem
    function avoidPageOffset(type) {
        if (scrollWidth != 0) {
            if ($('body').hasClass('overflow-hide')) {
                $('html').css('marginRight', scrollWidth)
                $(".navbar").css('paddingRight', scrollWidth);
                $(".nav-sec-pd").css('paddingRight', scrollWidth);


                if (type == 'navbar') {
                    $(".mainMenu").css('marginRight', scrollWidth);
                    $(".mainMenu-open .mainMenu").css('right', -scrollWidth)
                }
            } else {
                $('html').css('marginRight', '0')
                $(".navbar").css('paddingRight', '0');
                $(".nav-sec-pd").css('paddingRight', '0');

                if (type == 'navbar') {
                    $(".mainMenu").css('marginRight', 0);
                    $(".mainMenu").css('right', '-450px')
                }

            }
        }

    }

    // $(".security-code button").click(function(){
    //     let code = $.trim($(this).parents("form").find("input[name='code']").val());
    //     if (code.length === 0) {
    //         return false;
    //     }
    //     $.post('/home/security',{code:code},function(response){
    //         if(response.status){
    //             layui.use(['tips'], function() {
    //                 layui.tips.tips().success(response.message)
    //             });
    //         }else{
    //             layui.use(['tips'], function() {
    //                 layui.tips.tips().error(response.message)
    //             });
    //         }
    //
    //     }, 'json');
    //
    // });

    $(".footer .button-subscribe").click(function(){
        let email = $.trim($(this).parents(".footer").find("input[name='subscribe']").val());
        if (email.length === 0) {
            layui.use(['tips'], function(exports) {
                layui.tips.tips().error('This field is required.')
            });
            return false;
        }
        $.post('/home/subscribe',{email:email},function(response){
            if(response.success){
                layui.use(['tips'], function() {
                    layui.tips.tips().success(response.message)
                });
            }else{
                layui.use(['tips'], function() {
                    layui.tips.tips().error(response.message)
                });
            }
        }, 'json');
    });

    // 18 year confirm
    var confirmAge = '<div class="agelimit">\
          <div class="welcome-box frame-adaption">\
              <div class="welcome-icon clearfix">\
                  <div class="logo"></div>\
                  <p>Please Verify Your Age</p>\
              </div>\
              \
              <p>This website contains nicotine and only suitable for those who are 21 years or older. <br><b>Are you 21 or older?</b>\
              </p>\
              </p>\
              <div class="btn-box">\
              <button id="yearconFirm" class="btn">Yes, I am over 21</button>\
              <button id="notPass" class="btn-border" >No, I am under 21</button>\
              </div>\
          </div>\
      </div>'

    var acceptcookies = '<div class="agelimit-bottom frame-adaption">\
          <div class="center">\
          <p>We use cookies to provide you with the best possible experience. By continuing to use our site, you agree to our use of cookies.<br><a target="_blank" href="/home/privacy">Find out more</a> about the individual cookies we use and how to recognise them.</p>\
          <button id="setCookie" type="button" class="btn-border">Accept Cookies</button>\
          </div>\
      </div>'

    if ($.cookie('confirmAge')!= "yes") {
      $("body").append(confirmAge);
      $('#yearconFirm').click(function () {
        $('.agelimit').remove();
        $.cookie('confirmAge', 'yes', { path: '/', expires: 3650 });
      });
    }

    $('#notPass').click(function () {
        window.location.href = 'https://www.google.com/'
    });

    if ($.cookie('acceptcookies')!= "yes") {
        $("body").append(acceptcookies);
        setTimeout(function () {
        $('.agelimit-bottom').addClass("transition2 add ")
        },2000)
        $('#setCookie').click(function () {
            $('.agelimit-bottom').removeClass("add")
        })
        $.cookie('acceptcookies', 'yes', { path: '/', expires: 3650 });
    }

    //动画
    $(".video-box").click(function () {
        var url = $(this).attr("video-url");

        var videoHtml = '<div class="videobox"><iframe width="100%" height="100%" src="' + url + '?rel=0&amp;autoplay=1" frameborder="0" allowfullscreen></iframe></div>'
        layer.open({
            skin: 'video-dialog',
            type: 1,
            content: videoHtml,
            title: false,
            closeBtn: 1,
            shade: [0.6, '#000']
        });
    });

    $(".simu-input").click(function(){
        $(this).parent().addClass("show");
    });

    $(".simu-select-dropdown li").click(function(){
        $(this).parents().removeClass("show");
        $(this).addClass('active').siblings().removeClass('active');
        $(".input-inner").val($(this).attr('data-text'));
    });

    // tips动画
    $('.tips-form select').change(function () {
      $(this).parent().parent().addClass('focus')
    })

    $('.tips-form input,.tips-form textarea').focus(function () {
      $(this).parent().parent().addClass('focus')
    })

    $('.tips-form input,.tips-form textarea').blur(function () {
      if($(this).val() ==''){
        $(this).parent().parent().removeClass('focus')
      }
    })
    //产品详情页公共动画
    $.fn.isOnScreen = function () {

        var win = $(window);

        var viewport = {
            top: win.scrollTop(),
            left: win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height() - this.height();

        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();
        
        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

    };
    $(window).scroll(function () {
        $('.animation-item').each(function(){
            if($(this).isOnScreen()){
                $(this).addClass('animation');
            }else{
                $(this).removeClass('animation');
            }
        });
        if ($(window).scrollTop() < 60) {
            $('.public-header').removeClass("fixed")
        }
        else {
            $('.public-header').addClass("fixed")
        }

        if ($(window).scrollTop() < 100) {
            $(".top-nav").css("top","104px")
        } else{
            $(".top-nav").css("top","56px")
        }
    })
});