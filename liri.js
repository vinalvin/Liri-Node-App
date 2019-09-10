require("dotenv").config();
var keys = require("./apikey.js");

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

if (userCommand === 'spotify-this-song') {
    spotifyASong(userInput);
} else if (userCommand === 'concert-this') {
    concertThis(userInput);
} else if (userCommand === 'movie-this') {
    movieThis(userInput);
} else if (userCommand === 'do-what-it-says') {
    filesSystem.readFile('./random.txt', 'utf8', function(err, data) {
        console.log(data)

        var dataArr = data.split(",")
        console.log(data)
        for (var i = 0; i < dataArr.length; i += 2) {
            var cmd = dataArr[i]
            var input = dataArr[i + 1]
            console.log(cmd)
            console.log(input)
            if (cmd === 'spotify-this-song') {
                spotifyASong(input)
            } else if (cmd === 'concert-this') {
                concertThis(input);
            } else if (cmd === 'movie-this') {
                movieThis(input);
            }
        }
    })
}

filesSystem.appendFile('log.txt', userCommand + '\n', function(err) {
    if (err) throw err;
    console.log('Showed already');
});