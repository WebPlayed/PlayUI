(function(global) {
//Use the global variable to attach an object to the window object.

    /**
     * Checks if the dom is ready. If so init()
     * 
     * @returns {undefined}
     */
    function initonDomReady() {
        var tId = setInterval(function() {
            if (document.readyState === "complete") {
                clearInterval(tId);
                init();
            }
        }, 11);
    }

    /**
     * Checks some elements to adjust style.
     * 
     * @returns {undefined}
     */
    function init() {
        var tabbar = document.getElementsByClassName('play-tabbar');
        if (tabbar !== null) {
            //The tabbar exists so adjust the content.
            var content = document.getElementsByClassName('play-content')[0];
            content.style.height = "calc(100% - 95px)";
        }
        
        
    }

    initonDomReady();
}(this));