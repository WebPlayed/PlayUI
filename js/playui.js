(function(global) {
//Use the global variable to attach an object to the window object.

    function init() {
        var tabbar = document.getElementsByClassName('play-tabbar');
        if (tabbar !== null) {
            //The tabbar exists so adjust the content.
            var content = document.getElementsByClassName('play-content')[0];
            content.style.height = "calc(100% - 95px)";
        }
    }



    global.playui = {
        view: {
            loadView: function(url) {

            }
        },
        ajax: function() {
            var xmlhttp;

            //Prepare the XMLHttpRequest Object for all browsers.
            if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            } else {
                // code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }


        }
    };
    init();
}(this));