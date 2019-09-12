// Set the environment variables and keys
require("dotenv").config();
var keys = require("./apikey.js");

// Spotify package for songs information
var Spotify = require('node-spotify-api');

// Axios package
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
            console.log('\n');
            console.log('Artist(s):', data.tracks.items[0].artists[0].name);
            console.log('Song Name:', data.tracks.items[0].name);
            console.log('The Link of the Song:', data.tracks.items[0].preview_url);
            console.log('Album:', data.tracks.items[0].album.name)
            console.log('\n');
        }
    });
}

function searchConcert(userInput) {

}

function movieThis(userInput) {
    axios.get("https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(function(response) {
        console.log('\n');
        console.log('Movie Name:', response.data.Title);
        console.log('The Movie Year:', response.data.Year);
        console.log('\n');
    })
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