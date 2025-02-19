const mongoose = require('mongoose');

const comicSchema = new mongoose.Schema({
    title: String,
    summary: String,
    coverImage: String,
    writer: String,
    artist: String,
    colors: String,
    letters: String,
});

module.exports = mongoose.model('Comic', comicSchema);

