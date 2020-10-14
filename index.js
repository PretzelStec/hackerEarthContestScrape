// The urls stored in the href for the challenge cards is not consistent
// some show full urls some do not. This will have to be fixed

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
    $('div[class ^="upcoming challenge-list"] a[class ="challenge-card-wrapper challenge-card-link"]').each((i, elms) => {

        // grab the title, which is child of content and challenge name. 
        // (2 layers deep, so, 2 child calls)
        const title =  $(elms)
        .find('div[class^="challenge-name"]')
        .children()
        .text();

        // grab the date.. find div enclosing date. return text
        const date = $(elms)
        .find('div[class^="date"]')
        .text();

        
        //get the href(link) that each challenge card has to the competition
        const url = $(elms).attr('href');

        // push title and date tot upcoming array
        upcoming.push({title, date, url});
    });


    // on going challenges.. There is a problem with getting the time remaining because
    // javascript is constantly changing the DOM, preventing this method of
    // data retrieval

    // for each "challenge content"(challenge) within the "ongoing challenge list" 
    $('div[class ^="ongoing challenge-list"] a[class ="challenge-card-wrapper challenge-card-link"]').each((i, elms) => {
        // grab the title, which is child of content and challenge name. (2 layers deep)
        const title =  $(elms)
        .find('div[class^="challenge-name"]')
        .children()
        .text(); // grab text

        //get the href(link) that each challenge card has to the competition
        const url = $(elms).attr('href');

        // push to ongoing array
        ongoing.push({title, url}); 

        for( x of ongoing){
            if (x['title'] == ''){
                console.log('empty');
            }
        }
    });

    // clean up the data


    console.log({upcoming, ongoing});
    //console.log(ongoing);
})();