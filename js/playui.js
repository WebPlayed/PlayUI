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

    /**
     * Private functions
     * 
     * @type {object}
     */
    var private = {
        parseScript: function(source) {
            var scripts = new Array();

            // Strip out tags
            while (source.indexOf("<script") > -1 || source.indexOf("</script") > -1) {
                var s = source.indexOf("<script");
                var s_e = source.indexOf(">", s);
                var e = source.indexOf("</script", s);
                var e_e = source.indexOf(">", e);

                // Add to scripts array
                scripts.push(source.substring(s_e + 1, e));
                // Strip from source
                source = source.substring(0, s) + source.substring(e_e + 1);
            }

            // Loop through every script collected and eval it
            for (var i = 0; i < scripts.length; i++) {
                try {
                    eval(scripts[i]);
                }
                catch (ex) {
                    // do what you want here when a script fails
                }
            }

            // Return the cleaned source
            return source;
        },
        /**
         * Convert an javascript object to a query string.
         * 
         * @param {object} obj
         * @returns {String}
         */
        objToQuery: function(obj) {
            var parts = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
                }
            }
            return parts.join('&');
        }
    };

    global.playui = {
        view: {
            /**
             * Loads the view into an element via ajax
             * 
             * @param string url
             * @param string domQuery
             * @returns {undefined}
             */
            loadView: function(url, domQuery) {
                global.playui.ajax({
                    url: url,
                    method: 'GET',
                    data: {},
                    success: function(xmlhttp) {
                        var element = document.querySelector(domQuery);
                        //Parsing scripts does not work.. Why?
                        element.innerHTML = private.parseScript(xmlhttp.responseText);
                    },
                    error: function(xmlhttp) {
                        console.log('Could not get ' + url);
                    }
                });
            }
        },
        ajax: function(options) {
            var xmlhttp;
            var async = true;

            //Prepare the XMLHttpRequest Object for all browsers.
            if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            } else {
                // code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }

            if (options.async !== null) {
                async = options.asyncs;
            }

            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState === 4) {
                    if (xmlhttp.status === 200) {
                        //Everything is OK. Return the text.
                        options.success(xmlhttp);
                    } else {
                        options.error(xmlhttp);
                    }
                }
            }

            //Data can't be read as an object convert it to a http query
            var data = private.objToQuery(options.data);

            xmlhttp.open(options.method, options.url, async);
            xmlhttp.send(data);
        }
    };
    initonDomReady();
}(this));