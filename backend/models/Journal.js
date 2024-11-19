const mongoose = require('mongoose')

const Schema = mongoose.Schema

const journalSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // user_id: { type: String, required: true },
    isPublic: { type: Boolean, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    journalPhotos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JournalPhoto', default: [] }],
}, { timestamps : true })

module.exports = mongoose.model('Journal', journalSchema)
