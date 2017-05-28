$(document).ready(function() {

    /* Load template pieces on pages */
    $('header').load('template/header.html', function(){ // loads header.html in the header tag

        /* Menu / Navigaton functionality */
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

    });

    /* Porfolio - logo circle background grow */
    setTimeout(function() {
        $('.circle').velocity({
            width:400,
            height:400
        },500);
    },200);

    /* Porfolio - view more */
    var expandDetails = document.getElementsByClassName('workDetailsBtn');

    /* Function to animate height: auto */
    function autoHeightAnimate(element, time){
        var curHeight = element.height(), // Get Default Height
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
            var btnText   = $(this.childNodes[1]),
                btnProg   = $(this.childNodes[0]);
            
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
                    autoHeightAnimate(details, animTime);
                } 
                else {
                    details.stop().animate({ height: '0' }, animTime);
                }
            });
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

    /* Books - interactive PDFs */
    $('#flipbook').turn({
        when: {
            turning: function(event, page, pageObject) {
            }
        }
    });
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

    var tocEl = document.getElementsByClassName('tocEl');
    for (var i=0; i<tocEl.length; i++) {
        tocEl[i].addEventListener("click", function(){
            var pageNum = this.getAttribute('data-page');            
            $('#flipbook').turn('page', pageNum);
        });
    }

    var pageBtn = $('#flipbook .btn'); 
    pageBtn.click(function() {
        var imgSrc = '<img src="'+$(this).siblings('img').attr('src')+'">';

        $('.bookModal .box').html(imgSrc);
        $('.bookModal').css('display','flex');
        $('.bookModal').velocity({opacity:1});
    });
    $('.bookModal').click(function(){
        $('.bookModal').velocity({opacity:0},function(){
            $('.bookModal').css('display','none');
        });
    });

});