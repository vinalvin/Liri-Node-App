require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var axios = require('axios');

var moment = require('moment');

var userCommand = process.argv[2]

var userInput = process.argv.slice(3).join(" ")

var filesSystem = require("fs")

var spotify = new Spotify(keys.spotify);

function spotifyASong(userInput) {
    spotify.search({ type: 'track', query: userInput, limit: 1 }, function(err, data) {
        if (err) {
            console.log("We cannot find this song", err);
        } else {
            console.log('Artist(s):', data.tracks.items[0].artists[0].name);
        }
    });
}

filesSystem.appendFile('log.txt', userCommand + '\n', function(err) {
    if (err) throw err;
    console.log('Showed already');
});