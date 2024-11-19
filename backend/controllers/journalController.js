const Journal = require('../models/Journal')
const JournalPhoto = require('../models/JournalPhoto')
const mongoose = require('mongoose')

const getAllJournals = async (req, res) => {
    try {
        const journals = await Journal.find({})
            .sort({ createdAt: -1 })
            .populate({
                path: 'userId',
                select: 'username profilePicture' // Only select the fields needed
            })         // Populate user details
            .populate('journalPhotos')     // Populate associated photos

        res.status(200).json(journals)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getMyJournals = async (req, res) => {
    const userId = req.user._id

    try {
        const journals = await Journal.find({user_id})
            .sort({ createdAt: -1 })
            .populate({
                path: 'userId',
                select: 'username profilePicture' // Only select the fields needed
            })         // Populate user details
            .populate('journalPhotos')     // Populate associated photos

        res.status(200).json(journals)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getJournalById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "There is no such journal!" })
    }

    try {
        const journal = await Journal.findById(id)
            .populate('userId')
            .populate('journalPhotos')

        if (!journal) {
            return res.status(404).json({ error: "There is no such journal!" })
        }

        res.status(200).json(journal)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const createJournal = async (req, res) => {
    const { userId, isPublic, title, content, journalPhotos = [] } = req.body; // Set default empty array for journalPhotos
    // const { isPublic, title, content, journalPhotos = [] } = req.body;
    
    try {
        const userId = req.user._id
        // Step 1: Save each photo and collect their IDs (if journalPhotos is not empty)
        const photoIds = journalPhotos.length > 0
            ? await Promise.all(journalPhotos.map(async (photoUrl) => {
                const journalPhoto = await JournalPhoto.create({ journalId: null, photoUrl });
                return journalPhoto._id
            }))
            : []

        // Step 2: Create the journal and link the photo IDs
        const journal = await Journal.create({
            userId,
            isPublic,
            title,
            content,
            journalPhotos: photoIds,
            // user_id
        })
        
        // Step 3: Update each JournalPhoto with the journalId if there are photos
        if (photoIds.length > 0) {
            await JournalPhoto.updateMany(
                { _id: { $in: photoIds } },
                { journalId: journal._id }
            )
        }

        res.status(200).json(journal);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteJournal = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "There is no such journal!" })
    }

    try {
        const journal = await Journal.findOneAndDelete({ _id: id })

        if (!journal) {
            return res.status(404).json({ error: "There is no such journal!" })
        }

        // Delete associated photos
        await JournalPhoto.deleteMany({ journalId: journal._id })

        res.status(200).json(journal)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateJournal = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "There is no such journal!" })
    }

    try {
        const journal = await Journal.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true } // Return the updated document
        );

        if (!journal) {
            return res.status(404).json({ error: "There is no such journal!" })
        }

        res.status(200).json(journal)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


module.exports = {
    getAllJournals,
    getMyJournals,
    getJournalById,
    createJournal,
    deleteJournal,
    updateJournal
}