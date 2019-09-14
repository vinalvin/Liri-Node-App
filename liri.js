// Set the environment variables and keys
require("dotenv").config();
var keys = require("./apikey.js");

// Spotify package for songs information
var Spotify = require('node-spotify-api');

// Axios package
var axios = require('axios');

// Date for concert
var moment = require('moment');

var userCommand = process.argv[2]

// Search, which starting from index 3
var userInput = process.argv.slice(3).join(" ")

var filesSystem = require("fs")

var spotify = new Spotify(keys.spotify);

function spotifySong(userInput) {
    spotify.search({ type: 'track', query: userInput, limit: 1 }, function(err, data) {
        if (err) {
            console.log("We cannot find this song", err);
        } else {
            console.log('\n');
            console.log('Artist(s):', data.tracks.items[0].artists[0].name);
            console.log('Song Name:', data.tracks.items[0].name);
            console.log('The Song Link:', data.tracks.items[0].preview_url);
            console.log('Album:', data.tracks.items[0].album.name)
            console.log('\n');
        }
    });
}

function searchConcert(userInput) {
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(function(response) {
            console.log('\n');
            console.log('Venue Name:', response.data[0].venue.name);
            console.log('Event Date:', moment(response.data[0].datetime).format('MM/DD/YYYY'));
            console.log('Location:', response.data[0].venue.city);
            console.log('\n');
        })
        .catch(function(error) {
            console.log(error);
        })
}

function searchMovie(userInput) {
    axios.get("https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(function(response) {
        console.log('\n');
        console.log('Movie Name:', response.data.Title);
        console.log('The Movie Year:', response.data.Year);
        console.log('Country:', response.data.Country);
        console.log('Language:', response.data.Language);
        console.log('Actors', response.data.Actors);
        console.log('\n');
    })
}

if (userCommand === 'spotify-song') {
    spotifySong(userInput);
} else if (userCommand === 'search-concert') {
    searchConcert(userInput);
} else if (userCommand === 'search-movie') {
    searchMovie(userInput);
}