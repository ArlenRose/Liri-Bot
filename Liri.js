var Spotify = require('node-spotify-api');
var Axios = require("axios")

function printHelp() {
    console.log('liri.js - Written by Arlen Cornejo <arlen.rose.cr@gmail.com>');
    console.log('Usage: node liri.js <option>');
    console.log('OPTIONS:  spotify-this-song <song-title>');
    console.log('          movie-this <movie-tile>');
    console.log('          concert-this <artist/band-name>');
    console.log('          do-what-it-says <filename>');
}
switch (process.argv[2]) {
    case 'spotify-this-song':
        spotifySong();
        break;

    case 'movie-this':
        console.log('Get data from OMDB!');
        movieData();
        break;

    case 'concert-this':
        console.log('Give me concert info!');
        concertInfo();
        break;

    case 'do-what-it-says':
        console.log('Do it now!');
        doWhatItSays();
        break;

    case 'help':
        printHelp();
        break;

    case '-h':
        printHelp();
        break;

    default:
        console.log('Wrong Usage!');
        printHelp();
        break;
}

function spotifySong() {

    var spotify = new Spotify({
        id: "a3ceba59902a4bd99d2fca4b28ad3e48",
        secret: "5e05571ee66c4c6bb069a4e0601be7a4"
    });
    qsearch = process.argv.slice(3).join(' ');
    console.log(qsearch);
    spotify.search({ type: 'track', query: qsearch }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("The name of the song is: " + data.tracks.items[0].name);
        console.log("To listen to your song go here: " + data.tracks.items[0].external_urls.spotify);
        console.log("The name of the album is: " + data.tracks.items[0].album.name);
        console.log("The name of the band/artist is: " + data.tracks.items[0].artists[0].name);
    });
}

function movieData() {
    console.log("Get the movie info!");
    qsearch = process.argv.slice(3).join(' ');
    console.log(qsearch);
    const AxiosRequest = () => {
        try {
            return Axios.get('http://www.omdbapi.com/?t=' + qsearch + '&apikey=trilogy')
        } catch (error) {
            console.error(error)
        }
    }
    const GetOMDBinfo = async () => {
        const movie = AxiosRequest()
            .then(response => {
                console.log(response);
                res = response.data;
                if (res) {
                    console.log("Movie Title: " + res.Title);
                    console.log("Year of Release: " + res.Year);
                    console.log("IMDB Rating: " + res.imdbRating);
                    //console.log(res.ratings.rottenTomatoesRating);
                    console.log("Country in which it was Produced" + res.Country);
                    console.log("Languages: " + res.Language);
                    console.log("Movie Plot: " + res.Plot);
                    console.log("Actors" + res.Actors);
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
    GetOMDBinfo()
}

function concertInfo() {
    console.log("Concert information here!")
}

function doWhatItSays() {
    console.log("Do what it says!")
}
/*
function movieData() {

    console.log("Get the movie info!")
    Axios.get("http://www.omdbapi.com/?t=Inception&apikey=trilogy").then(function (data) {
        console.log(data)
    })
}

*/




