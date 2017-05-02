var tweetLink = 'https://twitter.com/intent/tweet?text=',
    quoteUrl = 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';

function getQuote() {
    $.getJSON(quoteUrl, createTweet);
}

function createTweet(input) {
    var data = input[0],
        quoteText = $(data.content).text().trim(),
        quoteAuthor = data.title;
    
    if (!quoteAuthor.length) {
        quoteAuthor = 'Unknown author';
    }
    
    var tweetText = 'Quote of the day - ' + quoteText + ' Author: ' + quoteAuthor;
    
    if (tweetText.length > 140) {
        getQuote();
    } else {
        var tweet = tweetLink + encodeURIComponent(tweetText);
        $('.quote').text(quoteText);
        $('.author').text('Author: ' + quoteAuthor);
        $('.tweet').attr('href', tweet);
    }
}

$(document).ready(function () {
    getQuote();
    
    $('.trigger').click(function () {
        getQuote();
    });
    
//    $('.quote').html(function (index, html) {
//        return '<span class="quote-first-letter">' + html.slice(0, 1) + '</span>' + html.slice(1);
//    });
    
    $('.quote').html(function (i, html) {
        return html.replace(/^[^a-zA-Z]*([a-zA-Z])/g, '<span class="quote-first-letter">$1</span>');
    });
});