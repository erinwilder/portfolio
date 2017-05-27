$(document).ready(function() {

    /* Load template pieces on pages */
    $('header').load('template/header.html', function(){ // loads header.html in the header tag

        /* Menu / Navigaton functionality */
        var menu = document.getElementById('menu'); //get menu button
        menu.addEventListener("click", function(){ //list for click
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
                $('#home>div').removeClass('zoomOut');
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

});