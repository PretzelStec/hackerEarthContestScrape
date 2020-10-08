const request = require('request-promise');
const cheerio = require('cheerio');

URL = "https://www.hackerearth.com/challenges/";

(async () => {

    // get the response from our URL from hackerearth
    const response = await request(URL);

    // load the cheerio html stuff
    const $ = cheerio.load(response);

    //initialize arrays
    const upcoming = [];
    const ongoing = [];

    // upcoming challenges.. form = [{title, date}]

    // for each "challenge content"(challenge) within the "upcoming challenge list"
    $('div[class ^="upcoming challenge-list"] div[class^="challenge-content"]').each((i, elms) => {

        // grab the title, which is child of content and challenge name. 
        // (2 layers deep, so, 2 child calls)
        const title =  $(elms)
        .children('div[class^="challenge-name"]')
        .children()
        .text();

        // grab the date.. find div enclosing date. return text
        const date = $(elms)
        .children('div[class^="challenge-list-meta"]')
        .find('div[class^="date"]')
        .text();

        // push title and date tot upcoming array
        upcoming.push({title, date});
    });


    // on going challenges.. There is a problem with getting the time remaining because
    // javascript is constantly changing the DOM, preventing this method of
    // data retrieval

    // for each "challenge content"(challenge) within the "ongoing challenge list" 
    $('div[class ^="ongoing challenge-list"] div[class^="challenge-content"]').each((i, elms) => {
        // grab the title, which is child of content and challenge name. (2 layers deep)
        const title =  $(elms)
        .children('div[class^="challenge-name"]')
        .children()
        .text(); // grab text

        // push to ongoing array
        ongoing.push({title}); 
    });

    console.log({upcoming, ongoing});
    //console.log(ongoing);
})();