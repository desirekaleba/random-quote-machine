var quote = '';
var author = '';
var retweetURL = '';

function newWindow(url) {
    window.open(url, 'Share', 'width=400, height=300, toolbar=0, scrollbars=1, location=0, statusbar=0, menubar=0, resizable=0');
}

function fetchQuote() {
    $("#text").text("Loading...");
    $.ajax({
        headers: {
            "Accept": "application/json"
        },
        type: 'GET',
        url: 'https://thesimpsonsquoteapi.glitch.me/quotes',
        crossDomain: true,
        success: function(res) {
            if (typeof res === 'string') {
                res = JSON.parse(res);
            }

            if (Array.isArray(res)) {
                res = res[0];
            }

            quote = res.quote;
            author = res.character;

            $("#text").text(quote);
            $("#author").text(author);
            retweetURL = 'https://twitter.com/intent/tweet?hashtags=quotes&related=desirekaleba&text=' + encodeURIComponent('"' + quote + '"' + '\n\n' + author);
            $("#tweet-quote").attr('href', retweetURL);
            
        }
    });
}

$(document).ready(function() {
    fetchQuote();
    $("#new-quote").on('click', fetchQuote);
    
});