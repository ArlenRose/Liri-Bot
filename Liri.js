var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Axios = require("axios")
var Movie_Search = keys.ID.OMDB.id;
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
        console.log('Give me the concert info!');
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
        console.log('Something isn`t quite right...');
        printHelp();
        break;

}

function spotifySong() {
    //var spotify = new Spotify(
    //keys.spotify
    //);
    var spotify = new Spotify({
        id: keys.ID.spotify.id,
        secret: keys.ID.spotify.secret,
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


/* 
Programmer.prototype.printInfo = function() {
  console.log("Name: " + this.name + "\nPosition: " + this.position + "\nAge: " +
  this.age + "\nLanguages: " + this.language);
};

*/

function movieData() {
    console.log("Get the movie info!");
    qsearch = process.argv.slice(3).join(' ');
    console.log(qsearch);
    const AxiosRequest = () => {
        try {
            return Axios.get('http://www.omdbapi.com/?t=' + qsearch + '&apikey='+ Movie_Search)
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
    console.log("I would like to know more about this concert!");
    qsearch = process.argv.slice(3).join(' ');
    console.log(qsearch);
    const AxiosRequest = () => {
        try {
            return Axios.get('http://www.omdbapi.com/?t=' + qsearch + '&apikey=trilogy')
        } catch (error) {
            console.error(error)

         
        }
    }
    console.log("Concert information here!")
}

function doWhatItSays() {
    console.log("Do what it says, please.")
}