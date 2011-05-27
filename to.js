

window.onload = function() {
    // The following code was copied from
    // http://stackoverflow.com/questions/2161906/handle-url-anchor-change-event-in-js
    if ("onhashchange" in window) { // event supported?
        window.onhashchange = function () {
            hashChanged(window.location.hash);
        }
    }
    else { // event not supported:
        var storedHash = window.location.hash;
        window.setInterval(function () {
            if (window.location.hash != storedHash) {
                storedHash = window.location.hash;
                hashChanged(storedHash);
            }
        }, 100);
    }
};

function hashChanged(hash) {
    if(hash.match(/^#page-\w+$/)) {
        setPage(hash);
    }
}

function setPage(page) {
    $('div.active.page').removeClass('active');
    $('#mainmenu a.active').removeClass('active');
    $(page).addClass('active');
    $('#mainmenu a[href="'+page+'"]').addClass('active');
}
