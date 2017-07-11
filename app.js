// app.js

var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);

// Set up your search parameters
var params = {
    q:'#node.js, express.js, react.js',
    count:10,
    result_type:'recent',
    lang:'en'
}

T.get('search/tweets',params, function(err, data, response) {
    if(!err) {
        // Loop through the returned tweets
        for(let i=0;i<data.statuses.length;i++){
            // Get the tweet ID from returned data
            let id={id:data.statuses[i].id_str}
            // Try to favorite the selected Tweet
            T.post('favorites/create',id,function(err, response){
                // If the favorites fails, log error
                if(err){
                    console.log(err[0].message);
                } else {
                // If the fav is succesful, log the url of tweet
                    let username=response.user.screen_name;
                    let tweetId=response.id_str;
                    console.log('Favorited: ','https://twitter.com/${username}/status/${tweetId}')
                }

            });
        }
    } else {
        console.log(err);
    }
})