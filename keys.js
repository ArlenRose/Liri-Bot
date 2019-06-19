console.log('this is loaded');

exports.ID = {
OMDB: {
  id: process.env.omdb_key,
},
spotify: {
  id: process.env.spotify_id,
  secret: process.env.spotify_secret,
},
bands: {
  id: process.env.bands_in_town,
},
doWhatItSays: {
  id: process.env.spotify_id,
  secret: process.env.spotify_secret,
},
};