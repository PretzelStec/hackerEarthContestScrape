const challenges = require('./HEScrape');

(async () => {
    console.log(await challenges.getChallenges());
})();