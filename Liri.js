
require('dotenv').config()
var keys = require('./keys.js');

var moment = require('moment');

var Spotify = require('node-spotify-api');

/*var Axios = require("axios");
var Movie_Search = new OMDB(keys.ID.OMDB.id);*/

var Axios = require("axios");


//console.log(process.argv[2])

function printHelp() {
    console.log('liri.js - Written by Arlen Cornejo');
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
        console.log('Tell me more about the upcoming shows!');
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
        console.log('----------------------------------------------------------------------');
        console.log('');
        console.log('Here are a few tools to get you started...');
        console.log('');
        printHelp();
        break;
}

function spotifySong() {
    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET,
    });
    qsearch = process.argv.slice(3).join(' ');
    console.log(qsearch);
    spotify.search({ type: 'track', query: qsearch }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Song: " + data.tracks.items[0].name);
        console.log("Preview Song: " + data.tracks.items[0].external_urls.spotify);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
        console.log('');
        console.log('----------------------------------------------------------------------');
        console.log('');
    });
}

function movieData() {
    qsearch = process.argv.slice(3).join(' ');
    console.log(qsearch);
    const AxiosRequest = () => {
        try {
            return Axios.get('http://www.omdbapi.com/?t=' + qsearch + '&apikey=' + process.env.omdb_key);
        } catch (error) {
            console.error(error)
        }
    }
    const GetOMDBinfo = async () => {
        const movie = AxiosRequest()
            .then(response => {
                //console.log(response);
                res = response.data;
                if (res) {
                    console.log('---------------------------------------------------------------------->');
                    console.log('');
                    console.log("Movie Title: " + res.Title);
                    console.log("Year of Release: " + res.Year);
                    console.log("IMDB Rating: " + res.imdbRating);
                    console.log("Rotten Tomatoes Rating: " + res.Ratings[1].Value);
                    console.log("Country: " + res.Country);
                    console.log("Language: " + res.Language);
                    console.log("Movie Cast: " + res.Actors);
                    console.log('');
                    console.log("Plot: " + res.Plot);
                    console.log('');
                    console.log('---------------------------------------------------------------------->');
                    console.log('');
                }

            })
            .catch(error => {
                console.log(error)
            })
    }
    GetOMDBinfo()
}

function concertInfo() {
    qsearch = process.argv.slice(3).join(' ');
    console.log(qsearch);

    Axios.get('https://rest.bandsintown.com/artists/' + qsearch + '/events?app_id=' + process.env.bands_in_town)
        .then(function (dataGotBack) {
            console.log('---------------------------------------------------------------------->');
            console.log('');
            console.log('Nane of the Venue: ', dataGotBack.data[0].venue.name);
            console.log('Venue Location: ',dataGotBack.data[0].venue.country + "-" + dataGotBack.data[0].venue.city+ "-" + dataGotBack.data[0].venue.region);
            console.log('Date of the Event: ', moment(dataGotBack.data[0].datetime).format("MMM Do YY"));
            console.log('');
            console.log('---------------------------------------------------------------------->');
        })

    // const AxiosRequest = () => {
    //     try {
    //         return Axios.get('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=')
    //     } catch (error) {
    //         console.error(error)
    //         /*
    //         Name of the venue
    //         Venue location
    //         Date of the Event (use moment to format this as "MM/DD/YYYY")
    //          */

    //     }
    // }
}

function doWhatItSays() {
    console.log("Do what it says, please.")
//     var spotify = new Spotify({
//         id: process.env.SPOTIFY_ID,
//         secret: process.env.SPOTIFY_SECRET,
//     });
//     qsearch = process.argv.slice(3).join(' ');
//     console.log(qsearch);
//     spotify.search({ type: 'track', query: qsearch }, function (err, data) {
//         if (err) {
//             return console.log('Error occurred: ' + err);
//         }

//         console.log("Song: " + data.tracks.items[0].name);
//         console.log("Preview Song: " + data.tracks.items[0].external_urls.spotify);
//         console.log("Album: " + data.tracks.items[0].album.name);
//         console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
//         console.log('');
//         console.log('----------------------------------------------------------------------');
//         console.log('');
//     });
// }
}