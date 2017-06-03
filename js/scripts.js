$(document).ready(function() {

    
    var menu = document.getElementById('menu'); //get menu button
    menu.addEventListener("click", function(){
        if (menu.classList.contains('close')) { //if nav is open
            $('#nav ul li:last-child').velocity({bottom:-400});
            setTimeout(function() {
                $('#nav ul li:nth-child(2)').velocity({bottom:-400});
            }, 50);
            setTimeout(function() {
                $('#nav ul li:first-child').velocity({bottom:-400});
            }, 100);

            $('#nav').velocity({opacity:0});
            $('#nav ul').velocity({opacity:0});
            $('section>div').removeClass('zoomOut');
            $('#menu').removeClass('close');
            $('#menu .line').removeClass('rotate');

            setTimeout(function() {
                document.getElementById('nav').style.display='none';
            }, 300);
        }
        else { //if nav is closed
            document.getElementById('nav').style.display='flex';

            $('#nav').velocity({opacity:1});
            $('#nav ul').velocity({opacity:1});
            $('section>div').addClass('zoomOut');
            $('#menu').addClass('close');
            $('#menu .line').addClass('rotate');
            
            setTimeout(function() {
                $('#nav ul li:first-child').velocity({bottom:0});
            }, 50);
            setTimeout(function() {
                $('#nav ul li:nth-child(2)').velocity({bottom:0});
            }, 100);
            setTimeout(function() {
                $('#nav ul li:last-child').velocity({bottom:0});
            }, 150);
        }
    });


    /* Porfolio - logo circle background grow 
    setTimeout(function() {
        $('.overview .circle').velocity({
            width:400,
            height:400
        },500);
    },200); */

    /* Porfolio - view more */
    var expandDetails = document.getElementsByClassName('workDetailsBtn');

    /* Animate to height: auto */
    function autoHeightAnimate(element, time){
        var curHeight  = element.height(), // Get Default Height
            autoHeight = element.css('height', 'auto').height(); // Get Auto Height
            element.height(curHeight); // Reset to Default Height
            element.stop().animate({ height: autoHeight }, time); // Animate to Auto Height
    }

    /* Events for view project details link */
    var closeHead = $('.closeWork'),
        details   = $('.workDetails'),
        animTime  = 500;

    for (var i=0; i<expandDetails.length; i++) {
        expandDetails[i].addEventListener("click", function(){
            event.preventDefault();

            var btnText   = $(this.childNodes[1]),
                btnProg   = $(this.childNodes[0]),
                curWork   = $(this).attr('id'),
                btnId     = '.workDetails.'+$(this).attr('id'),
                details   = $(btnId);

            /* progress button loading animations & close bar */
            btnText.html('Loading ....');
            btnProg.velocity({width:'100%'}, [ 0.17, 0.67, 0.83, 0.5 ], function(){
                $('header').velocity({top:'-6em'});
                closeHead.css('display','flex');
                closeHead.velocity({top:0}, function(){
                    btnText.html('View work');
                    btnProg.velocity({width:0},300);
                });

                /* animate height of work details */
                if(details.height() === 0){
                    autoHeightAnimate(details, animTime, scrollToAnchor(curWork));
                } 
                else {
                    details.stop().animate({ height: '0' }, animTime);
                }
            });

            function scrollToAnchor(aid){
                var aTag = $("a[name='"+ aid +"Details']");
                $('html,body').animate({scrollTop: aTag.offset().top},'slow');
            }

        });
    }

    $('.closeCircle').click(function(){

        /* animate height of work details */
        if(details.height() === 0){
            autoHeightAnimate(details, animTime);
        } 
        else {
            details.stop().animate({ height: '0' }, animTime);
        }

        closeHead.velocity({top:'-60px'}, function(){
            closeHead.css('display','none');
        });
        $('header').velocity({top:0});

    });

    if (($('#flipbook').length > 0) && (window.matchMedia("(min-width: 1300px)").matches)) {
        /* Interactive PDFs - initialize */
        $('#flipbook').turn({
            animatedAutoCenter: false,
            autoCenter: false,
            responsive:true,
            smartFlip: true,
            autoScaleContent: true,
            when: {
                turning: function(event, page, pageObject) {
                }
            }
        });

        /* Interactive PDFs - switch shadow images based on 1 or 2 pages displayed */
        $('#flipbook').bind('turning', function(event, page, obj) {
            if (page==1) {
                $('.pageShadow').velocity({opacity:0},100);
                $('.coverShadow').velocity({opacity:1});
            }
            else {
                $('.coverShadow').velocity({opacity:0});
                setTimeout(function() {
                    $('.pageShadow').velocity({opacity:1});
                },200);
            }
        });

        /* Interactive PDFs - link table of contents to coordinating page */
        var tocEl = document.getElementsByClassName('tocEl');
        for (var i=0; i<tocEl.length; i++) {
            tocEl[i].addEventListener("click", function(){
                var pageNum = this.getAttribute('data-page');            
                $('#flipbook').turn('page', pageNum);
            });
        }

        /* Interactive PDFs - create magnification of page image on click */
        $('#flipbook').on('click', '.btn', function(e) {
            var imgSrc = '<img src="'+$(this).siblings('.graphic').attr('src')+'">';
            $('.bookModal .box').html(imgSrc);
            $('.bookModal').css('display','flex');
            $('.bookModal').velocity({opacity:1});
        });
        $('.bookModal').click(function(){
            $('.bookModal').velocity({opacity:0},function(){
                $('.bookModal').css('display','none');
            });
        });
    }

    /* Sticky phone scroll */
    if (($('.mobile').length > 0) && (window.matchMedia("(min-width: 480px)").matches)) {
        setTimeout(function() {
            $('.mobile').addClass('active');

            var phone = $('.mobile .phone');
            var phoneWidth = phone.width(),
                phoneHeight = phone.height(),
                phoneLeft = phone.offset().left,
                sectionHeight = $('.emails').height(),
                startPos = phone.offset().top;

            function setPosition() {
                var phonePos = phone.offset().top,
                    scrollTop = $(window).scrollTop(),
                    bottomBumperPos = $('.bottomBumper').offset().top,
                    topBumperPos = $('.topBumper').offset().top;

                /* phone body sticking */ 
                if (scrollTop < startPos-50) {
                    phone.css({
                        "position":"absolute",
                        "top":0,
                        "left":0
                    });
                    $('.mobile .emailWrap').css({
                        "position":"absolute",
                        "top":0,
                        "left":0
                    });
                }
                else if (scrollTop > (bottomBumperPos-phoneHeight-100)) {
                    phone.css({
                        "position":"absolute",
                        "left":0,
                        "top":sectionHeight-phoneHeight-100
                    });
                    $('.emailWrap').css({
                        "position":"absolute",
                        "left":0,
                        "top":sectionHeight-phoneHeight-100
                    });
                }
                else {
                    phone.css({
                        "width":phoneWidth,
                        "position":"fixed",
                        "left":phoneLeft,
                        "top":"50px"
                    });
                    $('.mobile .emailWrap').css({
                        "width":phoneWidth-20,
                        "position":"fixed",
                        "left":phoneLeft,
                        "top":"50px"
                    });
                    $('.mobile .email').css({
                        "width":phoneWidth-20,
                        "position":"absolute",
                        "left":0,
                        "top":-(scrollTop-topBumperPos)
                    });
                }
            }

            if ($('.mobile').hasClass('active')) {
                $(window).scroll(setPosition);
                setPosition();
            }

        },500);
    }

    if ($("#carousel").length > 0) {
        $("#carousel").waterwheelCarousel({
            startingItem: 1,
            flankingItems: 1,
            opacityMultiplier: 1,
            separation: 450
        });
    } 

});
