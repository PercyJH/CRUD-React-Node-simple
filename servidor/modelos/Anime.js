const mongoose = require("mongoose");

const AnimeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    // image_url: {
    //     type: String,
    //     required: true,
    // },
    // synopsis: {
    //     type: String,
    //     required: true,
    // },
    // type: {
    //     type: String,
    //     required: true,
    // },
    // episodes: {
    //     type: Number,
    //     required: true,
    // },

    score: {
        type: Number,
        required: true,
    }
});

const Anime = mongoose.model("Anime", AnimeSchema);

module.exports = Anime;