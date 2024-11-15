const mongoose = require('mongoose')

const Schema = mongoose.Schema

const journalPhotoSchema = new mongoose.Schema({
    journalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Journal', required: true }, // Reference to Journal
    photoUrl: { type: String, required: true }
}, { timestamps : true })

module.exports = mongoose.model('JournalPhoto', journalPhotoSchema)