$(document).ready(function() {

    var menu = document.getElementById('menu');
    menu.addEventListener("click", function(){
        if (menu.classList.contains('close')) {
            $('#nav ul li:last-child').velocity({bottom:-400});
            setTimeout(function() {
                $('#nav ul li:nth-child(2)').velocity({bottom:-400});
            }, 50);
            setTimeout(function() {
                $('#nav ul li:first-child').velocity({bottom:-400});
            }, 100);

            $('#nav').velocity({opacity:0});
            $('#nav ul').velocity({opacity:0});
            $('#home>div').removeClass('zoomOut');
            $('#menu').removeClass('close');
            $('#menu .line').removeClass('rotate');

            setTimeout(function() {
                document.getElementById('nav').style.display='none';
            }, 300);
        }
        else {
            document.getElementById('nav').style.display='flex';

            $('#nav').velocity({opacity:1});
            $('#nav ul').velocity({opacity:1});
            $('#home>div').addClass('zoomOut');
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