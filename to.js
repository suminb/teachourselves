
// Note that JavaScript is a classless language. Everything is an object.
var problem = {
    id: null,
    name: 'foil',
    domain: 'MATH', 
    state: 'PUBLISHED', 
    gradeRange: 'MIDDLE_SCHOOL',
    text: 'Expand this equation into its quadratic form: (x-3)(x+5) *For your answer, enter the exponent in sequence using the caret (usually on shift-6): x^2 and do not add spaces.',
    units: null,
    answer: "x^2+2x-15", 
    points: 130.66,
    contracted: null,
    owner: "Juana Es",
    feedback1: null, 
    feedback2: null, 
    image: "http://blog.room34.com/wp-content/uploads/underdog/logo.thumbnail.png",
    solution: null,
    thumbnail: null,
    reference: null
};

// For cross-origin Ajax requests
var xhr = new easyXDM.Rpc({
    remote: "http://localhost:8080/to/cors/"
}, {
    remote: {
        request: {} // request is exposed by /cors/
    }
});

window.onload = function() {
    // Define trim() function for String
    String.prototype.trim = function() { return this.replace(/^\s+|\s+$/, ''); };

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
    
    hashChanged(window.location.hash ? window.location.hash : "#page-experienceit");
    
    updateStatistics();
    //setInterval(updateStatistics, 5000);
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
    
    var pageContent = $(page + ' div.content');
    if(!pageContent.html()) {
        var url = 'pages/' + page.substring(6, page.length) + '.html';
        $.get(url, function(response) {
            pageContent.html(response);
        });
    }
}

function updateStatistics() {
    console.log('updateStatistics');

    xhr.request({
            url: "../tryThis/getStatistics.json",
            method: "GET",
            data: null
        }, function(json) {
            console.log("...");
            console.log("response" + json);
        }
    );

/*
    xhr.get("tryThis/getStatistics.json", {}, function(data) {
        console.log(data);
    });
*/
/*
    $.get("http://localhost:8080/to/tryThis/getStatistics.json", function(response) {
        console.log(response);
    });
*/
}